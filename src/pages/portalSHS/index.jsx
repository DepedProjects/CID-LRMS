import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SelectImage from "../../assets/images/achievements.jpg";
import { MdLibraryBooks } from "react-icons/md";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Collapse,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { SiSololearn } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import iLeaRNService from "../../services/iLearn-services"; // Adjust the import path based on your structure
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function PortalSHS() {
  const [openSubjectGroup, setOpenSubjectGroup] = useState({});
  const [openLearningAreas, setOpenLearningAreas] = useState({});
  const [openTrack, setOpenTrack] = useState({});
  const [openStrands, setOpenStrands] = useState({});
  const [subjectGroups, setSubjectGroups] = useState([]);
  const [materialsData, setMaterialsData] = useState({});
  const [strands, setStrands] = useState([]);
  const [selectedStrand, setSelectedStrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch data for subject groups, learning areas, and strands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await iLeaRNService.getFilteredMetadataSHS();
        const fetchedSubjectGroups = [
          ...new Set(response.data.map((item) => item.subjectGroup)),
        ].sort((a, b) => a.localeCompare(b));

        const fetchedMaterialsData = {};
        const fetchedStrands = new Set();

        response.data.forEach((item) => {
          console.log("adsadadas",item.strand);

          if (!fetchedMaterialsData[item.subjectGroup]) {
            fetchedMaterialsData[item.subjectGroup] = {};
          }
          if (!fetchedMaterialsData[item.subjectGroup][item.track]) {
            fetchedMaterialsData[item.subjectGroup][item.track] = {};
          }
          if (
            !fetchedMaterialsData[item.subjectGroup][item.track][item.strand]
          ) {
            fetchedMaterialsData[item.subjectGroup][item.track][item.strand] =
              {};
          }
          if (
            !fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
              item.learningArea
            ]
          ) {
            fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
              item.learningArea
            ] = {};
          }

          const resourceType = item.resourceType || "Other";
          fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
            item.learningArea
          ][resourceType] =
            (fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
              item.learningArea
            ][resourceType] || 0) + 1;

          if (item.strand) {
            fetchedStrands.add(item.strand);
          }
        });

        const strandList = Array.from(fetchedStrands);
        setSubjectGroups(fetchedSubjectGroups);
        setMaterialsData(fetchedMaterialsData);
        setStrands(strandList);

        // Log materialsData after setting it
        console.log("Fetched materials data:", fetchedMaterialsData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle strand change
  const handleStrandChange = (event) => {
    console.log("Strand changed:", event.target.value); // Log strand change
    setSelectedStrand(event.target.value);
  };

  // Handle clicks to toggle collapsible lists
  const handleSubjectGroupClick = (subjectGroup) => {
    console.log("Subject group clicked:", subjectGroup); // Log subject group click
    setOpenSubjectGroup((prevState) => ({
      ...prevState,
      [subjectGroup]: !prevState[subjectGroup],
    }));
  };

  const handleTrackClick = (track) => {
    console.log("Track clicked:", track); // Log track click
    setOpenTrack((prevState) => ({
      ...prevState,
      [track]: !prevState[track],
    }));
  };

  const handleStrandClick = (strand) => {
    console.log("Strand clicked:", strand); // Log strand click
    setOpenStrands((prevState) => ({
      ...prevState,
      [strand]: !prevState[strand],
    }));
  };

  const handleLearningAreaClick = (learningArea) => {
    console.log("Learning area clicked:", learningArea); // Log learning area click
    setOpenLearningAreas((prevState) => ({
      ...prevState,
      [learningArea]: !prevState[learningArea],
    }));
  };

  // Fetch filtered materials based on selected strand, subject group, and others
  const handleMaterialClick = async (
    subjectGroup,
    track,
    strand,
    learningArea,
    resourceType
  ) => {
    console.log("Fetching materials for:", {
      subjectGroup,
      track,
      strand,
      learningArea,
      resourceType,
      selectedStrand,
    }); // Log material click parameters

    try {
      setLoading(true);
      const response = await iLeaRNService.getFilteredMetadataSHS(
        subjectGroup || undefined,
        track || undefined,
        learningArea || undefined,
        resourceType || undefined,
        selectedStrand || undefined
      );

      const allMaterials = response.data || [];
      console.log("Fetched materials:", allMaterials); // Log fetched materials

      navigate(`/PortalSHS/materialsSHS`, {
        state: {
          subjectGroup,
          track,
          strand: selectedStrand || null,
          learningArea,
          resourceType,
          allMaterials,
        },
      });
    } catch (error) {
      console.error("Error fetching materials", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset filters and fetch fresh data
  const handleResetFilters = async () => {
    console.log("Resetting filters"); // Log filter reset
    setSelectedStrand(null);
    setOpenSubjectGroup({});
    setOpenLearningAreas({});
    setOpenTrack({});
    setOpenStrands({});

    try {
      setLoading(true);
      const response = await iLeaRNService.getFilteredMetadataSHS();
      const allMaterials = response.data || [];

      const fetchedSubjectGroups = [
        ...new Set(allMaterials.map((item) => item.subjectGroup)),
      ].sort((a, b) => a.localeCompare(b));

      const fetchedMaterialsData = {};
      allMaterials.forEach((item) => {
        if (!fetchedMaterialsData[item.subjectGroup]) {
          fetchedMaterialsData[item.subjectGroup] = {};
        }
        if (item.subjectGroup !== "Core") {
          if (!fetchedMaterialsData[item.subjectGroup][item.track]) {
            fetchedMaterialsData[item.subjectGroup][item.track] = {};
          }
          if (
            !fetchedMaterialsData[item.subjectGroup][item.track][item.strand]
          ) {
            fetchedMaterialsData[item.subjectGroup][item.track][item.strand] =
              {};
          }
          if (
            !fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
              item.learningArea
            ]
          ) {
            fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
              item.learningArea
            ] = {};
          }
        } else {
          if (!fetchedMaterialsData[item.subjectGroup][item.learningArea]) {
            fetchedMaterialsData[item.subjectGroup][item.learningArea] = {};
          }
        }

        const resourceType = item.resourceType || "Other";
        if (item.subjectGroup !== "Core") {
          fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
            item.learningArea
          ][resourceType] =
            (fetchedMaterialsData[item.subjectGroup][item.track][item.strand][
              item.learningArea
            ][resourceType] || 0) + 1;
        } else {
          fetchedMaterialsData[item.subjectGroup][item.learningArea][
            resourceType
          ] =
            (fetchedMaterialsData[item.subjectGroup][item.learningArea][
              resourceType
            ] || 0) + 1;
        }
      });

      setSubjectGroups(fetchedSubjectGroups);
      setMaterialsData(fetchedMaterialsData);
      setStrands([...new Set(allMaterials.map((item) => item.strand))]);

      console.log(
        "Materials data after resetting filters:",
        fetchedMaterialsData
      );

      navigate(`/PortalSHS/materialsSHS`, {
        state: {
          subjectGroup: null,
          track: null,
          learningArea: null,
          resourceType: null,
          strand: null,
          allMaterials,
        },
      });
    } catch (error) {
      console.error("Error resetting filters", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch the materials data on page change
  useEffect(() => {
    const { subjectGroup, track, learningArea, resourceType } =
      location.state || {};
    if (subjectGroup || track || learningArea || resourceType) {
      handleMaterialClick(subjectGroup, track, learningArea, resourceType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 10.5, xl: 11 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 0, xl: 0 },
          fontFamily: "Fira Sans Condensed, sans-serif",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            height: "100vh",
            overflow: "auto",
            borderRight: "solid 1px black",
          }}
        >
          <Box
            sx={{
              background: `url(${SelectImage})`,
              backgroundSize: "cover", // Ensures the background image covers the container
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat", // Prevent repeating
            }}
          >
            <Typography
              variant="h6"
              sx={{
                padding: 3,
                display: "flex",
                alignItems: "center",
                color: "white",
                fontFamily: "Fira Sans Condensed",
              }}
            >
              <FcList style={{ paddingRight: 10, color: "white" }} />
              Senior High School
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: { lg: 18, xl: 11 },
              // padding: 2,
              pl: 2,
              pt: 2,
              fontWeight: "bold",
              fontFamily: "Fira Sans Condensed",
            }}
          >
            Select Strand
            <Typography sx={{ fontSize: { lg: 15, xl: 11 } }}>
              (for learning areas applied)
            </Typography>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              value={selectedStrand || ""}
              onChange={handleStrandChange}
              displayEmpty
              size="small"
              sx={{ ml: 2, mb: 2, mt: 2, width: "70%" }}
            >
              <MenuItem value="">All Strands</MenuItem>
              {strands.map((strand) => (
                <MenuItem key={strand} value={strand}>
                  {strand}
                </MenuItem>
              ))}
              {!strands.length && (
                <MenuItem value="">No Strands Available</MenuItem>
              )}
            </Select>
            <IconButton
              onClick={handleResetFilters}
              sx={{ ml: 2 }}
              aria-label="reset filters"
            >
              <RefreshIcon />
            </IconButton>
          </Box>

          <List>
            {/*SUBJECTGROUP*/}
            {subjectGroups.map((subjectGroup) => (
              <React.Fragment key={subjectGroup}>
                {/*List Item Button for Subject Group*/}
                <ListItemButton
                  onClick={() => handleSubjectGroupClick(subjectGroup)}
                >
                  <ListItemAvatar>
                    <FaBook
                      style={{ color: "#027ebd", fontSize: 21, paddingLeft: 7 }}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography
                      sx={{
                        fontFamily: "Fira Sans Condensed",
                        fontWeight: "bold",
                      }}
                    >
                      {`${subjectGroup}`}
                    </Typography>
                  </ListItemText>
                  {openSubjectGroup[subjectGroup] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                {/*Collapse for Subject Group*/}
                <Collapse
                  in={openSubjectGroup[subjectGroup]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {/*TRACK*/}
                    {Object.keys(materialsData[subjectGroup] || {}).map(
                      (track) => (
                        <React.Fragment key={track}>
                          <ListItemButton
                            sx={{ pl: 6 }}
                            onClick={() => handleTrackClick(track)}
                          >
                            <ListItemAvatar>
                              <SiSololearn
                                style={{
                                  color: "#027ebd",
                                  fontSize: 21,
                                  paddingLeft: 7,
                                }}
                              />
                            </ListItemAvatar>
                            <ListItemText>
                              <Typography
                                sx={{ fontFamily: "Fira Sans Condensed" }}
                              >
                                {track}
                              </Typography>
                            </ListItemText>
                            {openTrack[track] ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          {/*Collapse for Track*/}
                          <Collapse
                            in={openTrack[track]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {/*STRAND*/}
                              {Object.keys(
                                materialsData[subjectGroup][track] || {}
                              ).map((strand) => {
                                <React.Fragment key={strand}>
                                  <ListItemButton
                                    sx={{ pl: 8 }}
                                    onClick={() => handleStrandClick(strand)}
                                  >
                                    <ListItemAvatar>
                                      <SiSololearn
                                        style={{
                                          color: "#027ebd",
                                          fontSize: 21,
                                          paddingLeft: 7,
                                        }}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText>
                                      <Typography
                                        sx={{
                                          fontFamily: "Fira Sans Condensed",
                                        }}
                                      >
                                        {strand}
                                      </Typography>
                                    </ListItemText>
                                    {openStrands[strand] ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </ListItemButton>
                                  <Collapse
                                    in={openStrands[strand]}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <List component="div" disablePadding>
                                      {/* LEARNING AREA (Mathematics) */}
                                      {Object.keys(
                                        materialsData[subjectGroup][track][
                                          strand
                                        ] || {}
                                      ).map((learningArea) => (
                                        <React.Fragment key={learningArea}>
                                          {/* List Item Button for Learning Area */}
                                          <ListItemButton
                                            sx={{ pl: 8 }}
                                            onClick={() =>
                                              handleLearningAreaClick(
                                                learningArea
                                              )
                                            }
                                          >
                                            <ListItemAvatar>
                                              <MdLibraryBooks
                                                style={{
                                                  color: "#027ebd",
                                                  fontSize: 21,
                                                  paddingLeft: 7,
                                                }}
                                              />
                                            </ListItemAvatar>
                                            <ListItemText>
                                              <Typography
                                                sx={{
                                                  fontFamily:
                                                    "Fira Sans Condensed",
                                                }}
                                              >
                                                {learningArea}
                                              </Typography>
                                            </ListItemText>
                                            {openLearningAreas[learningArea] ? (
                                              <ExpandLess />
                                            ) : (
                                              <ExpandMore />
                                            )}
                                          </ListItemButton>
                                          <Collapse
                                            in={openLearningAreas[learningArea]}
                                            timeout="auto"
                                            unmountOnExit
                                          >
                                            <List
                                              component="div"
                                              disablePadding
                                            >
                                              {Object.keys(
                                                materialsData[subjectGroup][
                                                  track
                                                ][strand][learningArea]
                                              ).map((resourceType) => (
                                                <ListItemButton
                                                  key={resourceType}
                                                  sx={{ pl: 10 }}
                                                  onClick={() =>
                                                    handleMaterialClick(
                                                      subjectGroup,
                                                      track,
                                                      strand,
                                                      learningArea,
                                                      resourceType
                                                    )
                                                  }
                                                >
                                                  <ListItemAvatar>
                                                    <FaBook
                                                      style={{
                                                        color: "#027ebd",
                                                        fontSize: 21,
                                                        paddingLeft: 7,
                                                      }}
                                                    />
                                                  </ListItemAvatar>
                                                  <ListItemText>
                                                    <Typography
                                                      sx={{
                                                        fontFamily:
                                                          "Fira Sans Condensed",
                                                        fontSize: 13,
                                                      }}
                                                    >
                                                      {`${resourceType} (${materialsData[subjectGroup][track][strand][learningArea][resourceType]})`}
                                                    </Typography>
                                                  </ListItemText>
                                                </ListItemButton>
                                              ))}
                                            </List>
                                          </Collapse>
                                        </React.Fragment>
                                      ))}
                                    </List>
                                  </Collapse>
                                </React.Fragment>;
                              })}
                            </List>
                          </Collapse>
                        </React.Fragment>
                      )
                    )}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer sx={{ marginTop: 0 }} />
    </Box>
  );
}

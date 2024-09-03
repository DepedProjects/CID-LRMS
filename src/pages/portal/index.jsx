import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SelectImage from "../../assets/images/achievements.jpg";
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
import { RiAlignItemLeftFill } from "react-icons/ri";
import { SiSololearn } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import { FcList } from "react-icons/fc";
import iLeaRNService from "../../services/iLearn-services"; // Adjust the import path based on your structure
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Portal() {
  const [openGrades, setOpenGrades] = useState({});
  const [openLearningAreas, setOpenLearningAreas] = useState({});
  const [gradeLevels, setGradeLevels] = useState([]);
  const [materialsData, setMaterialsData] = useState({});
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await iLeaRNService.getFilteredMetadata();
        const fetchedGradeLevels = [
          ...new Set(response.data.map((item) => item.gradeLevel)),
        ].sort((a, b) => a - b);

        const fetchedMaterialsData = {};
        const fetchedComponents = new Set();

        response.data.forEach((item) => {
          if (!fetchedMaterialsData[item.gradeLevel]) {
            fetchedMaterialsData[item.gradeLevel] = {};
          }
          if (!fetchedMaterialsData[item.gradeLevel][item.learningArea]) {
            fetchedMaterialsData[item.gradeLevel][item.learningArea] = {};
          }
          const resourceType = item.resourceType || "Other";
          fetchedMaterialsData[item.gradeLevel][item.learningArea][
            resourceType
          ] =
            (fetchedMaterialsData[item.gradeLevel][item.learningArea][
              resourceType
            ] || 0) + 1;

          if (item.component) {
            fetchedComponents.add(item.component);
          }
        });

        const componentList = Array.from(fetchedComponents);

        const filteredGradeLevels = fetchedGradeLevels.filter((gradeLevel) => {
          return (
            fetchedMaterialsData[gradeLevel] &&
            Object.keys(fetchedMaterialsData[gradeLevel] || {}).length > 0
          );
        });

        const filteredMaterialsData = {};
        filteredGradeLevels.forEach((gradeLevel) => {
          const filteredLearningAreas = {};
          Object.entries(fetchedMaterialsData[gradeLevel] || {}).forEach(
            ([learningArea, resourceTypes]) => {
              const filteredResourceTypes = Object.entries(
                resourceTypes || {}
              ).filter(([resourceType, count]) => count > 0);

              if (filteredResourceTypes.length > 0) {
                filteredLearningAreas[learningArea] = Object.fromEntries(
                  filteredResourceTypes
                );
              }
            }
          );

          if (Object.keys(filteredLearningAreas).length > 0) {
            filteredMaterialsData[gradeLevel] = filteredLearningAreas;
          }
        });

        setGradeLevels(filteredGradeLevels);
        setMaterialsData(filteredMaterialsData);
        setComponents(componentList);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const handleGradeClick = (gradeLevel) => {
    setOpenGrades((prevState) => ({
      ...prevState,
      [gradeLevel]: !prevState[gradeLevel],
    }));
  };

  const handleLearningAreaClick = (learningArea) => {
    setOpenLearningAreas((prevState) => ({
      ...prevState,
      [learningArea]: !prevState[learningArea],
    }));
  };

  const handleMaterialClick = async (
    gradeLevel,
    learningArea,
    resourceType
  ) => {
    try {
      const response = await iLeaRNService.getFilteredMetadata(
        gradeLevel || undefined,
        learningArea || undefined,
        resourceType || undefined,
        selectedComponent || undefined
      );
      const allMaterials = response.data || []; // Ensure there's data

      navigate(`/Portal/materials`, {
        state: {
          gradeLevel,
          learningArea,
          resourceType,
          component: selectedComponent || null,
          allMaterials,
        },
      });
    } catch (error) {
      console.error("Error fetching materials", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = async () => {
    setSelectedComponent(null);
    setOpenGrades({});
    setOpenLearningAreas({});

    try {
      const response = await iLeaRNService.getFilteredMetadata();
      const allMaterials = response.data || [];

      const fetchedGradeLevels = [
        ...new Set(allMaterials.map((item) => item.gradeLevel)),
      ].sort((a, b) => a - b);

      const fetchedMaterialsData = {};
      allMaterials.forEach((item) => {
        if (!fetchedMaterialsData[item.gradeLevel]) {
          fetchedMaterialsData[item.gradeLevel] = {};
        }
        if (!fetchedMaterialsData[item.gradeLevel][item.learningArea]) {
          fetchedMaterialsData[item.gradeLevel][item.learningArea] = {};
        }
        const resourceType = item.resourceType || "Other";
        fetchedMaterialsData[item.gradeLevel][item.learningArea][resourceType] =
          (fetchedMaterialsData[item.gradeLevel][item.learningArea][
            resourceType
          ] || 0) + 1;
      });

      // Set the states for the UI
      setGradeLevels(fetchedGradeLevels);
      setMaterialsData(fetchedMaterialsData);
      setComponents([...new Set(allMaterials.map((item) => item.component))]);

      // Navigate to the materials page, displaying all materials
      navigate(`/Portal/materials`, {
        state: {
          gradeLevel: null,
          learningArea: null,
          resourceType: null,
          component: null,
          allMaterials,
        },
      });
    } catch (error) {
      console.error("Error resetting filters", error);
    }
  };

  useEffect(() => {
    const { gradeLevel, learningArea, resourceType } = location.state || {};
    if (gradeLevel || learningArea || resourceType) {
      handleMaterialClick(gradeLevel, learningArea, resourceType);
    } else {
      handleMaterialClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
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
              Elementary and Junior Highschool
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
            Select Component
            <Typography sx={{ fontSize: { lg: 15, xl: 11 } }}>
              (for learning areas applied)
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              value={selectedComponent || ""}
              onChange={handleComponentChange}
              displayEmpty
              size="small"
              sx={{ ml: 2, mb: 2, mt: 2, width: "70%" }}
            >
              <MenuItem value="">All Components</MenuItem>
              {components.map((component) => (
                <MenuItem key={component} value={component}>
                  {component}
                </MenuItem>
              ))}
              {!components.length && (
                <MenuItem value="">No Components Available</MenuItem>
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
            {gradeLevels.map((gradeLevel) => (
              <React.Fragment key={gradeLevel}>
                <ListItemButton onClick={() => handleGradeClick(gradeLevel)}>
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
                      {`Grade ${gradeLevel}`}
                    </Typography>
                  </ListItemText>
                  {openGrades[gradeLevel] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openGrades[gradeLevel]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Object.keys(materialsData[gradeLevel] || {}).map(
                      (learningArea) => (
                        <React.Fragment key={learningArea}>
                          <ListItemButton
                            sx={{ pl: 6 }}
                            onClick={() =>
                              handleLearningAreaClick(learningArea)
                            }
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
                            <List component="div" disablePadding>
                              {Object.keys(
                                materialsData[gradeLevel][learningArea] || {}
                              ).map((resourceType) => (
                                <ListItemButton
                                  key={resourceType}
                                  sx={{ pl: 10 }}
                                  onClick={() =>
                                    handleMaterialClick(
                                      gradeLevel,
                                      learningArea,
                                      resourceType
                                    )
                                  }
                                >
                                  <ListItemAvatar>
                                    <RiAlignItemLeftFill
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
                                        fontSize: 13,
                                      }}
                                    >
                                      {`${resourceType} (${materialsData[gradeLevel][learningArea][resourceType]})`}
                                    </Typography>
                                  </ListItemText>
                                </ListItemButton>
                              ))}
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

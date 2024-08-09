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
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { FaBook } from "react-icons/fa";
import iLeaRNService from "../../services/iLearn-services"; // Adjust the import path based on your structure
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FcList } from "react-icons/fc";

export default function Portal() {
  const [openGrades, setOpenGrades] = useState({});
  const [openLearningAreas, setOpenLearningAreas] = useState({});
  const [gradeLevels, setGradeLevels] = useState([]);
  const [materialsData, setMaterialsData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await iLeaRNService.getFilteredMetadata();
        const fetchedGradeLevels = [
          ...new Set(response.data.map((item) => item.gradeLevel)),
        ];
        const fetchedMaterialsData = {};

        response.data.forEach((item) => {
          if (!fetchedMaterialsData[item.gradeLevel]) {
            fetchedMaterialsData[item.gradeLevel] = {};
          }
          if (!fetchedMaterialsData[item.gradeLevel][item.learningArea]) {
            fetchedMaterialsData[item.gradeLevel][item.learningArea] = {};
          }
          const resourceType = item.resourceType || "Other";
          fetchedMaterialsData[item.gradeLevel][item.learningArea][resourceType] =
            (fetchedMaterialsData[item.gradeLevel][item.learningArea][resourceType] || 0) + 1;
        });

        // Filter out any grade levels, learning areas, or resource types with no data
        const filteredGradeLevels = fetchedGradeLevels.filter((gradeLevel) => {
          return fetchedMaterialsData[gradeLevel] && 
                 Object.keys(fetchedMaterialsData[gradeLevel] || {}).length > 0;
        });

        const filteredMaterialsData = {};
        filteredGradeLevels.forEach((gradeLevel) => {
          const filteredLearningAreas = {};
          Object.entries(fetchedMaterialsData[gradeLevel] || {}).forEach(
            ([learningArea, resourceTypes]) => {
              const filteredResourceTypes = Object.entries(resourceTypes || {}).filter(
                ([resourceType, count]) => count > 0
              );

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
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        resourceType || undefined
      );
      const allMaterials = response.data || []; // Ensure there's data
      console.log("Fetched Materials:", allMaterials); // Log fetched materials

      navigate(`/Portal/materials`, {
        state: {
          gradeLevel,
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

  useEffect(() => {
    // Extract parameters from location state
    const { gradeLevel, learningArea, resourceType } = location.state || {};
    if (gradeLevel || learningArea || resourceType) {
      handleMaterialClick(gradeLevel, learningArea, resourceType);
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
            width: "30%",
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
              }}
            >
              <FcList style={{ paddingRight: 10, color: "white" }} />K to 12
            </Typography>
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
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
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
                    {materialsData[gradeLevel] &&
                      Object.keys(materialsData[gradeLevel]).map((learningArea) => (
                        <React.Fragment key={learningArea}>
                          <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => handleLearningAreaClick(learningArea)}
                          >
                            <ListItemAvatar>
                              <FaBook
                                style={{ fontSize: 21, color: "#014963" }}
                              />
                            </ListItemAvatar>
                            <ListItemText sx={{ fontSize: 10 }}>
                              <Typography
                                sx={{
                                  fontFamily: "Fira Sans Condensed",
                                  fontSize: 14,
                                  fontWeight: "bold",
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
                            <List component="div" disablePadding>
                              {materialsData[gradeLevel][learningArea] &&
                                Object.keys(materialsData[gradeLevel][learningArea]).map(
                                  (resourceType) => (
                                    <ListItemButton
                                      key={resourceType}
                                      sx={{ pl: 8 }}
                                      onClick={() =>
                                        handleMaterialClick(
                                          gradeLevel,
                                          learningArea,
                                          resourceType
                                        )
                                      }
                                    >
                                      <ListItemAvatar>
                                        <FaBook
                                          style={{
                                            fontSize: 24,
                                            color: "#820318",
                                          }}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText>
                                        <Box sx={{ display: "flex", gap: 20 }}>
                                          <Typography
                                            sx={{
                                              fontFamily: "Fira Sans Condensed",
                                              fontSize: 14,
                                            }}
                                          >
                                            {resourceType}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontFamily: "Fira Sans Condensed",
                                              fontSize: 14,
                                            }}
                                          >
                                            {`(${materialsData[gradeLevel][learningArea][resourceType]} materials)`}
                                          </Typography>
                                        </Box>
                                      </ListItemText>
                                    </ListItemButton>
                                  )
                                )}
                            </List>
                          </Collapse>
                        </React.Fragment>
                      ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
        <Box sx={{ width: "70%" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
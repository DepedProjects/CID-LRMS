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
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FcList } from "react-icons/fc";
import { SiOpslevel } from "react-icons/si";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { PiPresentationChartFill } from "react-icons/pi";
import { RiBook3Fill } from "react-icons/ri";
import iLeaRNService from "../../services/iLearn-services"; // Adjust the import path based on your structure

export default function PortalALS() {
  const [openGrades, setOpenGrades] = useState({});
  const [openLearningAreas, setOpenLearningAreas] = useState({});
  const [gradeLevels, setGradeLevels] = useState([]);
  const [materialsData, setMaterialsData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await iLeaRNService.getFilteredMetadata();
        console.log("Response from backend:", response.data);
        const fetchedGradeLevels = [
          ...new Set(response.data.map((item) => item.gradeLevel)),
        ];
        const fetchedMaterialsData = {};

        response.data.forEach((item) => {
          if (!fetchedMaterialsData[item.learningArea]) {
            fetchedMaterialsData[item.learningArea] = {};
          }
          const resourceType = item.resourceType || "Other";
          fetchedMaterialsData[item.learningArea][resourceType] =
            (fetchedMaterialsData[item.learningArea][resourceType] || 0) + 1;
        });

        setGradeLevels(fetchedGradeLevels);
        setMaterialsData(fetchedMaterialsData);
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
    // navigate(
    //   `/Portal/materials?gradeLevel=${gradeLevel}&learningArea=${learningArea}&type=${resourceType}`
    // );
    try {
      const response = await iLeaRNService.getFilteredMetadata({
        gradeLevel,
        learningArea,
        resourceType,
      });
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
    handleMaterialClick();
  }, []);

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
              // backgroundAttachment: "fixed",
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
                    <SiOpslevel
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
                    {Object.keys(materialsData).map((learningArea) => (
                      <React.Fragment key={learningArea}>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => handleLearningAreaClick(learningArea)}
                        >
                          <ListItemAvatar>
                            <RiBook3Fill
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
                            {Object.keys(materialsData[learningArea]).map(
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
                                    {resourceType === "Learning Material" && (
                                      <FaBook
                                        style={{
                                          fontSize: 24,
                                          color: "#820318",
                                        }}
                                      />
                                    )}
                                    {resourceType === "Modules" && (
                                      <FaVideo
                                        style={{
                                          fontSize: 24,
                                          color: "#0486d1",
                                        }}
                                      />
                                    )}
                                    {resourceType ===
                                      "Self-Learning Modules" && (
                                      <PiPresentationChartFill
                                        style={{
                                          fontSize: 24,
                                          color: "#e68405",
                                        }}
                                      />
                                    )}
                                    {resourceType === "Other Materials" && (
                                      <GiPerspectiveDiceSixFacesRandom
                                        style={{
                                          fontSize: 24,
                                          color: "#e68405",
                                        }}
                                      />
                                    )}
                                  </ListItemAvatar>
                                  <ListItemText>
                                    <Box sx={{ display: "flex", gap: 20 }}>
                                      <Typography
                                        sx={{
                                          fontFamily: "Fira Sans Condensed",
                                          fontSize: 14,
                                          width: "90px",
                                        }}
                                      >
                                        {resourceType}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontFamily: "Fira Sans Condensed",
                                          fontSize: 14,
                                          fontWeight: "bold",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >{`${
                                        materialsData[learningArea][
                                          resourceType
                                        ] || 0
                                      }`}</Typography>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer sx={{ marginTop: 0 }} />
    </Box>
  );
}

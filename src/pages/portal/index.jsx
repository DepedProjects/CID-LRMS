import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
import { FcList } from "react-icons/fc";
import { SiOpslevel } from "react-icons/si";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { PiPresentationChartFill } from "react-icons/pi";
import { RiBook3Fill } from "react-icons/ri";

const gradeLevels = [
  { name: "Grade 1", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 2", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 3", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 4", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 5", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 6", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 7", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 8", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 9", subjects: ["Mathematics", "Science", "English"] },
  { name: "Grade 10", subjects: ["Mathematics", "Science", "English"] },
];

const materialsData = {
  Mathematics: { Textbooks: 5, Videos: 3, Presentations: 2 },
  Science: { Textbooks: 4, Videos: 4, Presentations: 1 },
  English: { Textbooks: 6, Videos: 2, Presentations: 3 },
};

export default function Portal() {
  const [openGrades, setOpenGrades] = useState({});
  const [openSubjects, setOpenSubjects] = useState({});
  const navigate = useNavigate();

  const handleGradeClick = (grade) => {
    setOpenGrades((prevState) => ({
      ...prevState,
      [grade]: !prevState[grade],
    }));
  };

  const handleSubjectClick = (subject) => {
    setOpenSubjects((prevState) => ({
      ...prevState,
      [subject]: !prevState[subject],
    }));
  };

  const handleMaterialClick = (grade, subject, materialType) => {
    navigate(
      `/Portal/materials?grade=${grade}&subject=${subject}&type=${materialType}`
    );
  };

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
          // flex: 1,
          display: "flex",
          flexDirection: "row", // Changed to row for side-by-side layout
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 10.5, xl: 11 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 0, xl: 0 },
          fontFamily: "Fira Sans Condensed, sans-serif",
          gap: 0, // Remove gap between side selections and outlet
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
          <Typography
            variant="h6"
            sx={{ padding: 3, display: "flex", alignItems: "center" }}
          >
            <FcList style={{ paddingRight: 10, color: "#027ebd" }} />K to 12
          </Typography>
          <List>
            {gradeLevels.map((grade) => (
              <React.Fragment key={grade.name}>
                <ListItemButton onClick={() => handleGradeClick(grade.name)}>
                  <ListItemAvatar>
                    <SiOpslevel
                      style={{ color: "#027ebd", fontSize: 21, paddingLeft: 7 }}
                    />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                      {grade.name}
                    </Typography>
                  </ListItemText>
                  {openGrades[grade.name] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openGrades[grade.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {grade.subjects.map((subject) => (
                      <React.Fragment key={subject}>
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => handleSubjectClick(subject)}
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
                              {subject}
                            </Typography>
                          </ListItemText>
                          {openSubjects[subject] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItemButton>
                        <Collapse
                          in={openSubjects[subject]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {Object.keys(materialsData[subject]).map(
                              (materialType) => (
                                <ListItemButton
                                  key={materialType}
                                  sx={{ pl: 8 }}
                                  onClick={() =>
                                    handleMaterialClick(
                                      grade.name,
                                      subject,
                                      materialType
                                    )
                                  }
                                >
                                  <ListItemAvatar>
                                    {materialType === "Textbooks" && (
                                      <FaBook
                                        style={{
                                          fontSize: 24,
                                          color: "#820318",
                                        }}
                                      />
                                    )}
                                    {materialType === "Videos" && (
                                      <FaVideo
                                        style={{
                                          fontSize: 24,
                                          color: "#0486d1",
                                        }}
                                      />
                                    )}
                                    {materialType === "Presentations" && (
                                      <PiPresentationChartFill
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
                                        {materialType}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontFamily: "Fira Sans Condensed",
                                          fontSize: 14,
                                          fontWeight: "bold",
                                        }}
                                      >{`${materialsData[subject][materialType]}`}</Typography>
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
            width: "70%", // Adjusted width for better layout
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer sx={{ marginTop: 0 }} />{" "}
      {/* Ensure no margin at the top of the footer */}
    </Box>
  );
}

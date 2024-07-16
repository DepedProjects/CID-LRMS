import React from "react";
import { useLocation } from "react-router-dom";
import { FcDocument } from "react-icons/fc";
import { AiFillDatabase } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";

const materialsTopics = [
  {
    topic: "Introduction to Addition",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Subtraction",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Multiplication",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Division",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Fraction",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Algebra",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Polynomials",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Binomials",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to Trinomials",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Textbooks",
  },
  {
    topic: "Introduction to FOIL method",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Videos",
  },
  {
    topic: "Introduction to SMILE method",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Videos",
  },
  {
    topic: "Introduction to SMILE method",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Videos",
  },
  {
    topic: "Introduction to SMILE method",
    description: "Introduction to Basic Arithmetic Operations",
    gradeLevel: "Grade 3",
    subject: "Mathematics",
    type: "Videos",
  },
  {
    topic: "Plant Biology",
    description: "Study of plant structure and function",
    gradeLevel: "Grade 3",
    subject: "Science",
    type: "Textbooks",
  },
  {
    topic: "English Grammar",
    description: "Fundamentals of English grammar",
    gradeLevel: "Grade 3",
    subject: "English",
    type: "Textbooks",
  },
  // Add details for other grades similarly...
];

export default function Materials() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const grade = queryParams.get("grade");
  const subject = queryParams.get("subject");
  const type = queryParams.get("type");

  console.log("Grade:", grade);
  console.log("Subject:", subject);
  console.log("Type:", type);

  const filteredMaterials = materialsTopics.filter(
    (material) =>
      material.gradeLevel === grade &&
      material.subject === subject &&
      material.type === type
  );

  console.log("Filtered Materials:", filteredMaterials);

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{ paddingTop: 3, paddingBottom: 3, paddingLeft: 2.5 }}
        >
          <Typography color="inherit" href="/portal">
            Portal
          </Typography>
          <Typography color="inherit" href={`/portal/grade/${grade}`}>
            {grade}
          </Typography>
          <Typography color="inherit" href={`/portal/subject/${subject}`}>
            {subject}
          </Typography>
          <Typography color="textPrimary">{type}</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", paddingLeft: 2.5 }}>
        <AiFillDatabase style={{ fontSize: 21 }} />
        <Box sx={{ display: "flex", gap: 68 }}>
          <Typography
            variant="h6"
            sx={{ paddingLeft: 1, display: "flex", alignItems: "center" }}
          >
            Materials
          </Typography>
          <TextField
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <CiSearch style={{ fontSize: 21 }} />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#white", // Darker background color
                "& fieldset": {
                  borderColor: "#555", // Darker border color
                },
                "&:hover fieldset": {
                  borderColor: "#777", // Darker border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#999", // Darker border when focused
                },
              },
              color: "white", // Change text color
            }}
          />
        </Box>
      </Box>

      <List sx={{ paddingLeft: 3 }}>
        {filteredMaterials.map((material, index) => (
          <ListItem key={index} sx={{ borderTop: "solid 1px black" }}>
            <FcDocument style={{ fontSize: "40", paddingRight: 10 }} />
            <ListItemText>
              <Typography
                sx={{ fontFamily: "Fira Sans Condensed", fontWeight: "bold" }}
              >
                {material.topic}
              </Typography>
              <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                {material.description}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Fira Sans Condensed",
                  color: "#014963",
                  display: "flex",
                  gap: 3,
                }}
              >
                <Typography>{material.gradeLevel}</Typography>
                <Typography>{material.subject}</Typography>
              </Typography>
            </ListItemText>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, pr: 5 }}
            >
              <Button sx={{ backgroundColor: "#83dcfc" }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "black",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bold",
                  }}
                >
                  VIEW DETAILS
                </Typography>
              </Button>
              <Button sx={{ backgroundColor: "#8cfab0" }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "black",
                    fontFamily: "Fira Sans Condensed",
                    fontWeight: "bold",
                  }}
                >
                  DOWNLOAD
                </Typography>
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

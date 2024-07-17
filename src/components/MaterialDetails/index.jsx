import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import iLeaRNService from "../../services/iLearn-services"; // Adjust the import path based on your structure

export default function Materials() {
  const [searchParams] = useSearchParams();
  const gradeLevel = searchParams.get("gradeLevel");
  const learningArea = searchParams.get("learningArea");
  const resourceType = searchParams.get("resourceType");

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await iLeaRNService.getFilteredMetadata({
          gradeLevel,
          learningArea,
          resourceType,
        });
        const allMaterials = response.data || []; // Ensure there's data
        setMaterials(allMaterials);
        console.log("Fetched Materials:", allMaterials); // Log fetched materials
      } catch (error) {
        console.error("Error fetching materials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [gradeLevel, learningArea, resourceType]);

  // Log filtered materials
  useEffect(() => {
    console.log("Filtered Materials:", materials);
  }, [materials]);

  if (loading) {
    return <div>Loading...</div>; // Optional loading state
  }

  // Filter materials based on selected parameters
  const filteredMaterials = materials.filter((material) => {
    return (
      (gradeLevel ? material.gradeLevel === Number(gradeLevel) : true) &&
      (learningArea ? material.learningArea === learningArea : true) &&
      (resourceType ? material.resourceType === resourceType : true)
    );
  });

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ backgroundColor: "#383838" }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="/"
          sx={{
            paddingTop: 3,
            paddingBottom: 3,
            paddingLeft: 2.5,
            color: "white",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Fira Sans Condensed",
              fontWeight: "bold",
              color: "white",
            }}
            href="/portal"
          >
            Portal
          </Typography>
          <Typography
            sx={{
              fontFamily: "Fira Sans Condensed",
              fontWeight: "bold",
              color: "white",
            }}
            href={`/portal/grade/${gradeLevel}`}
          >
            {`Grade ${gradeLevel}`}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Fira Sans Condensed",
              fontWeight: "bold",
              color: "white",
            }}
            href={`/portal/subject/${learningArea}`}
          >
            {learningArea}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Fira Sans Condensed",
              fontWeight: "bold",
              color: "white",
            }}
            href={`/portal/type/${resourceType || "any type"}`}
          >
            {resourceType || "Other Materials"}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 2.5,
          backgroundColor: "#383838",
        }}
      >
        <AiFillDatabase style={{ fontSize: 21, color: "white" }} />
        <Box sx={{ display: "flex", gap: { lg: 68, xl: 120 } }}>
          <Typography
            variant="h6"
            sx={{
              paddingLeft: 1,
              display: "flex",
              alignItems: "center",
              color: "white",
            }}
          >
            Materials
          </Typography>
          <TextField
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CiSearch style={{ fontSize: 21 }} />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{
              padding: 1,
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                "& fieldset": {
                  borderColor: "#555",
                },
                "&:hover fieldset": {
                  borderColor: "#777",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#999",
                },
              },
              color: "white",
            }}
          />
        </Box>
      </Box>

      <List>
        {filteredMaterials.map((material) => (
          <ListItem key={material.id} sx={{ borderBottom: "solid 1px black" }}>
            <FcDocument style={{ fontSize: "40", paddingRight: 10 }} />
            <ListItemText>
              <Typography
                sx={{
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                  fontSize: 21,
                }}
              >
                {material.title}
              </Typography>
              <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                {material.topicContent}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Fira Sans Condensed",
                  color: "#014963",
                  display: "flex",
                  gap: 3,
                }}
              >
                <Typography>{`Grade ${material.gradeLevel}`}</Typography>
                <Typography sx={{ fontFamily: "Fira Sans Condensed" }}>
                  {material.learningArea}
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Fira Sans Condensed",
                  fontWeight: "bold",
                  color: "black",
                  display: "flex",
                  gap: 3,
                  fontSize: 11,
                }}
              >
                {`Published at ${material.uploaded_at}`}
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

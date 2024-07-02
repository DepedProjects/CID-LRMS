import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Box, Typography } from "@mui/material";

export default function Library() {
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 15, xl: 7 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 5, xl: 1 },
          background: "#1f211f",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              fontFamily: "Fira Sans Condensed",
              color: "white",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.5rem",
                lg: "3rem",
                xl: "4.5rem",
              },
            }}
          >
            SDOIC Library
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          paddingTop: 5,
          paddingBottom: 5,
          background: "white",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 5 },
            fontFamily: "Fira Sans Condensed",
            fontWeight: "bold",
            fontSize: {
              xs: "0.75rem",
              sm: "1rem",
              md: "1.25rem",
              lg: "1.25rem",
              xl: "1.75rem",
            },
          }}
        >
          The SDO Imus City Library is located at the second floor, right side
          of SDO Imus City Old Building and being managed by Mr. Reden M.
          Cruzado, Librarian II. The library collection consists primarily of
          general references, general subject related books, professional books,
          Filipiniana books, action researches and academic research paper such
          as thesis and dissertation, fiction books and periodical materials
          that support the delivery of basic education services. It is open from
          Monday to Friday, 7:00AM to 4:00 PM.
        </Typography>
      </Box>
      <Box>
       
      </Box>
      <Footer />
    </Box>
  );
}

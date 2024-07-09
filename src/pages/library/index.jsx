import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LibraryImage from "../../assets/images/Library2.png";
import CitationImage from "../../assets/images/CitationImage.png";
import { Box, Button, ListItem, Typography } from "@mui/material";

export default function Library() {
  const openLink1 = () => {
    window.open("https://www.doabooks.org/", "_blank");
  };

  const openLink2 = () => {
    window.open("https://www.doaj.org/", "_blank");
  };

  const openLink3 = () => {
    window.open("https://ejournals.ph/", "_blank");
  };

  const openLink4 = () => {
    window.open("http://www.childrenslibrary.org/", "_blank");
  };

  const openLink5 = () => {
    window.open("https://wikipilipinas.org/", "_blank");
  };

  const openLink6 = () => {
    window.open("https://scholar.google.com/", "_blank");
  };

  const listItems = [
    {
      text: "Open Access Books Directory",
      action: openLink1,
    },
    { text: "Open Access Journals Directory", action: openLink2 },
    { text: "Philippine EJournals", action: openLink3 },
    { text: "International Children's Digital Library", action: openLink4 },
    { text: "Wikipilipinas", action: openLink5 },
    { text: "Google Scholar", action: openLink6 },
  ];

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
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 15, xl: 13 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 5, xl: 4 },
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
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 15, xl: 15 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 5, xl: 4 },
          background: "#1f211f",
          px: { lg: 5, xl: 15 },
        }}
      >
        <Box
          component="img"
          src={LibraryImage}
          alt="Citizen's Charter"
          sx={{
            width: {
              xs: "100%", // Full width on mobile
              sm: "80%", // Slightly smaller on small screens
              md: "60%", // Smaller on medium screens
              lg: "80%", // Smaller on large screens
              xl: "200%", // Smaller on extra-large screens
            },
            maxWidth: { xs: "300px", md: "900px", xl: "1000px" }, // Set maximum width
            // height: "auto", // Maintain aspect ratio
            mt: { lg: -10, xl: -10 },
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 3, xl: 6 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 3, xl: 6 },
          background: "White",
          color: "black",
          borderBottom: "3px solid black",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: 32, xl: 36 },
            fontWeight: "bold",
            fontFamily: "Barlow Semi Condensed",
          }}
        >
          Citation Generator and Other Relevant Links
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3, md: 4, lg: 5 },
          paddingTop: { xs: 15, sm: 10, md: 12, lg: 15, xl: 15 },
          paddingBottom: { xs: 3, sm: 3, md: 4, lg: 5, xl: 4 },
          background: "#1f211f",
          px: { lg: 5, xl: 15 },
        }}
      >
        <Box
          component="img"
          src={CitationImage}
          alt="Citizen's Charter"
          sx={{
            width: {
              xs: "100%", // Full width on mobile
              sm: "80%", // Slightly smaller on small screens
              md: "60%", // Smaller on medium screens
              lg: "80%", // Smaller on large screens
              xl: "200%", // Smaller on extra-large screens
            },
            maxWidth: { xs: "300px", md: "600px", xl: "900px" }, // Set maximum width
            // height: "auto", // Maintain aspect ratio
            mt: { lg: -10, xl: -10 },
          }}
        ></Box>
        <Box
          sx={{
            width: { lg: "450px", xl: "450px" },
            fontFamily: "Fira Sans Condensed",
            mt: { lg: -10 },
          }}
        >
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "cyan",
                    color: "black",
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  },
                }}
                onClick={item.action}
                // sx={{
                //   width: { lg: "450px", xl: "450px" },
                //   fontFamily: "Fira Sans Condensed",
                // }}
              >
                {item.text}
              </Button>
            </ListItem>
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

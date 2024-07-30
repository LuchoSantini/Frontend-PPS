import React, { useContext } from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { ThemeContext } from "../../context/theme/theme.context";

const Footer = () => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        mt: "30px",
        mb: 0,
        backgroundColor: isDarkMode ? "#0E1113" : "#eeeeee",

        // backgroundColor: (theme) =>
        //   theme.palette.mode === "light"
        //     ? theme.palette.grey[200]
        //     : theme.palette.grey[800],
      }}
      component="footer"
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color={isDarkMode ? "#ffffff" : "#0E1113"}>
          {"© 2024 RSS Store. Todos los derechos reservados."}
        </Typography>
        <Box>
          <IconButton
            color="primary"
            component="a"
            href="https://www.facebook.com"
            target="_blank"
          >
            <Facebook />
          </IconButton>
          <IconButton
            color="primary"
            component="a"
            href="https://www.twitter.com"
            target="_blank"
          >
            <Twitter />
          </IconButton>
          <IconButton
            color="primary"
            component="a"
            href="https://www.instagram.com"
            target="_blank"
          >
            <Instagram />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

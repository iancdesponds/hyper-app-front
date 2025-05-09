import { styled } from "@stitches/react";

export const StyledHome = styled("div", {
  display: "flex",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#121212",
});

export const Sidebar = styled("aside", {
  width: "250px",
  backgroundColor: "#1e1e1e",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRight: "1px solid #333333",
  padding: "1.5rem 1rem",
  color: "#ffffff",

  "& .brand": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.8rem",
    marginBottom: "2rem",

    "& h1": {
      fontSize: "1.5rem",
      fontWeight: "500",
      color: "#ffffff",
    },
  },

  "& .logo": {
    width: "100px",
  },

  "& nav ul": {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: 0,
    margin: 0,
  },

  "& nav li a": {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    color: "#cccccc",
    fontSize: "1rem",
    padding: "0.5rem 0.8rem",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "background 0.2s",

    "&:hover": {
      backgroundColor: "#2c2c2c",
    },

    "&.active": {
      backgroundColor: "#ffffff",
      color: "#121212",
    },
  },

  "& .bottom-section": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2rem",
    gap: "0.5rem",

    "& p": {
      color: "#cccccc",
      margin: 0,
      fontSize: "0.9rem",
      flex: 1,
    },

    "& button": {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#888",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      "&:hover": {
        color: "#ffffff",
      },
    },
  },

  "& .profile-placeholder": {
    width: "36px",
    minWidth: "36px",
    height: "36px",
    minHeight: "36px",
    borderRadius: "50%",
    backgroundColor: "#333333",
  },
});

export const Content = styled("main", {
  flex: 1,
  padding: "2rem",
  overflowY: "auto",
  backgroundColor: "#121212",
  color: "#ffffff",

  "& h1": {
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "#ffffff",
  },
});

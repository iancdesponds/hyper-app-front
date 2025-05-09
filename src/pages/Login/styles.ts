import { styled } from "@stitches/react";

export const StyledLogin = styled("div", {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#121212",
  color: "#ffffff",

  "& .login-container": {
    width: "100%",
    maxWidth: "500px",
    minHeight: "540px",
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  "& .logo": {
    marginBottom: "1.5rem",
    width: "120px",
  },

  "& h1": {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#ffffff",
    fontWeight: "500",
  },

  "& form": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },

  "& label": {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    fontSize: "0.9rem",
    color: "#cccccc",
  },

  "& input:not([type='password'])": {
    padding: "0.8rem",
    borderRadius: "4px",
    border: "1px solid #333333",
    backgroundColor: "#252525",
    color: "#ffffff",
    fontSize: "1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",

    "&:focus": {
      borderColor: "#4d4d4d",
    },
  },

  "& .password-input": {
    display: "flex",
    alignItems: "center",
    position: "relative",

    "& input": {
      flex: 1,
      paddingRight: "2.5rem", // espaço pro botão
    },

    "& button": {
      position: "absolute",
      right: "0.5rem",
      background: "none",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "0",
      fontSize: "1.2rem",
      cursor: "pointer",
      color: "#a0a0a0",
      margin: "0",

      "&:hover": {
        color: "#ffffff",
      },
    },
  },

  "& button": {
    marginTop: "1rem",
    padding: "0.8rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#ffffff",
    color: "#121212",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",

    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },

  "& p": {
    marginTop: "1.5rem",
    fontSize: "0.9rem",
    color: "#a0a0a0",
  },

  "& a": {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "500",

    "&:hover": {
      textDecoration: "underline",
    },
  },
});

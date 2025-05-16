import { styled } from "@stitches/react";

export const StyledRegister = styled("div", {
  width: "100%",
  minHeight: "100vh",
  padding: "2rem 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#121212",
  color: "#ffffff",
  overflowY: "auto",
  overflowX: "hidden",

  "& .register-container": {
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

  "& h1, & h2": {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#ffffff",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "2rem",
  },

  "& h2": {
    fontSize: "1.5rem",
    marginBottom: "1.2rem",
  },

  "& .progress-container": {
    width: "100%",
    marginBottom: "2rem",
  },

  "& .progress-bar": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    marginBottom: "0.5rem",

    "&::before": {
      content: "",
      position: "absolute",
      top: "50%",
      left: "0",
      right: "0",
      height: "2px",
      backgroundColor: "#333333",
      transform: "translateY(-50%)",
      zIndex: "1",
    },
  },

  "& .progress-fill": {
    position: "absolute",
    top: "50%",
    left: "0",
    height: "2px",
    backgroundColor: "#ffffff",
    transform: "translateY(-50%)",
    transition: "width 0.3s",
    zIndex: "1",
  },

  "& .step": {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#333333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#a0a0a0",
    fontSize: "0.9rem",
    fontWeight: "500",
    position: "relative",
    zIndex: "2",
    transition: "background-color 0.3s, color 0.3s",

    "&.active": {
      backgroundColor: "#ffffff",
      color: "#121212",
    },

    "&.completed": {
      backgroundColor: "#ffffff",
      color: "#121212",
    },
  },

  "& .step-labels": {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: "0.5rem",

    "& span": {
      fontSize: "0.8rem",
      color: "#a0a0a0",
      textAlign: "center",
      width: "30px",

      "&.active": {
        color: "#ffffff",
      },
    },
  },

  "& form": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  "& input, & select": {
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

    "&::placeholder": {
      color: "#666666",
    },
  },

  "& select": {
    appearance: "none",
    backgroundImage:
      'url(\'data:image/svg+xml;utf8,<svg fill="%23ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>\')',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.7rem top 50%",
    paddingRight: "2rem",
  },

  "& select option": {
    backgroundColor: "#252525",
  },

  "& fieldset": {
    border: "1px solid #333333",
    borderRadius: "4px",
    padding: "1rem",
    marginBottom: "0.5rem",
  },

  "& legend": {
    padding: "0 0.5rem",
    color: "#a0a0a0",
    fontSize: "0.9rem",
  },

  "& fieldset label": {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "#cccccc",
    cursor: "pointer",
  },

  "& input[type=checkbox]": {
    width: "auto",
    cursor: "pointer",
    accentColor: "#ffffff",
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

      "&:hover": {
        color: "#ffffff",
      },
    },
  },

  "& .buttons-container": {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
    gap: "1rem",
  },

  "& button": {
    flex: "1",
    padding: "0.8rem",
    borderRadius: "4px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },

  "& button[type=submit], & button.next": {
    backgroundColor: "#ffffff",
    color: "#121212",

    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },

  "& button.back": {
    backgroundColor: "transparent",
    border: "1px solid #333333",
    color: "#ffffff",
    width: "100%",

    "&:hover": {
      borderColor: "#4d4d4d",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
  },

  "& .welcome-screen": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",

    "& h1": {
      marginBottom: "0.5rem",
    },

    "& .welcome-buttons": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
      marginTop: "2rem",
    },
  },

  "& .error-message": {
    color: "#ff6b6b",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },

  "& .spinner": {
    width: "1.2rem",
    height: "1.2rem",
    border: "3px solid transparent",
    borderTop: "3px solid #121212",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
    margin: "0 auto",
  },

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});

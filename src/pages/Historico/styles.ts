import { styled } from "@stitches/react";

export const StyledHome = styled("div", {
  display: "flex",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#121212",
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
  "& .history-container": {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },

  "& .history-header": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    padding: "0.6rem 1rem",
    backgroundColor: "#222",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "0.95rem",
    color: "#ccc",
    textAlign: "center",
  },

  "& .history-scroll": {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    maxHeight: "400px",
    overflowY: "auto",
    paddingRight: "0.5rem",
  },

  "& .history-row": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    color: "#eee",
    fontSize: "0.9rem",
    gap: "0.5rem",
    textAlign: "center",
  },

  "& .feedback-button, & .treino-button": {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#333",
    border: "1px solid #555",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
    justifySelf: "center",
    minWidth: "90px",
    textAlign: "center",
    margin: "0 auto",
    display: "block",
    "&:hover": {
      backgroundColor: "#555",
    },
  },

  "& .modal-overlay": {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  "& .modal-treino": {
    backgroundColor: "#1e1e1e",
    padding: "2rem",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    color: "#fff",
    position: "relative",
  },

  "& .close-btn": {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
});

import { styled } from "@stitches/react";

export const StyledPage = styled("div", {
  padding: "2rem",
  color: "#fff",
});

export const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",

  "& button": {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
  },

  "& .finalizar": {
    backgroundColor: "#fff",
    color: "#121212",
    borderRadius: "6px",
    padding: "0.5rem 1rem",
    fontWeight: "bold",
  },
});

export const TitleBar = styled("h2", {
  fontSize: "1.5rem",
  fontWeight: "500",
  marginBottom: "1.5rem",
});

export const ExerciseBlock = styled("section", {
  marginBottom: "2rem",

  "& h3": {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },

  "& table": {
    width: "100%",
    borderCollapse: "collapse",

    "& th, & td": {
      padding: "0.5rem",
      textAlign: "center",
      borderBottom: "1px solid #333",
    },

    "& th": {
      color: "#ccc",
      fontWeight: "400",
    },
  },
});

export const SetRow = styled("tr", {});

export const CheckButton = styled("button", {
  width: "28px",
  height: "28px",
  borderRadius: "6px",
  border: "1px solid #666",
  backgroundColor: "#121212",
  color: "#ffffff", // ícone branco
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.2s",

  svg: {
    color: "#ffffff",
  },

  variants: {
    selected: {
      true: {
        backgroundColor: "#00c853",
        transform: "scale(1.1)",
      },
    },
  },
});

export const InputCell = styled("input", {
  width: "80px",
  padding: "0.3rem 0.5rem",
  borderRadius: "4px",
  border: "1px solid #444",
  backgroundColor: "#1f1f1f",
  color: "#fff",
  fontSize: "0.9rem",
  textAlign: "center",

  "&:focus": {
    outline: "1px solid #777",
    backgroundColor: "#2a2a2a",
  },
});

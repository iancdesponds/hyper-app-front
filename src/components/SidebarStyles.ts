// src/components/SidebarStyles.ts
import { styled } from "@stitches/react";

export const SidebarWrapper = styled("aside", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: "#1e1e1e",
  color: "#fff",
  borderRight: "1px solid #333",
  transition: "width 0.2s ease",
  variants: {
    collapsed: {
      true: { width: "60px" },
      false: { width: "250px" },
    },
  },
  defaultVariants: { collapsed: false },

  "& .brand": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0",
    gap: "0.5rem",
    textAlign: "center",
  },

  "& .logo": {
    width: "80px",
  },

  "& nav ul": {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  "& nav li": {
    margin: "0.5rem 0",
  },

  "& nav a": {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.5rem 1rem",
    color: "#ccc",
    textDecoration: "none",
    transition: "background 0.2s",
    "&:hover": {
      backgroundColor: "#2c2c2c",
    },
    "&.active": {
      backgroundColor: "#333",
      color: "#fff",
    },
  },

  "& .bottom-section": {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    gap: "0.5rem",
  },

  "& .username": {
    flex: 1,
    fontSize: "0.9rem",
  },
});

export const ToggleButton = styled("button", {
  position: "absolute",
  top: "10px",
  right: "-12px",
  backgroundColor: "#1e1e1e",
  border: "1px solid #333",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "#fff",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

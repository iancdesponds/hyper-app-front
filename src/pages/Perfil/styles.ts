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
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  
  "& h1": {
    fontSize: "1.5rem",
    fontWeight: "500",
    color: "#ffffff",
  },
});

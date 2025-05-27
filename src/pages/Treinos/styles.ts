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
});


export const TreinoGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1.5rem",
});

export const GridHorizontal = styled("div", {
  display: "grid",
  gridAutoRows: "auto", 
  gap: "1rem",
  marginBottom: "2rem",
});

export const TreinoCard = styled("div", {
  backgroundColor: "#1e1e1e",
  borderRadius: "0.5rem",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
  transition: "transform 0.15s ease",

  "&:hover": {
    transform: "translateY(-4px)",
  },

  "& h2": {
    fontSize: "1.25rem",
    fontWeight: "500",
    color: "#ffffff",
    marginBottom: "0.75rem",
  },

  "& p": {
    fontSize: "0.875rem",
    color: "#cccccc",
    flex: 1,
    marginBottom: "1rem",
  },

  "& ul": {
    listStyle: "disc inside",
    marginBottom: "1rem",

    "& li": {
      fontSize: "0.875rem",
      color: "#cccccc",
      lineHeight: 1.4,
    },
  },

  "& button": {
    alignSelf: "flex-end",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "0.25rem",
    backgroundColor: "#2d6cdf",
    color: "#ffffff",
    cursor: "pointer",
    transition: "background 0.2s",

    "&:hover": {
      backgroundColor: "#1b4fbf",
    },
  },
});


/* já existem StyledHome, Sidebar, Content …  
   acrescente as exportações abaixo no mesmo arquivo */
   
   /* BARRA DE PASSOS + MODAL */
   export const WizardOverlay = styled("div", {
     position: "fixed",
     inset: 0,
     background: "rgba(0,0,0,.6)",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     zIndex: 100,
   });
   
   export const WizardBox = styled("div", {
     width: "100%",
     maxWidth: 420,
     background: "#1e1e1e",
     borderRadius: 8,
     padding: "1.8rem",
     color: "#fff",
     display: "flex",
     flexDirection: "column",
     gap: "1rem",
   
     ".step h3": { fontSize: "1.1rem", marginBottom: ".8rem" },
     ".step input, .step textarea": {
       width: "100%",
       padding: ".6rem .8rem",
       borderRadius: 6,
       border: "1px solid #444",
       background: "#121212",
       color: "#fff",
       marginBottom: ".8rem",
       fontSize: ".875rem",
     },
     ".checkbox": { display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".4rem" },
     ".nav": { display: "flex", justifyContent: "space-between" },
   });
   
   export const StepBar = styled("div", {
     display: "flex",
     justifyContent: "center",
     gap: ".75rem",
     marginBottom: "1rem",
   });
   
   export const StepDot = styled("span", {
     width: 10,
     height: 10,
     borderRadius: "50%",
     background: "#555",
     variants: {
       active: { true: { background: "#2d6cdf" } },
     },
   });
   
   export const NavBtn = styled("button", {
     background: "#2d6cdf",
     color: "#fff",
     border: "none",
     borderRadius: 6,
     padding: ".5rem 1rem",
     fontSize: ".85rem",
     cursor: "pointer",
     transition: "background .2s",
     "&:hover:not(:disabled)": { background: "#1b4fbf" },
     "&:disabled": { opacity: 0.45, cursor: "not-allowed" },
   });
   
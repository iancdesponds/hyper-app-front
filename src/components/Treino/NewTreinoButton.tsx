import { Plus } from "lucide-react";
import { styled } from "@stitches/react";

const Btn = styled("button", {
  display: "",
  alignItems: "center",
  gap: ".5rem",
  background: "#2d6cdf",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: ".6rem 1rem",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background .2s",
  "&:hover": { background: "#1b4fbf" },
});

export default function NewTreinoButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Btn {...props}>
      <Plus size={18} /> Solicitar Novo Treino
    </Btn>
  );
}

import { useState } from "react";
import { WizardOverlay, WizardBox, StepBar, StepDot, NavBtn } from "../../pages/Treinos/styles";
import { Treino} from "../../pages/Treinos/index";



type Props = {
  onClose: () => void;
  onFinished: (novo: Treino) => void;
};

export default function TreinoWizard({ onClose, onFinished }: Props) {
  const [step, setStep] = useState(0);

  const [nome, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [exercSel, setExercSel] = useState<string[]>([]);

  const next = () => setStep((s) => Math.min(s + 1, 2));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    onFinished({
      id: Date.now(),
      nome,
      descricao: desc,
      exercicios: exercSel,
    });
    onClose();
  };

  return (
    <WizardOverlay onClick={onClose}>
      <WizardBox onClick={(e) => e.stopPropagation()}>
        {/* barra de progresso */}
        <StepBar>
          {[0, 1, 2].map((i) => (
            <StepDot key={i} active={i <= step} />
          ))}
        </StepBar>

        {/* conteúdo dos passos */}
        {step === 0 && (
          <div className="step">
            <h3>Informações básicas</h3>
            <input
              type="text"
              placeholder="Nome do treino"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <textarea
              placeholder="Descrição"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
            />
            <NavBtn disabled={!nome} onClick={next}>Próximo</NavBtn>
          </div>
        )}

        {step === 1 && (
          <div className="step">
            <h3>Selecionar exercícios</h3>
            {/* lista fixa de exemplo – troque pela sua API */}
            {["Agachamento", "Supino", "Remada", "Flexão", "Burpee"].map((ex) => (
              <label key={ex} className="checkbox">
                <input
                  type="checkbox"
                  checked={exercSel.includes(ex)}
                  onChange={(e) =>
                    setExercSel((list) =>
                      e.target.checked ? [...list, ex] : list.filter((i) => i !== ex)
                    )
                  }
                />
                {ex}
              </label>
            ))}
            <div className="nav">
              <NavBtn onClick={prev}>Voltar</NavBtn>
              <NavBtn disabled={exercSel.length === 0} onClick={next}>
                Próximo
              </NavBtn>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h3>Revisar</h3>
            <strong>{nome}</strong>
            <p>{desc}</p>
            <ul>
              {exercSel.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <div className="nav">
              <NavBtn onClick={prev}>Voltar</NavBtn>
              <NavBtn onClick={finish}>Salvar treino</NavBtn>
            </div>
          </div>
        )}
      </WizardBox>
    </WizardOverlay>
  );
}

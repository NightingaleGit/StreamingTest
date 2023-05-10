import React, { useState } from "react";
import MainPage from "../MainPage";
import useGetFormulas from "../../hooks/useGetFormulas";
import useAddNewFormula from "./hooks/useAddNewFormula";
import ColorPicker from "./components/ui/ColorPicker";
import FormulaListItem from "./components/ui/FormulaListItem";
import { IFormula } from "../../types/IFormula";

const FormulasPage: React.FC = () => {
  const [formulas] = useGetFormulas();
  const { addNewFormula, isLoading } = useAddNewFormula();
  const [newFormulaColor, setNewFormulaColor] = useState<string>("FFF");
  const [newFormulaText, setNewFormulaText] = useState<string>("");

  return (
    <MainPage>
      <div className="flex h-full flex-col">
        <header>Add new formula</header>
        <div className="flex shrink flex-row gap-1 p-2">
          <input
            required
            className="w-full appearance-none rounded border-field-border-default bg-field-background-default py-2 px-3 leading-tight shadow hover:border-field-border-hover hover:bg-field-background-hover focus:border-field-border-active focus:ring disabled:bg-field-background-disabled"
            id="newFormula"
            name="newFormula"
            placeholder="x+1"
            value={newFormulaText}
            onChange={(e) => setNewFormulaText(e.target.value)}
          />
          <ColorPicker
            initialColor={newFormulaColor}
            onColorChanged={(newColor) => {
              setNewFormulaColor(newColor);
            }}
          />
          <button
            className="
            inline-block
            min-w-fit 
            rounded-md
            border-none 
            bg-signal-active-default py-3 
            px-5 
            text-center 
            text-base 
            no-underline 
            hover:bg-signal-active-dark
            disabled:bg-text-secondary
            "
            disabled={isLoading}
            onClick={() => {
              addNewFormula({
                color: { hexValue: newFormulaColor },
                formula: newFormulaText,
              });
            }}
          >
            Add
          </button>
        </div>
        <header>Current formulas</header>
        <div className="grow">
          <ul className="gap-1">
            {formulas.map((formula: IFormula) => (
              <FormulaListItem formula={formula} key={formula.id} />
            ))}
          </ul>
        </div>
      </div>
    </MainPage>
  );
};

export default FormulasPage;

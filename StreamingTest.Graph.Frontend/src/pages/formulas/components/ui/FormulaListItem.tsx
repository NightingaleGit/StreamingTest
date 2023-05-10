import { useState } from "react";
import { IFormula } from "../../../../types/IFormula";
import ColorPicker from "./ColorPicker";
import useDeleteFormula from "../../hooks/useDeleteFormula";
import useUpdateFormula from "../../hooks/useUpdateFormula";

export interface IFormulaListItemProps {
  formula: IFormula;
}

const FormulaListItem: React.FC<IFormulaListItemProps> = (
  props: IFormulaListItemProps
) => {
  const [formulaText, setFormulaText] = useState<string>(props.formula.formula);
  const [formulaColor, setFormulaColor] = useState<string>(
    props.formula.color.hexValue
  );
  const { deleteFormula, isLoading: isDeleting } = useDeleteFormula();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { updateFormula, isLoading: isUpdating } = useUpdateFormula(() => {
    setIsChanged(false);
  });
  return (
    <li className="w-full p-2">
      <div className="flex w-full grow flex-row gap-1">
        <div className="flex grow basis-3/4 flex-row gap-1">
          <input
            className="w-full appearance-none rounded border-field-border-default bg-field-background-default py-2 px-3 leading-tight shadow hover:border-field-border-hover hover:bg-field-background-hover focus:border-field-border-active focus:ring disabled:bg-field-background-disabled"
            type="text"
            value={formulaText}
            onChange={(e) => {
              setFormulaText(e.target.value);
              setIsChanged(true);
            }}
          />
          <ColorPicker
            initialColor={formulaColor}
            onColorChanged={(newColor: string) => {
              setFormulaColor(newColor);
              setIsChanged(true);
            }}
          />
        </div>

        <div className="grow"></div>
        <div className="flex shrink flex-row gap-1">
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
            type="submit"
            disabled={!isChanged || isUpdating}
            onClick={() =>
              updateFormula({
                id: props.formula.id,
                newFormula: {
                  formula: formulaText,
                  color: {
                    hexValue: formulaColor,
                  },
                },
              })
            }
          >
            Save
          </button>
          <button
            className="
           inline-block
           min-w-fit 
           rounded-md
           border-none
           bg-signal-negative-default 
           py-3 px-5 
           text-center 
           text-base 
           no-underline 
           hover:bg-signal-negative-dark"
            onClick={() => {
              deleteFormula(props.formula.id);
            }}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default FormulaListItem;

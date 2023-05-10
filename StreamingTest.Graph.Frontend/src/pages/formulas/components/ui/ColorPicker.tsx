import { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";

export interface IColorPickerProps {
  onColorChanged?: (color: string) => void;
  initialColor: string;
}

const ColorPicker = (props: IColorPickerProps) => {
  const [choosedColor, setColor] = useState<string>(props.initialColor);

  const [isColorPickerDisplayed, setIsColorPickerDisplayed] =
    useState<boolean>(false);

  const handleClick = () => {
    setIsColorPickerDisplayed((isDisplayed) => !isDisplayed);
  };

  const handleClose = () => {
    setIsColorPickerDisplayed(false);
  };

  const handleChange = (newColor: ColorResult) => {
    const newColorHex = newColor.hex;
    setColor(newColorHex);
    if (props.onColorChanged != null) {
      props.onColorChanged(newColorHex);
    }
  };

  return (
    <div
      className="aspect-square
      h-[48px] w-auto"
    >
      <button
        className="inline-block
        aspect-square
        h-full
        w-full
        cursor-pointer
        rounded-sm
        border-field-border-default
        bg-field-background-default 
        p-[6px]
        leading-tight
        shadow
        hover:border-field-border-hover
        hover:bg-field-background-hover
        focus:border-field-border-active
        focus:ring
        disabled:bg-field-background-disabled
        "
        onClick={handleClick}
      >
        <div
          style={{ backgroundColor: `${choosedColor}` }}
          className="aspect-square h-full w-full rounded-sm"
        ></div>
      </button>
      {isColorPickerDisplayed ? (
        <div className="absolute z-[2]">
          <button className="fixed inset-0" onClick={handleClose} />
          <SketchPicker color={choosedColor} onChangeComplete={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;

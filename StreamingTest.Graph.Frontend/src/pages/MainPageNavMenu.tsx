import { ReactElement } from "react";
import { IconProps } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import useIsInLandscape from "../hooks/useIsInLandscape";

export interface MainPageNavMenuProps {
  buttons: NavMenuButtonsProps[];
}

export interface NavMenuButtonsProps {
  icon: ReactElement<IconProps>;
  title: string;
  subTitle: string;
  path: string;
}

const MainPageNavMenu: React.FC<MainPageNavMenuProps> = (
  props: MainPageNavMenuProps
) => {
  const isInLandscape = useIsInLandscape();

  return (
    <div className="grid items-center">
      <div
        className={`flex ${
          isInLandscape ? "w-fit flex-col justify-self-center" : "overflow-auto"
        }`}
      >
        {props.buttons.map((props, index) => (
          <div
            key={index}
            className="m-2 rounded-md p-2 hover:bg-background-content"
          >
            <NavLink
              to={props.path}
              className={(isActive) =>
                `${isActive ? "bg-background-content" : ""}`
              }
            >
              <div className="flex flex-row">
                <div className="mr-2 w-12 shrink-0 opacity-30">
                  {props.icon}
                </div>
                <h1 className="m-0 flex shrink-0 flex-col uppercase">
                  <div className="text-lg font-bold tracking-wider">
                    {props.title}
                  </div>
                  <div className="translate-y-[-2px] whitespace-nowrap text-xs font-medium tracking-wider opacity-70">
                    {props.subTitle}
                  </div>
                </h1>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPageNavMenu;

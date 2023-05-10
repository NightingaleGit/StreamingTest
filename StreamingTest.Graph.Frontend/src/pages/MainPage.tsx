import useIsInLandscape from "../hooks/useIsInLandscape";
import { WithChildrenProps } from "../types/WithChildrenProps";
import MainPageNavMenu, { NavMenuButtonsProps } from "./MainPageNavMenu";

export interface MainPageProps extends WithChildrenProps {
  navigationButtons?: NavMenuButtonsProps[];
}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
  const isInLandscape = useIsInLandscape();

  return (
    <main
      className={`flex ${
        isInLandscape ? "flex-row" : "flex-col"
      } h-full overflow-y-auto rounded-md p-4 `}
    >
      <aside
        className={`${
          isInLandscape ? "sticky basis-2/12" : "mb-2 shrink"
        } top-0`}
      >
        {props.navigationButtons != null ? (
          <MainPageNavMenu buttons={props.navigationButtons} />
        ) : null}
      </aside>
      <div
        className={`${isInLandscape ? "basis-8/12" : "h-full"} flex flex-col`}
      >
        <div className="grow rounded-xl bg-background-content p-1">
          {props.children}
        </div>
      </div>

      <aside
        className={`${isInLandscape ? "sticky basis-2/12" : "hidden"} top-0`}
      ></aside>
    </main>
  );
};

export default MainPage;

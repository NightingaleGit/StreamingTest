import { Link, NavLink } from "react-router-dom";
import useIsInLandscape from "../hooks/useIsInLandscape";

export interface NavbarProps {
  buttons: NavbarButton[];
}

export interface NavbarButton {
  route: string;
  tittle: string;
}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const isInLandscape = useIsInLandscape();

  return (
    <nav
      className={`flex ${
        isInLandscape ? "flex-row" : "flex-col"
      } bg-header-background px-4`}
    >
      <Link className="m-2 grow text-2xl font-extrabold" to="/">
        Streaming test: graphs
      </Link>
      <ul className="m-0 flex list-none gap-4 p-0">
        {props.buttons.map((button) => (
          <li key={button.tittle}>
            <NavLink
              className={({
                isActive,
              }) => `text-inherit flex h-full items-center p-1 text-lg font-bold no-underline hover:bg-background
                  ${isActive ? " bg-background" : ""}`}
              to={button.route}
            >
              {button.tittle}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

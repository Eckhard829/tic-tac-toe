import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { HeaderWrapper, LightModeIcon, DarkModeIcon } from "./Header.styled";
import { ReactComponent as Logo } from "../../assets/svgs/tic-tac-toe.svg";
import { useNavigate } from "react-router-dom";
import { SfxContext } from "../../contexts/SfxContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { hoverSfx, clickSfx } = useContext(SfxContext);

  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Logo
        className="logo"
        onClick={() => {
          clickSfx[0](); // Call the play function
          clickSfx[1](); // Enable playback
          navigate("/");
        }}
        onMouseEnter={() => { hoverSfx[0](); hoverSfx[1](); }}
      />

      <span
        onClick={() => {
          clickSfx[0](); // Call the play function
          clickSfx[1](); // Enable playback
          toggleTheme();
        }}
        onMouseEnter={() => { hoverSfx[0](); hoverSfx[1](); }}
      >
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </span>

    </HeaderWrapper>
  );
}

export default Header;
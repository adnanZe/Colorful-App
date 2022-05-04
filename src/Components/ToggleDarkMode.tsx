import React from 'react';

interface ToggleDarkModeProps {
  handleClick(): void;
}

function ToggleDarkMode({ handleClick }: ToggleDarkModeProps): JSX.Element {
  return (
    <label className="toggle-darkMode">
      <input
        className="toggle-checkbox"
        type="checkbox"
        onClick={handleClick}
      />
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <div
            className="iconify sun-icon"
            data-icon="feather-sun"
            data-inline="false"
          ></div>
        </div>
        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <div
            className="iconify moon-icon"
            data-icon="feather-moon"
            data-inline="false"
          ></div>
        </div>
      </div>
    </label>
  );
}

export default ToggleDarkMode;

import React, { useCallback } from 'react';
import Title from '../Components/Title';
import useLocalStorage from 'use-local-storage';
import ToggleDarkMode from '../Components/ToggleDarkMode';
import BoxEditor from './BoxEditor';
import BoxInserter from './BoxInserter';
import BoxList from './BoxList';

function App(): JSX.Element {
  const defaultLight = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultLight ? 'dark' : 'light'
  );

  const switchTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }, [theme]);

  return (
    <div className="App" data-theme={theme}>
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>
      <header>
        <Title />
        <ToggleDarkMode handleClick={switchTheme} />
      </header>
      <main>
        <BoxInserter />
        <BoxEditor />
        <BoxList />
      </main>
      {/* <footer>Footer</footer> */}
    </div>
  );
}

export default App;

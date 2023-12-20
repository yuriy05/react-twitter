import React, { useMemo, useReducer, createContext } from "react";
import Page from "./component/page";
import PostList from "./container/post-list"

// import { useWindowListener } from "./util/useWindowListener";

export const THEME_TYPE = {
  DARK: "dark",
  LIGHT: "light",
};

export const ThemeContext = createContext(null);

const THEM_ACTION_TYPE = {
  TOGGLE: "toggle"
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case THEM_ACTION_TYPE.TOGGLE:
      return state === THEME_TYPE.DARK ? THEME_TYPE.LIGHT : THEME_TYPE.DARK;
    default: 
      return state;
  }
}

function App() {

  const [currentTheme, dispatch] = useReducer(themeReducer,THEME_TYPE.LIGHT);

  // const handleChangeTheme = () => {
  //   setTheme((prevTheme) => {
  //     if (prevTheme === THEME_TYPE.DARK) {
  //       return THEME_TYPE.LIGHT
  //     } else {
  //       return THEME_TYPE.DARK
  //     }
  //   });
  // };

  const theme = useMemo(() => ({
    value: currentTheme,
    toggle: () => dispatch({ type: THEM_ACTION_TYPE.TOGGLE }),
  }), [currentTheme]);

  return(
    <Page>
      <ThemeContext.Provider value={theme}>
        <PostList />
      </ThemeContext.Provider>
    </Page>
  );
}

export default App;

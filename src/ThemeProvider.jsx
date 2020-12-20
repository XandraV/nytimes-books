import React, { createContext, useEffect, useState } from "react";

const themes = {
    dark: {
      backgroundColor: 'black',
      color: 'white'
    },
    light: {
      backgroundColor: '#ffe5c8',
      color: 'black'
    }
  }

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {},
};
export const ThemeContext = createContext(initialState);

function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false) // Default theme is light
  
    // On mount, read the preferred theme from the persistence
    useEffect(() => {
      const isDark = localStorage.getItem('dark') === 'true'
      setDark(isDark)
    }, [dark])
  
    // To toggle between dark and light modes
    const toggle = () => {
      const isDark = !dark
      localStorage.setItem('dark', JSON.stringify(isDark))
      setDark(isDark)
    }
  
    // Filter the styles based on the theme selected
    const theme = dark ? themes.dark : themes.light
  
    return (
      <ThemeContext.Provider value={{ theme, dark, toggle }}>
        {children}
      </ThemeContext.Provider>
    )
  }
  
  export default ThemeProvider;
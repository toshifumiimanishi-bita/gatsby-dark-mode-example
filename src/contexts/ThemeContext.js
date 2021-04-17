import React, { createContext, useState, useEffect } from "react"
import { getInitialColorMode } from "../utils/getInitialColorMode"

const isBrowser = typeof window !== "undefined"
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(getInitialColorMode)
  const setColorMode = (value) => {
    rawSetColorMode(value)
    if (isBrowser) {
      window.localStorage.setItem("color-mode", value)
    }
  }

  useEffect(() => {
    const rootElement = document.documentElement

    rootElement.style.setProperty(
      "--base-background-color",
      colorMode === "light"
        ? "var(--theme-light-background-color)"
        : "var(--theme-dark-background-color)"
      )
    rootElement.style.setProperty(
      "--base-color",
      colorMode === "light"
        ? "var(--theme-light-color)"
        : "var(--theme-dark-color)"
      )
  }, [colorMode])

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
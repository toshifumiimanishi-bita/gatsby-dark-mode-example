const React = require("react")

const MagicScriptTag = () => {
  let codeToRunOnClient = `
  (function() {
    function getInitialColorMode() {
      if (typeof window === "undefined") return
      const persistedColorPreference = window.localStorage.getItem("color-mode")
      const hasPersistedPreference = typeof persistedColorPreference === "string"

      if (hasPersistedPreference) {
        return persistedColorPreference
      }

      const mql = window.matchMedia("(prefers-color-scheme: light)")
      const hasMediaQueryPreference = typeof mql.matches === "boolean";

      if (hasMediaQueryPreference) {
        return mql.matches ? "light" : "dark"
      }

      return "light"
    }
    const colorMode = getInitialColorMode()
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
  })()
  `

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />)
}
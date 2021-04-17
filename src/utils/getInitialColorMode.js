export const getInitialColorMode = () => {
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

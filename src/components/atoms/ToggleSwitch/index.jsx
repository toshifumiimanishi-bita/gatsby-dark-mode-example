import React, { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../../contexts/ThemeContext"

const Component = ({ className }) => {
  const { colorMode, setColorMode } = useContext(ThemeContext)
  const handleClick = (event) => {
    const element = event.currentTarget
    const isChecked = element.getAttribute("aria-checked") === "true"
    element.setAttribute("aria-checked", !isChecked)
    setColorMode(!isChecked ? "dark" : "light")
  }

  // The initial render happens in the cloud at compile-time, so colorMode will initially be undefined.
  // HTML will always come with an unchecked toggle switch.
  if (!colorMode) {
    return null
  }

  return (
    <button
      className={className}
      type="button"
      role="switch"
      aria-checked={colorMode === "dark"}
      onClick={handleClick}
    >
      <span role="img" aria-label="Dark mode">🌝</span>
      <span role="img" aria-label="Light mode">🌞</span>
    </button>
  )
}

const StyledComponent = styled(Component)`
  position: relative;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  width: 44px;
  height: 22px;
  padding: 0;
  border-radius: 22px;
  border: 2px solid #e6e6e6;
  background-color: #eee;
  transition: 0.2s background-color ease;
  font-size: 12px;

  > span {
    margin: 0 4px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    transition: 0.2s transform ease;

  }

  &[aria-checked="true"] {
    background-color: #333;

    &::before {
      transform: translateX(100%);
    }
  }

  &:focus {
    outline: 0;
  }

  &:focus-visible {
    box-shadow: rgb(255, 255, 255) 0 0 0 0, rgba(59, 130, 246, 0.5) 0 0 0 2px, rgba(0, 0, 0, 0) 0 0 0 0;
  }

  &:hover {
    cursor: pointer;
  }
`

export const ToggleSwitch = StyledComponent;
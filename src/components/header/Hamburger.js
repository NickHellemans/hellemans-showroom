import React from "react"
import propTypes from "prop-types"
import { HamburgerButton } from "./headerStyles/headerStyles"
import { GiHamburgerMenu } from "react-icons/gi"

const Hamburger = ({ handleOverlayMenu }) => {
  return (
    <HamburgerButton onClick={handleOverlayMenu} tabIndex="0">
      <GiHamburgerMenu style={{ width: "3rem", height: "3rem" }} />
    </HamburgerButton>
  )
}

Hamburger.propTypes = {
  handleOverlayMenu: propTypes.func,
}

export default Hamburger

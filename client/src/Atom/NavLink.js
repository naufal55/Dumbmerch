import React from 'react'
import {Nav} from "react-bootstrap";
import { Link } from 'react-router-dom';

const NavLink = (props) => {
  return (
    <Nav.Link className={"me-2 "+props.color} onClick={props.click}>{props.label}</Nav.Link>
  )
}

export default NavLink
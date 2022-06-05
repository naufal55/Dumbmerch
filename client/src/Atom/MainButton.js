import React from "react";
import { Button, Form } from "react-bootstrap";

const MainButton = (props) => {
  return (
    <Button
      className="w-100 text-light Rounded-5"
      type={props.type}
      onClick={props.click}
      variant={props.color}
      disabled={props.disable}
    >
      {props.btn}
    </Button>
  );
};
export default MainButton;

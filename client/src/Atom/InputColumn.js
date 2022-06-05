import React from "react";
import { Form } from "react-bootstrap";

const InputColumn = (props) => {
  return (
    <>
      <Form.Control // //form control = input
        className="mx-auto my-3"
        style={{ color: "white",
        backgroundColor: "#474747",
        border:"2px solid white" }}
        onChange={props.change}
        value={props.value}
        name={props.name}
        type={props.type}
        placeholder={props.holder}
        as={props.as}
        rows={props.rows}
        readOnly={props.only}
        onKeyPress={props.press}
      />
    </>
  );
};

export default InputColumn;

import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ModalDelete({close,show,setConfirmDelete}) {
  const handleDelete = () => {
    return setConfirmDelete(true);
  }
  return (
    <>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want delete this data?</Modal.Body>
        <Modal.Footer>
          <Button className="w-25" variant="secondary" onClick={handleDelete}>
            yes
          </Button>
          <Button className="w-25" variant="danger" onClick={close}>
            no
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

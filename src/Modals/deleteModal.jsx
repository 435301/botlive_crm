import React from "react";
import { Modal, Button } from "react-bootstrap";


const DeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-light text-dark">
        <Modal.Title>
          <i className="bi bi-exclamation-triangle-fill me-2"></i> Confirm Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">Are you sure you want to delete this item?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end d-flex">
          <Button className="me-3" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            <i className="bi bi-trash me-1"></i> Delete
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};


export default DeleteConfirmationModal;

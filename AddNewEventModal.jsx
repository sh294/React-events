import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { EventForm } from "./EventForm";

export default function AddNewEventModal({ isOpen, onClose, handleCreate }) {
  return (
    <div>
      {" "}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blue.500">Add New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventForm onSubmit={handleCreate} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

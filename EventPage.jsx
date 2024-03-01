import React from "react";
import { useToast, useDisclosure } from "@chakra-ui/react";
import { Text, Heading, Button, Image, Tag, Box } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import "../index.css";
import { useState, useRef } from "react";
import AlertBox from "../components/AlertBox";
import EditEventModal from "../components/EditEventModal";
import moment from "moment";

export const loader = async ({ params }) => {
 
  const event = await fetch(`http://localhost:3001/events/${params.eventId}`);
  const users = await fetch("http://localhost:3001/users");
  const categories = await fetch("http://localhost:3001/categories");
   return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/events/${params.eventId}`, {
      method: "DELETE",
    });

    navigate("/events");
    onClose();
    toast({
      title: "Event was Successfully Deleted.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSave = async (values) => {
    try {
      const { categoryIds, ...rest } = values;
      await fetch(`http://localhost:3001/events/${params.eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          categoryIds: categoryIds,
          createdBy: parseInt(values.createdBy),
        }),
      });
      navigate("/events");
      toast({
        title: "Event Updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.message || "Something went wrong.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <div className="eventpage-container">
      <Box>
        <div className="event-page-hero">
          <Image src={event.image} alt={event.title} h="50rem" fit="cover" />
        </div>
        <div className="event-hero-text">
          <div className="event-page-hero-card-top"></div>
          <div className="event-hero-text-a">
            <Heading color="blue.500" mt="2rem">
              {event.title}
            </Heading>

            <Text mb="1rem">{event.description}</Text>

            <Text mt=".5rem">
              {categories
                .filter(
                  (category) =>
                    event.categoryIds && event.categoryIds.includes(category.id)
                )
                .map((category, index, arr) => {
                  const isLast = index === arr.length - 1;
                  const color = isLast ? "green" : "blue";
                  return (
                    <Tag
                      size="lg"
                      colorScheme={color}
                      variant="solid"
                      key={category.id}
                      mr=".5rem"
                    >
                      {category.name}
                    </Tag>
                  );
                })}
            </Text>
          </div>
          <div className="event-page-text-sections">
            <div>
              <Text fontSize="xl" as="b">
                Start Time:
              </Text>
              <Text>
                {moment(event.startTime).format("MMM Do YYYY, h:mm a")}
              </Text>
              <Text fontSize="xl" as="b">
                End Time:
              </Text>
              <Text>
                {moment(event.startTime).format("MMM Do YYYY, h:mm a")}
              </Text>
            </div>
            <div>
              <div className="eventpage-createdby">
                <Text color="gray.500">Created By :</Text>
                {users.map((user) => {
                  if (user.id === event.createdBy) {
                    return (
                      <React.Fragment key={user.id}>
                        <Image
                          borderRadius="full"
                          boxSize="110px"
                          src={user.image}
                          alt={user.name}
                        />
                        <Text>{user.name}</Text>
                      </React.Fragment>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="eventpage-links">
            <Button
              mt="2rem"
              colorScheme="green"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </Button>
            <Button
              mt="2rem"
              mb="2rem"
              colorScheme="red"
              color="white"
              onClick={onOpen}
              _hover={{ bg: "red.700", color: "white" }}
            >
              Delete
            </Button>
            <Link to="/events" className="back-link">
              <Text mb="2rem" as="ins" color="blue.500">
                Back to Events
              </Text>
            </Link>
          </div>
        </div>
        <AlertBox
          isOpen={isOpen}
          handleDelete={handleDelete}
          cancelRef={cancelRef}
          onClose={onClose}
        />
      </Box>
      <EditEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleSave={handleSave}
        event={event}
      />
    </div>
  );
};

import { Skeleton, useDisclosure, useToast } from "@chakra-ui/react";
import {
  Card,
  Heading,
  Stack,
  Text,
  Flex,
  Box,
  Image,
  Tag,
  Button,
} from "@chakra-ui/react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import AddNewModal from "../components/AddNewEventModal";
import { useState } from "react";
import moment from "moment/moment";
import Filter from "../components/Filter";
import { Suspense } from "react";
import AlbumGlimmer from "../components/AlbumGlimmer";

export const loader = async () => {
  try {
    const baseUrl = "http://localhost:3001";
    const eventsUrl = new URL("/events", baseUrl);
    const categoriesUrl = new URL("/categories", baseUrl);

    const [eventsResponse, categoriesResponse] = await Promise.all([
      fetch(eventsUrl),
      fetch(categoriesUrl),
    ]);

    if (!eventsResponse.ok || !categoriesResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const events = await eventsResponse.json();
    const categories = await categoriesResponse.json();

    return { events, categories };
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData() || {}; // Handle cases where data is undefined
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();
  const isLoading = !events || !categories;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categoryIdsFilter = searchParams.getAll("categoryIds");

  const filteredEvents = categoryIdsFilter.length
    ? events.filter((event) =>
        categoryIdsFilter.every(
          (categoryId) =>
            event.categoryIds &&
            event.categoryIds.includes(parseInt(categoryId))
        )
      )
    : events;

  const handleCreate = async (values) => {
    const { categoryIds, ...rest } = values;
    try {
      const response = await fetch(`http://localhost:3001/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          categoryIds: categoryIds,
          createdBy: parseInt(values.createdBy),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      onClose();
      navigate("/events");
      toast({
        title: "Event Created.",
        description: "We've created a new Event for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error(`Error: ${error}`);
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

  if (isLoading) {
    return (
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <Skeleton height="20px" mb="2rem" />
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} height="300px" mb="1.5rem" />
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <Heading mt="2rem" ml="3%" color="blue.500">
        List of Events
      </Heading>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div className="filter-nav">
          <Filter
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setsearchParams={setSearchParams}
          />
        </div>
        <Button
          mt="2rem"
          colorScheme="blue"
          onClick={onOpen}
          className="add-new-event-button"
        >
          Add New Event
        </Button>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Flex flexWrap="wrap" justifyContent="center">
            {filteredEvents
              .filter(
                (event) =>
                  searchValue.toLowerCase() === "" ||
                  Object.values(event)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((event) => (
                <Box
                  key={event.id}
                  width={{
                    base: "100%",
                    md: "46%",
                    lg: "40%",
                    xl: "30%",
                    "2xl": "30%",
                  }}
                  m={2}
                >
                  <Link to={`event/${event.id}`}>
                    <Card
                      type="outline"
                      borderRadius="lg"
                      mt="1.5rem"
                      transition="transform .2s ease-out"
                      _hover={{ transform: "scale(1.05)" }}
                    >
                      <div className="eventspage-card-images">
                        <Image
                          w="100%"
                          h="350px"
                          src={event.image}
                          alt={event.title}
                          fit="cover"
                          overflow="hidden"
                          borderTopRadius="lg"
                        />
                      </div>
                      <Suspense fallback={<AlbumGlimmer />}>
                        <Stack p={4}>
                          <Heading size="md">{event.title}</Heading>
                          <Text>{event.description}</Text>
                          <Text color="gray.500">Start Time:</Text>
                          <Text>
                            {moment(event.startTime).format(
                              "MMM Do YYYY, h:mm a"
                            )}
                          </Text>
                          <Text color="gray.500">End Time:</Text>
                          <Text>
                            {moment(event.endTime).format(
                              "MMM Do YYYY, h:mm a"
                            )}
                          </Text>
                          <Text color="gray.500">Location:</Text>
                          <Text>{event.location}</Text>
                          <Text>
                            {categories
                              .filter(
                                (category) =>
                                  event.categoryIds &&
                                  event.categoryIds.includes(category.id)
                              )
                              .map((category) => (
                                <Tag
                                  size="lg"
                                  colorScheme={
                                    category.name === "sports"
                                      ? "green"
                                      : "blue"
                                  }
                                  variant="solid"
                                  key={category.id}
                                  mr=".5rem"
                                >
                                  {category.name}
                                </Tag>
                              ))}
                          </Text>
                        </Stack>
                      </Suspense>
                    </Card>
                  </Link>
                </Box>
              ))}
          </Flex>
        </Suspense>
        <AddNewModal
          handleCreate={handleCreate}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Suspense>
    </div>
  );
};

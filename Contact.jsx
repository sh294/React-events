import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <Flex
          flexDirection={["column", "row"]}
          flexWrap="wrap"
          justifyContent={"space-between"}
          gap={"2rem"}
        >
          <Box>
            <Heading className="about-welcome-text"> Adress</Heading>
            <Text
              mt="1rem"
              color="gray.600"
              lineHeight={7}
              fontSize="clamp(1rem, 0.95rem + 0.25vw, 1.25rem)"
            >
              Address: ........ <Text>1234 NP,Amsterdam</Text>
              <Text>Netherland</Text>
            </Text>
          </Box>

          <Box>
            <Heading color="black">Contact</Heading>{" "}
            <Text
              color="gray.600"
              lineHeight={7}
              fontSize="clamp(1rem, 0.95rem + 0.25vw, 1.25rem)"
            >
              <Text mt="1rem">+31 (0)12 34 56 789</Text>
              info@eventswebsite.nl
              <Text>Amsterdam,Netherland.</Text>
            </Text>
          </Box>
        </Flex>

        <Heading mt="5rem" color="black">
          Join us here ,we are waiting for you!
        </Heading>

        <div className="about-salesbox">
          <Heading>The World is waiting.</Heading>{" "}
          <Heading>Where are you?</Heading>
          <Link to="/events">
            <Button mt="2rem" colorScheme="gray" color="green">
              Book your Events!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;

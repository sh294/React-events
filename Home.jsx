import { } from "@chakra-ui/icons";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="about-container">
      <Box position="relative" h="100vh">
        <div className="home-hero">
          <img src="https://images.pexels.com/photos/1936954/pexels-photo-1936954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
        </div>

        <div className="home_hero_text">
          <h1>The World is Waiting! </h1>
          <br />
          <br />
          <h1>Where are you?</h1>
        </div>
      </Box>
      <div className="home-text">
        <Heading className="about-welcome-text">
          {" "}
          Welcome to Winc Events!
        </Heading>
        <Text
          mt="1.5rem"
          lineHeight={7}
          fontSize="clamp(1rem, 0.95rem + 0.25vw, 1.25rem)"
        >
          We are a time efficient event management company that can give you the
          pleasure and new experience located in Amsterdam!{" "}
        </Text>
        <Text lineHeight={7} fontSize="clamp(1rem, 0.95rem + 0.25vw, 1.25rem)">
          <br></br>
          From thrilling bungee jumping and hiking adventures to healthy yoga
          brunch events, we have something for all tastes and preferences.
          {" "}
        </Text>
        <Heading mt="1rem" mb="1rem">
          What we do?
        </Heading>
        <Text
          mb="1.5rem"
          lineHeight={7}
          fontSize="clamp(1rem, 0.95rem + 0.25vw, 1.25rem)"
        >
          Our events cater to families, groups of friends, and corporate teams,
          providing unforgettable experiences that are sure to create lasting
          memories. {" "}
        </Text>
      </div>
      <Box className="about-salesbox" m="auto" zIndex={10} w="80%">
        <Text fontSize="1.5rem">
          <br></br>Join us here,we are waiting for you!
        </Text>
        <Link to="/events">
          <Button mt="2rem" colorScheme="gray" color="green">
            Book your Events
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
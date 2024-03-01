import React from "react";
import { Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="about-container">
      <div className="about-text">
        <Heading className="about-welcome-text">
          {" "}
          Welcome to Winc Events!
        </Heading>
        <Text lineHeight={7} fontSize="clamp(1rem, 0.95rem + 0.25vw, 1.25rem)">
          <Text mt="1.5rem">
            We are a time efficient event management company that can give you
            the pleasure and new experience!{" "}
          </Text>
          <Text>
            <br></br>
            From thrilling bungee jumping and hiking adventures to healthy yoga
            brunch events, we have something for all tastes and preferences.{" "}
          </Text>
          <span>
            Our events cater to families, groups of friends, and corporate
            teams, yong and old providing unforgettable experiences that are
            sure to create lasting memories.{" "}
          </span>
        </Text>
        <div className="about-salesbox">
          <Heading>The World is waiting.</Heading>{" "}
          <Heading>Where are you?</Heading>
          <Link to="/events">
            <Button mt="2rem" colorScheme="gray" color="green">
              Book your Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

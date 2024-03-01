import React from "react";
import { Text } from "@chakra-ui/react";

import "../index.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="logo" onClick={scrollToTop}>
        
        </div>

        <Text fontSize="sm">copyright@wincevents2024.</Text>
      </div>
    </div>
  );
}



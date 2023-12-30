import React from "react";
import Announcements from "../../../components/Announcements";

const HackerPortal = () => {
  return (
    <div>
      <h1>Welcome to HackerPortal</h1>
      {/* Render the Notifications component */}
      <Announcements />
    </div>
  );
};

export default HackerPortal;
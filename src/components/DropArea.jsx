import React, { useState } from "react";
import "./DropArea.css";
const DropArea = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? "drop_area" : "hide_area"}
    >
      Drop here
    </section>
  );
};

export default DropArea;

// https://youtu.be/CJycVlSuaPg?si=a0p2ryxZL8s9ASYc

import React, { useState } from "react";
import styles from "./Popup.module.css"; // Import your CSS file

const Popup = ({ onClose, paritPrice }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // You can handle the input value here
    console.log("Input value:", inputValue);
    onClose(); // Close the popup
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter something..."
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Popup;

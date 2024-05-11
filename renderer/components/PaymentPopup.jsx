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
        <p>כיצד ברצונך לשלם?</p>
        <button onClick={() => {}}>כרטיס אשראי</button>
        <button onClick={() => {}}>כרטיס אשראי (תשלומים)</button>
        <button onClick={() => {}}>מזומן</button>
      </div>
    </div>
  );
};

export default Popup;

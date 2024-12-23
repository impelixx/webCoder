import React, { useState } from "react";
import { Play } from "lucide-react";
import styles from '../styles/TopBar.module.css';

interface TopBarProps {
  runCode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ runCode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dynamicTopBarStyle: React.CSSProperties = {
    padding: isHovered ? "10px" : "2px",
    height: isHovered ? "60px" : "5px",
    top: isHovered ? "0" : "-55px",
  };

  const dynamicRunButtonContainerStyle: React.CSSProperties = {
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? "translate(-50%, -50%)" : "translate(-50%, -70%)",
  };

  return (
    <div>
      <div
        className={styles.hoverArea}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div
        className={styles.topBar}
        style={dynamicTopBarStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={styles.runButtonContainer}
          style={dynamicRunButtonContainerStyle}
        >
          <Play onClick={runCode} className={styles.runButton} color="green" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
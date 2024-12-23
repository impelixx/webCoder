import React, { useEffect } from 'react';
import styles from '../styles/ConsoleOutput.module.css';

interface ConsoleOutputProps {
  output: string;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const ConsoleOutput: React.FC<ConsoleOutputProps> = ({ output, isVisible, setIsVisible }) => {

  if (!isVisible) return null;

  return (
    <div className={styles.console}>
      <div className={styles.consoleHeader}>
        <span>Вывод</span>
        <button 
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
      </div>
      <div className={styles.consoleContent}>
        {output}
      </div>
    </div>
  );
};

export default ConsoleOutput;
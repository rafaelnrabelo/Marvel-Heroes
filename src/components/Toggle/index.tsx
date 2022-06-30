import { useState } from "react";
import styles from "./Toggle.module.scss";

interface ToggleProps {
  onChange?: (value: boolean) => void;
  style?: React.CSSProperties;
}

const Toggle: React.FC<ToggleProps> = ({ onChange, style }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <button
      className={styles.toggle_container}
      onClick={handleToggle}
      style={style}
    >
      <span
        className={styles.toggle_circle}
        style={{ marginLeft: isChecked ? "34px" : 0 }}
      />
    </button>
  );
};

export default Toggle;

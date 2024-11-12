import styles from "./styles.module.css";

interface SizeProps {
  label: number;
  selected: boolean;
  disabled: boolean;
  onClick(label: number, selected: boolean): void;
}

export const Size: React.FC<SizeProps> = ({
  label,
  selected,
  disabled,
  onClick,
}) => {
  return (
    <div className={styles.tooltipSelectedSize}>
      <div
        className={
          `${styles.size} ${selected ? styles.selected : ""}` +
          `${disabled ? styles.disabled : ""}`
        }
        onClick={() => {
          if (!disabled) {
            onClick(label, !selected);
          }
        }}
      >
        {label}
      </div>
      <span>Размера нет в наличии</span>
    </div>
  );
};

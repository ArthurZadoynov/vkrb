import styles from "./styles.module.css";

interface SizeProps {
  label: number;
  selected: boolean;
  disabled: boolean;
  onClick(label: number, selected: boolean): void; // Определяем тип свойства onClick как функцию, принимающую размер и его состояние (выбран/не выбран) и не возвращающую значения.
}

export const Size: React.FC<SizeProps> = ({
  // Деструктурируем свойства из переданных пропсов.
  label,
  selected,
  disabled,
  onClick,
}) => {
  return (
    <div className={styles.tooltipSelectedSize}>
      <div
        className={
          // Устанавливаем классы для элемента: класс "selected" если размер выбран, и класс "disabled" если размер недоступен.
          `${styles.size} ${selected ? styles.selected : ""}` +
          `${disabled ? styles.disabled : ""}`
        }
        onClick={() => {
          if (!disabled) {
            // Проверяем, доступен ли размер для выбора (не отключен).
            onClick(label, !selected); // Вызываем функцию onClick с текущим размером и противоположным состоянием (выбран/не выбран).
          }
        }}
      >
        {label}
      </div>
      <span>Размера нет в наличии</span>
    </div>
  );
};

import { useState, useEffect } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1080); // Создаем состояние isMobile, инициализируя его значением true, если ширина окна меньше 1080 пикселей

  useEffect(() => {
    // Функция для обновления состояния isMobile в зависимости от ширины окна
    const updateSize = () => {
      setIsMobile(window.innerWidth < 980); // Обновляем состояние isMobile, если ширина окна меньше 980 пикселей
    };
    window.addEventListener("resize", updateSize); // Добавляем обработчик события resize на объект window
    return () => window.removeEventListener("resize", updateSize); // Возвращаем функцию очистки, которая удаляет обработчик события при размонтировании компонента
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

  return isMobile;
};

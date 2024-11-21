const PATTERN = /\D/g; // Регулярное выражение для поиска всех символов, которые не являются цифрами (нечисловые символы).

// Функция получения только чисел
const getInputNumbersValue = (value: string) => {
  return value.replace(PATTERN, ""); //Методом replace заменяем все, что не числа, на пустой символ
};

export const handlePhoneInput = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const input = event.target; // Получаем элемент input, на котором произошло событие изменения.
  let inputNumbersValue = getInputNumbersValue(input.value); //Тут будем хранить только числовое значение
  let formattedInputValue = ""; //Создаем переменную, куда будет падать измененное значение
  const selectionStart = input.selectionStart; //Переменная для курсора

  if (!inputNumbersValue) {
    return (input.value = ""); // Если нет чисел, очищаем значение input и выходим из функции.
  }

  if (input.value.length !== selectionStart) {
    return; // Если длина значения input не совпадает с позицией курсора, не выполняем дальнейшую обработку (курсора останется на месте).
  }

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    // Проверяем, начинается ли вводимый номер с цифр 7, 8 или 9 (для российских номеров).
    //Обработчик на Ru номера
    if (inputNumbersValue[0] === "9") {
      inputNumbersValue = "7" + inputNumbersValue;
    }

    const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7"; // Определяем начальные символы формата номера: "8" или "+7".
    formattedInputValue = firstSymbols + " "; // Добавляем начальные символы и пробел к форматированному значению.

    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.substring(1, 4); // Если есть больше одной цифры, добавляем скобки с кодом города.
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.substring(4, 7); // Если есть больше четырех цифр, добавляем следующий блок номера.
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.substring(7, 9); // Если есть больше семи цифр, добавляем дефис и следующий блок номера.
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.substring(9, 11); // Если есть больше девяти цифр, добавляем дефис и последний блок номера.
    }
  } else {
    formattedInputValue = "+" + inputNumbersValue.substring(0, 24); // Если номер не начинается с 7, 8 или 9, просто добавляем "+" и ограничиваем длину до 24 символов.
  }

  input.value = formattedInputValue; // Устанавливаем отформатированное значение обратно в input.
};

export const handlePhoneKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  //Удаляем первый элемент
  const input = event.target as HTMLInputElement; // Получаем элемент input, на котором произошло событие нажатия клавиши.
  if (
    // Если нажата клавиша Backspace и в input осталась только одна цифра,
    // очищаем значение input.
    event.key === "Backspace" &&
    getInputNumbersValue(input.value).length === 1
  ) {
    input.value = "";
  }
  return input; // Возвращаем элемент input после обработки события нажатия клавиши.
};

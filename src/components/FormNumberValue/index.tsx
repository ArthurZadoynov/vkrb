const PATTERN = /\D/g; //Регулярное выражение

// Функция получения только чисел
const getInputNumbersValue = (value: string) => {
  return value.replace(PATTERN, ""); //Методом replace заменяем все, что не числа, на пустой символ
};

export const handlePhoneInput = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const input = event.target;
  let inputNumbersValue = getInputNumbersValue(input.value); //Тут будем хранить только числовое значение
  let formattedInputValue = ""; //Создаем переменную, куда будет падать измененное значение
  const selectionStart = input.selectionStart; //Переменная для курсора

  if (!inputNumbersValue) {
    return (input.value = "");
  }

  if (input.value.length !== selectionStart) {
    return; // //Оставляем курсор, где нажали
  }

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    //Обработчик на Ru номера
    if (inputNumbersValue[0] === "9") {
      inputNumbersValue = "7" + inputNumbersValue;
    }

    const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
    formattedInputValue = firstSymbols + " ";

    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = "+" + inputNumbersValue.substring(0, 24);
  }

  input.value = formattedInputValue;
};

export const handlePhoneKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  //Удаляем первый элемент
  const input = event.target as HTMLInputElement;
  if (
    event.key === "Backspace" &&
    getInputNumbersValue(input.value).length === 1
  ) {
    input.value = "";
  }
  return input;
};

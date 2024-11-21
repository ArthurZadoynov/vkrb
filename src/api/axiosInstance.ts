import axios from "axios"; // Импортируем библиотеку axios для выполнения HTTP-запросов

export const instance = axios.create({
  // Создаем экземпляр axios с заданными настройками
  baseURL: "https://487fa880b8d6bbea.mokky.dev", // базовый URL, который будет использоваться для всех запросов через этот экземпляр
});

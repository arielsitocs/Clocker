import type WorldClockTypes from "@/src/types/WorldClockTypes";

export const worldClocksData: WorldClockTypes[] = [
  { id: 1, city: "Londres", country: "Reino Unido", timezone: "GMT+0", utcOffset: 0, time: "21:45PM" },
  { id: 2, city: "Berlín", country: "Alemania", timezone: "CET", utcOffset: 1, time: "22:32PM" },
  { id: 3, city: "París", country: "Francia", timezone: "CET", utcOffset: 1, time: "21:55PM" },
  { id: 4, city: "Zurich", country: "Suiza", timezone: "CET", utcOffset: 1, time: "21:55PM" },
  { id: 5, city: "Dublin", country: "Irlanda", timezone: "GMT+0", utcOffset: 0, time: "22:05PM" },
  { id: 6, city: "Madrid", country: "España", timezone: "CET", utcOffset: 1, time: "22:10PM" },
  { id: 7, city: "Roma", country: "Italia", timezone: "CET", utcOffset: 1, time: "22:15PM" },
  { id: 8, city: "Amsterdam", country: "Países Bajos", timezone: "CET", utcOffset: 1, time: "22:20PM" },
  { id: 9, city: "Nueva York", country: "Estados Unidos", timezone: "EST", utcOffset: -5, time: "04:45PM" },
  { id: 10, city: "Los Ángeles", country: "Estados Unidos", timezone: "PST", utcOffset: -8, time: "01:45PM" },
  { id: 11, city: "Tokio", country: "Japón", timezone: "JST", utcOffset: 9, time: "06:45AM" },
  { id: 12, city: "Sídney", country: "Australia", timezone: "AEDT", utcOffset: 11, time: "08:45AM" },
  { id: 13, city: "Hong Kong", country: "China", timezone: "HKT", utcOffset: 8, time: "05:45AM" },
  { id: 14, city: "Singapur", country: "Singapur", timezone: "SGT", utcOffset: 8, time: "05:45AM" },
  { id: 15, city: "Dubái", country: "Emiratos Árabes", timezone: "GST", utcOffset: 4, time: "01:45AM" }
];

export default worldClocksData;

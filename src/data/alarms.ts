import type AlarmTypes from "@/src/types/AlarmTypes";

const allDays: AlarmTypes["weekDays"] = ["L", "M", "X", "J", "V", "S", "D"];

export const alarmsData: AlarmTypes[] = [
  { id: '1', hours: "06", minutes: "30", weekDays: allDays, selectedDays: [], enabled: true },
  { id: '2', hours: "07", minutes: "00", weekDays: allDays, selectedDays: [], enabled: true },
  { id: '3', hours: "07", minutes: "45", weekDays: allDays, selectedDays: [], enabled: false },
  { id: '4', hours: "08", minutes: "15", weekDays: allDays, selectedDays: [], enabled: true },
  { id: '5', hours: "09", minutes: "00", weekDays: allDays, selectedDays: [], enabled: false },
  { id: '6', hours: "10", minutes: "30", weekDays: allDays, selectedDays: [], enabled: true },
  { id: '7', hours: "12", minutes: "00", weekDays: allDays, selectedDays: [], enabled: false },
  { id: '8', hours: "13", minutes: "45", weekDays: allDays, selectedDays: [], enabled: true },
  { id: '9', hours: "18", minutes: "30", weekDays: allDays, selectedDays: [], enabled: true },
  { id: '10', hours: "22", minutes: "00", weekDays: allDays,selectedDays: [],  enabled: false }
];

export default alarmsData;

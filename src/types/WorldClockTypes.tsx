interface WorldClockTypes {
  id: number;
  city: string;
  country: string;
  timezone: string;
  utcOffset?: number; // offset en horas desde UTC
  time: string; // hora ficticia para demo
}

export default WorldClockTypes;

export interface IClassTimetable {
  className: string;
  location: string;
  time: string;
}

export interface IClass {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  day: string;
  category: string;
}

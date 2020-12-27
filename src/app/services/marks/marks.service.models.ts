export interface IClass {
  id: number;
  year: number;
  symbol: string;
}

export interface ISchedule {
  id: number;
  subjectName: string;
  subjectProfile: 'Basic' | 'Advanced';
  dayOfWeek: 'Monday' |
    'Tuesday' |
    'Wednesday' |
    'Thursday' |
    'Friday' |
    'Saturday' |
    'Sunday';
  roomNumber: number;
  hourStart: string;
  hourEnd: string;
  dateStart: string;
  dateEnd: string;
}

export interface IMark {
  studentId: number;
  studentName: string;
  studentSurname: string;
  marks: Array<{
    id: number;
    mark: number;
    weight: number;
    dateOfIssue: string;
    comment: string;
  }>;
}

export interface IStudentMark {
  id: number;
  studentId: number;
  scheduleId: number;
  mark: number;
  weight: number;
  comment: string;
}

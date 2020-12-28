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

export interface ILesson {
  lessonId: number;
  scheduleId: number;
  topic: string;
  date: string;
  students: ILessonStudent[];
}

export interface ILessonStudent {
  studentId: number;
  isPresent: boolean;
  studentName: string;
  studentSurname: string;
}

export interface IStudent {
  id: number;
  name: string;
  surname: string;
}

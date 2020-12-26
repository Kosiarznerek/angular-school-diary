export interface ITeacherSubject {
  id: number;
  name: string;
  profile: 'Basic' | 'Advanced';
  teacherName: string;
  teacherSurname: string;
}

export interface ISchedule {
  id: number;
  classId: number;
  subject: ITeacherSubject;
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

export interface IAttendance {
  teacherSubjectId: number;
  subjectName: string;
  subjectProfile: 'Basic' | 'Advanced';
  teacherName: string;
  teacherSurname: string;
  lessons: Array<{
    topic: string;
    date: string;
    isPresent: boolean;
  }>;
}

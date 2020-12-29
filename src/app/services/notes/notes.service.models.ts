export interface IStudent {
  id: number;
  name: string;
  surname: string;
}

export interface INote {
  id: number;
  studentId: number;
  teacherId: number;
  content: string;
}

export interface INoteDetails {
  id: number;
  teacherName: string;
  teacherSurname: string;
  content: string;
}

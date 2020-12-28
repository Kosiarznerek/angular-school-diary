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

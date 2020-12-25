export interface IClass {
  id: number;
  tutor: IPerson;
  students: IPerson[];
  year: number;
  symbol: string;
}

export interface IPerson {
  id: number;
  name: string;
  surname: string;
}

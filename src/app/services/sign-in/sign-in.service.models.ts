export interface ISignInCredentials {
  login: string;
  password: string;
  type: 'student' | 'parent' | 'teacher' | 'administrator';
}

export interface IUserCredentials {
  userId: number;
  detailsId: number;
  type: 'student' | 'parent' | 'teacher' | 'administrator';
}

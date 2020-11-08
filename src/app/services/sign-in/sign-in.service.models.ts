export interface ISignInDto {
  login: string;
  password: string;
  type: 'student' | 'parent' | 'teacher' | 'administrator';
}

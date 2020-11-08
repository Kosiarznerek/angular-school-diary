export interface IUserListItemDto {
  id: number;
  login: string;
  accountType: 'student' | 'parent' | 'teacher' | 'administrator';
  name: string;
  surname: string;
}

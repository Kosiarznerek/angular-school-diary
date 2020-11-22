export interface IUserFilter {
  student?: boolean;
  parent?: boolean;
  teacher?: boolean;
  administrator?: boolean;
}

export interface IUserBaseData {
  id: number;
  login: string;
  accountType: 'student' | 'parent' | 'teacher' | 'administrator';
  name: string;
  surname: string;
}

export interface IUserDetailsData extends IUserBaseData {
  address?: string;
  phone?: string;
  email?: string;
  parentIds?: number[];
  childrenIds?: number[];
  subjects?: Array<{
    subjectId: number;
    profile: 'basic' | 'advanced'
  }>;
}

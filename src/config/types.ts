export interface Course {
  name: string;
  note: string;
  credit: string;
}

export interface Semester {
  courses: Course[];
}

export interface SemesterInfo {
  credit: string | number;
  gpa: string | number;
}

export interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface LoginProps {
  className: string;
  user?: User | null | undefined;
  type: string;
}

export interface Course {
  name: string;
  note: string;
  credit: string;
}

export interface Semester {
  courses: Course[];
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

export interface UserCourses {
  semesterYear: number;
  courseName: string;
  courseNote: number;
  courseCredit: number;
  userId: string;
}

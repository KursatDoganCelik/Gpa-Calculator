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

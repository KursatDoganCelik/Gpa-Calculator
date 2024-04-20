export interface Course {
  name: string;
  note: string;
  credit: string;
}


export interface Semester {
  courses: Course[]
}

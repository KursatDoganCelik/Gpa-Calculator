export interface Course {
  DersAdı: string;
  Not: string;
  Kredi: string;
}


export interface Semester {
  courses: Course[]
}

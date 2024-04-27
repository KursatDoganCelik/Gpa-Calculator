import { Course } from '@/config/types';

export const calculateGPA = (courses: Course[]) => {
  let totalCredit = 0;
  let weightedCredits = 0;
  let gpa = 0;

  courses.forEach((course) => {
    const credit = parseInt(course.credit || '0');
    weightedCredits += credit * +course.note;
    totalCredit += credit;
  });
  gpa = +(weightedCredits / totalCredit).toFixed(2);
  return gpa;
};

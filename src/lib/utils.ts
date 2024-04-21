import { Course } from '@/config/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateGPA = (courses: Course[]) => {
  let totalCredit = 0;
  let weightedCredits = 0;

  courses.forEach((course) => {
    const credit = parseInt(course.credit || '0');
    weightedCredits += credit * +course.note;
    totalCredit += credit;
  });

  return weightedCredits / totalCredit;
};

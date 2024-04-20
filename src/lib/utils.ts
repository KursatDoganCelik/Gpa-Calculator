import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateGPA = (courses: any[]) => {
  let totalCredit = 0;
  let weightedCredits = 0;

  courses.forEach((course) => {
    const credit = parseInt(course.Kredi || '0');
    weightedCredits += credit * +course.Not;
    totalCredit += credit;

    console.log('credit', credit, 'weightedCredits', weightedCredits, 'totalCredit', totalCredit)
  });

  return weightedCredits / totalCredit;
};
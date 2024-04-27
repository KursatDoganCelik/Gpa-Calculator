import type { Course, Semester, SemesterInfo } from '@/config/types';
import { calculateGPA } from '@/lib/utils';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

export const SemesterContext = createContext({
  semesters: [{ courses: [{ name: '', note: '', credit: '' }] }],
  addSemester: () => {},
  removeSemester: () => {},
  addCourse: (semesterIndex: number) => {},
  removeCourse: (courseIndex: number, semesterIndex: number) => {},
  handleCourseChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    field: keyof Course,
    semesterIndex: number,
    courseIndex: number
  ) => {},
  semesterCreditAndGpa: (semesterIndex: number) => {
    return { credit: 0, gpa: 0 };
  },
  totalCreditAndGpa: () => {
    return { totalCredit: 0, totalGpa: 0 };
  },
});

const SemesterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [semesters, setSemesters] = useState<Semester[]>([{ courses: [{ name: '', note: '', credit: '' }] }]);

  const addSemester = () => {
    const newSemester = { courses: [{ name: '', note: '', credit: '' }] };
    setSemesters((prev) => [...prev, newSemester]);
  };

  const removeSemester = () => {
    setSemesters((prev) => prev.slice(0, -1));
  };

  const addCourse = (semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push({ name: '', note: '', credit: '' });
    setSemesters(updatedSemesters);
  };

  const removeCourse = (courseIndex: number, semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses = updatedSemesters[semesterIndex].courses.filter(
      (_, index) => index !== courseIndex
    );
    setSemesters(updatedSemesters);
  };

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    field: keyof Course,
    semesterIndex: number,
    courseIndex: number
  ) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex][field] = e.target.value;
    setSemesters(updatedSemesters);
  };

  const semesterCreditAndGpa = (semesterIndex: number) => {
    let credit = 0;
    let gpa = 0;

    const isSemesterFull = semesters[semesterIndex].courses.every((course: any) => {
      return Object.values(course).every((value) => (value as string).trim() !== '');
    });

    if (isSemesterFull) {
      credit = semesters[semesterIndex].courses.reduce((acc: any, course: any) => acc + Number(course.credit), 0);
      gpa = calculateGPA(semesters[semesterIndex].courses);
    }
    return { credit, gpa };
  };

  const totalCreditAndGpa = () => {
    let totalCredit = 0;
    let totalGpa = 0;

    const isAllFull = semesters.every((semester) => {
      return semester.courses.every((course) => {
        return Object.values(course).every((value) => (value as string).trim() !== '');
      });
    });

    if (isAllFull) {
      totalCredit = semesters.reduce((acc, semester) => {
        return acc + semester.courses.reduce((acc, course) => acc + Number(course.credit), 0);
      }, 0);
      totalGpa = calculateGPA(
        semesters
          .flat()
          .map((semester) => semester.courses)
          .flat()
      );
    }
    return { totalCredit, totalGpa };
  };

  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem('semesters');
      if (localStorageItem) {
        if (localStorageItem === JSON.stringify([{ courses: [{ name: '', note: '', credit: '' }] }])) {
          return;
        }
        setSemesters(JSON.parse(localStorageItem));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('semesters', JSON.stringify(semesters));
    } catch (error) {
      console.error(error);
    }
  }, [JSON.stringify(semesters)]);

  return (
    <SemesterContext.Provider
      value={{
        semesters,
        addSemester,
        removeSemester,
        addCourse,
        removeCourse,
        handleCourseChange,
        semesterCreditAndGpa,
        totalCreditAndGpa,
      }}
    >
      {children}
    </SemesterContext.Provider>
  );
};

export default SemesterProvider;

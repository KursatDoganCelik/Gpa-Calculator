import type { Course, Semester } from '@/config/types';
import { calculateGPA } from '@/lib/utils';
import React, { PropsWithChildren, createContext, useState } from 'react';

export const SemesterContext = createContext({
  semesters: [{ courses: [{ name: '', note: '', credit: '' }] }],
  addCourse: (semesterIndex: number) => {},
  removeCourse: (courseIndex: number, semesterIndex: number) => {},
  addSemester: () => {},
  removeSemester: (semesterIndex: number) => {},
  handleCourseChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    field: keyof Course,
    semesterIndex: number,
    courseIndex: number
  ) => {},
  handleConfirmation: (semesterIndex: number) => {},
  totalCredit: 0,
  gpa: undefined as number | undefined,
});

const SemesterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [semesters, setSemesters] = useState<Semester[]>([{ courses: [{ name: '', note: '', credit: '' }] }]);
  const [gpa, setGpa] = useState<number | undefined>();

  const addSemester = () => {
    const newSemester = { courses: [{ name: '', note: '', credit: '' }] };
    setSemesters((prev) => [...prev, newSemester]);
  };

  console.log('hook semesters', semesters);

  const addCourse = (semesterIndex: number) => {
    const newCourse = { name: '', note: '', credit: '' };
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push(newCourse);
    setSemesters(updatedSemesters);
  };

  const removeSemester = (semesterIndex: number) => {
    console.log('sildim somestr');
    const updatedSemesters = [...semesters];
    updatedSemesters.splice(semesterIndex!, 1);
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

  const removeCourse = (courseIndex: number, semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses = updatedSemesters[semesterIndex].courses.filter(
      (_, index) => index !== courseIndex
    );
    setSemesters(updatedSemesters);
  };

  /*   const totalCredit = semesters.reduce((acc, semester) => {
    return acc + semester.courses.reduce((acc, course) => acc + Number(course.credit), 0);
  }, 0); */

  const totalCredit = 0;

  const handleConfirmation = (semesterIndex: number) => {
    const isEmpty = semesters[semesterIndex!].courses.length === 0;
    const isAnyEmpty = semesters[semesterIndex!].courses.some((course) => {
      return Object.values(course).some((value) => (value as string).trim() === '');
    });

    isEmpty
      ? alert('Lütfen ders bilgisi giriniz.')
      : isAnyEmpty
        ? alert('Tüm derslerin bilgilerini doldurun.')
        : setGpa(() => calculateGPA(semesters[semesterIndex!].courses));
  };
  return (
    <SemesterContext.Provider
      value={{
        semesters,
        addCourse,
        removeCourse,
        removeSemester,
        addSemester,
        handleCourseChange,
        handleConfirmation,
        totalCredit,
        gpa,
      }}
    >
      {children}
    </SemesterContext.Provider>
  );
};

export default SemesterProvider;

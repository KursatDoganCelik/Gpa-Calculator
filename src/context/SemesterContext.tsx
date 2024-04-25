import type { Course, Semester, SemesterInfo } from '@/config/types';
import { calculateGPA } from '@/constants/CalculateGpa';
import React, { PropsWithChildren, createContext, useState } from 'react';

export const SemesterContext = createContext({
  semesters: [{ courses: [{ name: '', note: '4', credit: '' }] }],
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
  semesterInfos: [{ credit: 'Kredi', gpa: 'Dno' }] as SemesterInfo[],
  totalCreditAndGpa: { credit: 'Kredi', gpa: 'Gno' } as SemesterInfo,
});

const SemesterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [semesters, setSemesters] = useState<Semester[]>([{ courses: [{ name: '', note: '4', credit: '' }] }]);
  const [semesterInfos, setSemesterInfos] = useState<SemesterInfo[]>([{ credit: 'Kredi', gpa: 'Dno' }]);
  const [totalCreditAndGpa, setTotalCreditandGpa] = useState<SemesterInfo>({ credit: 'Kredi', gpa: 'Gno' });

  const addSemester = () => {
    const newSemester = { courses: [{ name: '', note: '4', credit: '' }] };
    const newSemesterInfo = { credit: 'Kredi', gpa: 'Dno' };

    setSemesters((prev) => [...prev, newSemester]);
    setSemesterInfos((prev) => [...prev, newSemesterInfo]);
  };

  const removeSemester = () => {
    setSemesters((prev) => prev.slice(0, -1));
    setSemesterInfos((prev) => prev.slice(0, -1));
  };

  const addCourse = (semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push({ name: '', note: '4', credit: '' });
    setSemesters(updatedSemesters);
  };

  const removeCourse = (courseIndex: number, semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses = updatedSemesters[semesterIndex].courses.filter(
      (_, index) => index !== courseIndex
    );
    setSemesters(updatedSemesters);
    updateSemesterInfo(semesterIndex);
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
    updateSemesterInfo(semesterIndex);
  };

  // calculate GPA and Credit for given semester
  const updateSemesterInfo = (semesterIndex: number) => {
    //check this semester is full
    const isSemesterFull = semesters[semesterIndex].courses.every((course) => {
      return Object.values(course).every((value) => (value as string).trim() !== '');
    });

    //check all semester is full
    const isAllFull = semesters.every((semester) => {
      return semester.courses.every((course) => {
        return Object.values(course).every((value) => (value as string).trim() !== '');
      });
    });

    if (isSemesterFull) {
      const updatedSemesterInfos = [...semesterInfos];
      const credit = semesters[semesterIndex].courses.reduce((acc, course) => acc + Number(course.credit), 0);
      const gpa = calculateGPA(semesters[semesterIndex].courses);

      updatedSemesterInfos[semesterIndex] = { credit: credit, gpa: gpa };
      setSemesterInfos(updatedSemesterInfos);
      if (isAllFull) {
        const totalCredit = updatedSemesterInfos.reduce((acc, semester) => acc + Number(semester.credit), 0);
        const totalGpa = calculateGPA(
          semesters
            .flat()
            .map((semester) => semester.courses)
            .flat()
        );
        setTotalCreditandGpa({ credit: totalCredit, gpa: totalGpa });
      }
    }
  };

  return (
    <SemesterContext.Provider
      value={{
        semesters,
        addSemester,
        removeSemester,
        addCourse,
        removeCourse,
        handleCourseChange,
        semesterInfos,
        totalCreditAndGpa,
      }}
    >
      {children}
    </SemesterContext.Provider>
  );
};

export default SemesterProvider;

import { Course, Semester } from "@/config/types";
import { calculateGPA } from "@/lib/utils";
import { useState } from "react";


export const useSemesters = () => {
  const [semesters, setSemesters] = useState<Semester[]>([{ courses: [{ name: '', note: '', credit: '' }] }]);
  const [gpa, setGpa] = useState<number | undefined>();

  const handleAddSemester = () => {
    const newSemester = { courses: [{ name: '', note: '', credit: '' }] };
    setSemesters((prev) => [...prev, newSemester]);
  };

  const addCourse = (semesterIndex: number) => {
    const newCourse = { name: '', note: '', credit: '' };
    setSemesters((prev) => {
      prev[semesterIndex].courses.push(newCourse);
      return [...prev];
    });
    setGpa(undefined);
  };



  const removeSemester = (semesterIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters.splice(semesterIndex!, 1);
    setSemesters(updatedSemesters);
  };

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    field: keyof Course,
    semesterIndex: number,
    courseIndex: number,
  ) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex][field] = e.target.value;
    setSemesters(updatedSemesters);
  };

  // const removeCourse = (courseIndex: number, semesterIndex: number) => {
  //   const updatedSemesters = [...semesters];
  //   updatedSemesters[semesterIndex].courses = updatedSemesters[semesterIndex].courses.filter(
  //     (_, index) => index !== courseIndex
  //   );
  //   setSemesters(updatedSemesters);
  // };

  // const totalCredit = semesters.reduce((acc, semester) => {
  //   return acc + semester.courses.reduce((acc, course) => acc + Number(course.credit), 0);
  // }, 0);

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
  return { handleAddSemester, semesters, addCourse, removeSemester, gpa, setGpa, totalCredit, handleConfirmation, handleCourseChange }
}
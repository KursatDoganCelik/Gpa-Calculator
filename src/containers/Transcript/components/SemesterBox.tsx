'use client';

import CourseBox from './CourseBox';
import { BsPlusCircle } from 'react-icons/bs';
import { useContext, useMemo } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import { calculateGPA } from '@/lib/utils';

export default function SemesterBox({ semesterIndex }: { semesterIndex: number }) {
  const { semesters, addCourse } = useContext(SemesterContext);

  const isAnyEmpty = semesters[semesterIndex].courses.some((course) => {
    return Object.values(course).some((value) => (value as string).trim() === '');
  });

  const thisSemesterGpa = useMemo(
    () => (!isAnyEmpty ? calculateGPA(semesters[semesterIndex].courses) : undefined),
    [JSON.stringify(semesters[semesterIndex].courses), isAnyEmpty]
  );

  return (
    <div className="min-h-[300px] bg-white p-1 dark:bg-black">
      <div className="flex items-center justify-between pl-2">
        <h1 className="py-2 text-xl font-semibold">{semesterIndex! + 1}. Yarıyıl</h1>
        <button
          className="flex size-8 items-center justify-center hover:text-green-500"
          onClick={() => addCourse(semesterIndex)}
        >
          <BsPlusCircle size={16} />
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-900 ">
            <th className="py-2 pl-2 text-left">Ders Adı</th>
            <th className="py-2 text-center">Not</th>
            <th className="py-2 text-center">Kredi</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {semesters[semesterIndex]?.courses.map((course, courseIndex) => (
            <CourseBox key={courseIndex} semesterIndex={semesterIndex} courseIndex={courseIndex} course={course} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from 'react';
import CourseBox from './CourseBox';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { Course } from '@/config/types';

export default function SemesterBox(props: { index: number }) {
  const [courses, setCourses] = useState<Course[]>([{ name: '', note: 'AA', credit: '' }]);

  function addCourse() {
    courses.length < 20 && setCourses([...courses, { name: '', note: 'AA', credit: '' }]);
  }

  function changeCourse(index: number, key: string, value: string) {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [key]: value };
    setCourses(newCourses);
  }

  return (
    <form className="ring-2">
      <div className="flex items-center justify-between">
        <BsDashCircle className="m-3 size-6 cursor-pointer opacity-40" />
        <div className="text-lg font-semibold">{props.index}. Yarıyıl</div>
        <BsPlusCircle onClick={addCourse} className="m-3 size-6 cursor-pointer opacity-40" />
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="pl-2 text-left">Ders Adı</th>
            <th className="text-center">Not</th>
            <th className="text-center">Kredi</th>
          </tr>
        </thead>

        <tbody className="w-full">
          {courses.map((course, index) => (
            <CourseBox key={index} course={course} onChange={(key, value) => changeCourse(index, key, value)} />
          ))}
        </tbody>
      </table>
    </form>
  );
}

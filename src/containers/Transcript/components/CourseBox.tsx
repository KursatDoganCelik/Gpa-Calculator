import React from 'react';
import { Note1 } from '@/constants/Note1';
import { Course } from '@/config/types';

interface CourseFormProps {
  course: Course;
  onChange: (key: string, value: string) => void;
}

export default function CourseBox({ course, onChange }: CourseFormProps) {
  const style =
    'w-full border-0 p-1.5 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600';

  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Course Name"
          value={course.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={style}
        />
      </td>

      <td className="w-20">
        <select
          name="note"
          autoComplete="off"
          value={course.note}
          onChange={(e) => onChange('note', e.target.value)}
          className={`rm-arrow text-center ${style}`}
        >
          {Note1.map((note) => (
            <option key={note}>{note}</option>
          ))}
        </select>
      </td>

      <td className="w-20">
        <input
          type="number"
          name="credit"
          autoComplete="off"
          placeholder="Credit"
          value={course.credit}
          onChange={(e) => onChange('credit', e.target.value)}
          className={`rm-arrow text-center ${style}`}
        />
      </td>
    </tr>
  );
}

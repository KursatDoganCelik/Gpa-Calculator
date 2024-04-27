import { NoteTypes } from '@/constants/NoteTypes';
import { BsDashCircle } from 'react-icons/bs';
import { Course } from '@/config/types';
import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';

export default function CourseBox({
  semesterIndex,
  courseIndex,
  course,
}: {
  semesterIndex: number;
  courseIndex: number;
  course: Course;
}) {
  const { semesters, handleCourseChange, removeCourse } = useContext(SemesterContext);
  const style = 'bg-transparent placeholder:text-gray-400';

  return (
    <tr className="even:bg-gray-100 dark:even:bg-gray-900">
      <td className="px-2">
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Ders Adı"
          value={course.name}
          onChange={(e) => handleCourseChange(e, 'name', semesterIndex, courseIndex)}
          className={`w-full pl-2 ${!course.name && 'ring-1 ring-red-500'} ${style}`}
        />
      </td>

      <td className="px-2">
        <select
          name="note"
          autoComplete="off"
          value={course.note}
          onChange={(e) => handleCourseChange(e, 'note', semesterIndex, courseIndex)}
          className={`rm-arrow w-12 text-center dark:bg-black dark:text-white ${!course.note && 'ring-1 ring-red-500'} ${style}`}
        >
          <option value="" hidden>
            Not
          </option>
          {Object.entries(NoteTypes.AA).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </td>

      <td className="px-2">
        <input
          type="number"
          name="credit"
          autoComplete="off"
          placeholder="Kredi"
          min={1}
          value={course.credit}
          onChange={(e) => handleCourseChange(e, 'credit', semesterIndex, courseIndex)}
          className={`rm-arrow w-16 text-center ${!course.credit && 'ring-1 ring-red-500'} ${style}`}
        />
      </td>

      <td>
        <button
          onClick={() => {
            semesters[semesterIndex]?.courses.length > 1 && removeCourse(courseIndex, semesterIndex);
          }}
          className="flex size-8 items-center justify-center hover:text-red-500"
        >
          <BsDashCircle size={16} />
        </button>
      </td>
    </tr>
  );
}

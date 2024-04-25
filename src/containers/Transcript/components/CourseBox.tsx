import { Note1 } from '@/constants/Note1';
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
  const { handleCourseChange, removeCourse } = useContext(SemesterContext);
  const style = 'p-2 bg-transparent ring-gray-400 placeholder:text-gray-400 focus:ring-1';

  return (
    <tr className="even:bg-gray-100 dark:even:bg-gray-900">
      <td>
        <input
          type="text"
          autoComplete="off"
          placeholder="Ders Adı"
          value={course.name}
          onChange={(e) => handleCourseChange(e, 'name', semesterIndex, courseIndex)}
          className={`w-full ${style}`}
        />
      </td>
      <td>
        <select
          autoComplete="off"
          onChange={(e) => handleCourseChange(e, 'note', semesterIndex, courseIndex)}
          className={`rm-arrow w-16 text-center ${style}`}
        >
          <option value="" hidden>
            Not
          </option>
          {Object.entries(Note1).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          autoComplete="off"
          placeholder="Kredi"
          min={1}
          value={course.credit}
          onChange={(e) => handleCourseChange(e, 'credit', semesterIndex, courseIndex)}
          className={`rm-arrow w-16 text-center ${style}`}
        />
      </td>
      <td>
        <button
          onClick={() => removeCourse(courseIndex, semesterIndex)}
          className="flex size-8 items-center justify-center hover:text-red-500"
        >
          <BsDashCircle size={16} />
        </button>
      </td>
    </tr>
  );
}

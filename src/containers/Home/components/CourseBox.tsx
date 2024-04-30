import { NoteTypes } from '@/constants/NoteTypes';
import { BsDashCircle } from 'react-icons/bs';
import { Course } from '@/config/types';
import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import { Button } from '@/components/ui/button';

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
  const style = 'bg-transparent rounded-[6px] placeholder:text-gray-400';

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
          className={`w-full pl-2 ${!course.name && 'placeholder:text-red-700'} ${style}`}
        />
      </td>

      <td className="px-2">
        <select
          name="note"
          autoComplete="off"
          value={course.note}
          onChange={(e) => handleCourseChange(e, 'note', semesterIndex, courseIndex)}
          className={`rm-arrow w-12 text-center text-red-700  ${course.note && 'text-black dark:text-white'} ${style}`}
        >
          <option value="" hidden>
            Not
          </option>
          {Object.entries(NoteTypes.AA).map(([key, value]) => (
            <option key={key} value={value} className="text-black dark:bg-black dark:text-white">
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
          className={`rm-arrow w-16 text-center ${!course.credit && 'placeholder:text-red-700'} ${style}`}
        />
      </td>

      <td>
        <Button
          onClick={() => {
            semesters[semesterIndex]?.courses.length > 1 && removeCourse(courseIndex, semesterIndex);
          }}
          variant={'ghost'}
          className="m-3 flex h-fit items-center justify-center p-0 hover:text-red-500"
        >
          <BsDashCircle size={16} />
        </Button>
      </td>
    </tr>
  );
}

import { Note1 } from '@/constants/Note1';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Course, Semester } from '@/config/types';
import { useSemesters } from '@/hooks/useSemesters';

export default function CourseBox({
  semesterIndex,
  courseIndex,
  course,
}: {
  semesterIndex: number;
  courseIndex: number;
  course: Course;
}) {
  const { handleCourseChange } = useSemesters();
  const style =
    'border-0 p-2 bg-transparent shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600';

  return (
    <tr className="even:bg-[#3b3b3b]">
      <td className="w-full">
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
      {/* <td>
        <Button
          onClick={() => removeCourse(courseIndex, semesterIndex)}
          className="rounded-none border-none bg-transparent hover:bg-transparent hover:text-red-500"
          variant={'outline'}
          size={'icon'}
        >
          <Trash size={16} />
        </Button>
      </td> */}
    </tr>
  );
}

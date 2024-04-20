import { Note1 } from '@/constants/Note1';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Course, Semester } from '@/config/types';

export default function CourseBox({
  semesterIndex,
  courseIndex,
  course,
  semesters,
  setSemesters,
}: {
  semesterIndex: number;
  courseIndex: number;
  course: Course;
  semesters: Semester[];
  setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>;
}) {
  const style = 'border-0 p-2 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600';

  const handleCourseChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    field: keyof Course
  ) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses[courseIndex][field] = e.target.value;
    setSemesters(updatedSemesters);
  };

  const removeCourse = (courseIndex: number) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses = updatedSemesters[semesterIndex].courses.filter(
      (_, index) => index !== courseIndex
    );
    setSemesters(updatedSemesters);
  };

  return (
    <tr>
      <td className="w-full">
        <input
          type="text"
          autoComplete="off"
          placeholder="Ders Adı"
          value={course.DersAdı}
          onChange={(e) => handleCourseChange(e, 'DersAdı')}
          className={`w-full ${style}`}
        />
      </td>

      <td>
        <select
          autoComplete="off"
          onChange={(e) => handleCourseChange(e, 'Not')}
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
          value={course.Kredi}
          onChange={(e) => handleCourseChange(e, 'Kredi')}
          className={`rm-arrow w-16 text-center ${style}`}
        />
      </td>
      <td>
        <Button
          onClick={() => removeCourse(courseIndex)}
          className="rounded-none border-none dark:bg-[#121212]"
          variant={'outline'}
          size={'icon'}
        >
          <Trash size={16} />
        </Button>
      </td>
    </tr>
  );
}

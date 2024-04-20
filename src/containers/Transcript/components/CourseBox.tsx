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
  const style =
    'w-full border-0 p-2 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-600';

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
      <td className="w-full pb-2">
        <input
          type="text"
          name="name"
          autoComplete="off"
          placeholder="Ders Adı"
          value={course.DersAdı}
          onChange={(e) => handleCourseChange(e, 'DersAdı')}
          className={`ml-1.5 ${style}`}
        />
      </td>

      <td className="pb-2">
        <select
          name="note"
          autoComplete="off"
          onChange={(e) => handleCourseChange(e, 'Not')}
          className={`rm-arrow ml-1.5 w-20 text-center ${style}`}
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

      <td className="pb-2">
        <input
          type="number"
          name="credit"
          autoComplete="off"
          placeholder="Kredi"
          min={1}
          value={course.Kredi}
          onChange={(e) => handleCourseChange(e, 'Kredi')}
          className={`rm-arrow w-20 text-center ${style}`}
        />
      </td>
      <td className="pb-2">
        <Button onClick={() => removeCourse(courseIndex)} variant={'destructive'} size={'icon'} className="mx-1.5">
          <Trash size={16} />
        </Button>
      </td>
    </tr>
  );
}

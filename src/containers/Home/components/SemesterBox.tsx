import CourseBox from './CourseBox';
import { BsPlusCircle } from 'react-icons/bs';
import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import { maxCourseLength } from '@/config/boxLength';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function SemesterBox({ semesterIndex }: { semesterIndex: number }) {
  const { semesters, addCourse } = useContext(SemesterContext);

  return (
    <div className="min-h-[300px] bg-white p-1 dark:bg-black">
      <div className="flex items-center justify-between pl-2">
        <p className="py-2 text-xl font-semibold">{semesterIndex! + 1}. Yarıyıl</p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="m-1.5 flex h-fit cursor-pointer items-center justify-center p-1.5 hover:text-green-500"
              variant={'ghost'}
              disabled={semesters[semesterIndex]?.courses.length >= maxCourseLength}
              onClick={() => {
                addCourse(semesterIndex);
              }}
            >
              <BsPlusCircle size={16} />
            </Button>
          </TooltipTrigger>
          {semesters[semesterIndex]?.courses.length >= maxCourseLength && (
            <TooltipContent>
              <p>Yarıyılda en fazla {maxCourseLength} ders eklenebilir</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-900 ">
            <th className="px-4 py-2 text-left">Ders Adı</th>
            <th className="w-12 px-4 py-2 text-center">Not</th>
            <th className="w-16 px-4 py-2 text-center">Kredi</th>
            <th className="w-8"></th>
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

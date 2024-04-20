import CourseBox from './CourseBox';
import { BsPlusCircle } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { maxCourseLength } from '@/config';
import { useSemesters } from '@/hooks/useSemesters';

export default function SemesterBox({ semesterIndex }: { semesterIndex: number }) {
  const { semesters, removeSemester, addCourse, totalCredit, handleConfirmation, gpa } = useSemesters();

  const isDisabled = semesters[semesterIndex]?.courses.length >= maxCourseLength;

  return (
    <div className="flex h-fit min-h-[300px] flex-col justify-between rounded-sm bg-white py-2 dark:bg-black">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <Button onClick={() => removeSemester(semesterIndex)} variant={'destructive'} size={'sm'}>
            <Trash size={16} />
          </Button>
          <h1 className="text-xl font-semibold leading-relaxed">{semesterIndex! + 1}. Yarıyıl</h1>
          <Button onClick={() => addCourse(semesterIndex)} disabled={isDisabled} variant={'secondary'} size={'sm'}>
            <BsPlusCircle size={16} />
          </Button>
        </div>
        <table className="h-fit w-full">
          <thead>
            <tr className="bg-[#3b3b3b]/60">
              <th className="py-2 pl-2  text-left">Ders Adı</th>
              <th className="py-2  text-center">Not</th>
              <th className="py-2  text-center">Kredi</th>
              <th />
            </tr>
          </thead>

          <tbody className="w-full">
            {semesters[semesterIndex]?.courses.map((course, courseIndex) => (
              <CourseBox key={courseIndex} semesterIndex={semesterIndex!} courseIndex={courseIndex} course={course} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className={`flex w-full items-center self-end ${gpa ? 'justify-between' : 'justify-end'}`}>
        {gpa && <p>{`${semesterIndex! + 1}. Yarıyıl Genel Not Ortalamanız: ${gpa.toFixed(2)}`}</p>}
        <div className="flex items-center gap-5">
          <p>Toplam Kredi: {totalCredit}</p>
          <Button onClick={() => handleConfirmation(semesterIndex)} variant={'outline'}>
            Onayla
          </Button>
        </div>
      </div>
    </div>
  );
}

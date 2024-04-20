'use client';
import CourseBox from './CourseBox';
import { BsPlusCircle } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { calculateGPA } from '@/lib/utils';
import { useState } from 'react';
import { Semester } from '@/config/types';

export default function SemesterBox({
  semesterIndex,
  semesters,
  setSemesters,
}: {
  semesterIndex: number;
  semesters: Semester[];
  setSemesters: React.Dispatch<React.SetStateAction<Semester[]>>;
}) {
  const [gpa, setGpa] = useState<number | undefined>();
  const maxCourseLength = 12;
  const isDisabled = semesters[semesterIndex].courses.length >= maxCourseLength;

  const addCourse = () => {
    const newCourse = { DersAdı: '', Not: '', Kredi: '' };
    const updatedSemesters = [...semesters];
    updatedSemesters[semesterIndex].courses.push(newCourse);
    setSemesters(updatedSemesters);
    setGpa(undefined);
  };

  const removeSemester = () => {
    const updatedSemesters = [...semesters];
    updatedSemesters.splice(semesterIndex, 1);
    setSemesters(updatedSemesters);
  };

  let totalCredit = 0;

  semesters[semesterIndex].courses.forEach((course) => {
    totalCredit += parseInt(course.Kredi || '0');
  });

  const handleConfirmation = () => {
    const isEmpty = semesters[semesterIndex].courses.length === 0;
    const isAnyEmpty = semesters[semesterIndex].courses.some((course) => {
      return Object.values(course).some((value) => (value as string).trim() === '');
    });

    isEmpty && alert('Lütfen ders bilgisi giriniz.');
    isAnyEmpty && alert('Tüm derslerin bilgilerini doldurun.');
    setGpa(() => calculateGPA(semesters[semesterIndex].courses));
  };

  return (
    <div className="h-auto ring-2">
      <div className="flex items-center justify-between p-2">
        <Button onClick={removeSemester} variant={'destructive'} size={'sm'}>
          <Trash size={16} className="mr-2" />
          <p>Yarıyıl Sil</p>
        </Button>
        <h1 className="text-xl font-semibold leading-relaxed">{semesterIndex + 1}. Yarıyıl</h1>
        <Button onClick={addCourse} disabled={isDisabled} variant={'secondary'} size={'sm'}>
          <BsPlusCircle className="mr-2" size={16} />
          <p>Ders Ekle</p>
        </Button>
      </div>

      <table className="h-fit w-full">
        <thead>
          <tr>
            <th className="pb-2 pl-2 pt-4 text-left">Ders Adı</th>
            <th className="pb-2 pt-4 text-center">Not</th>
            <th className="pb-2 pt-4 text-center">Kredi</th>
            <th />
          </tr>
        </thead>

        <tbody className="w-full">
          {semesters[semesterIndex].courses.map((course, courseIndex) => (
            <CourseBox
              key={courseIndex}
              semesterIndex={semesterIndex}
              courseIndex={courseIndex}
              course={course}
              semesters={semesters}
              setSemesters={setSemesters}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="p-2">
              <div className={`flex items-center ${gpa ? 'justify-between' : 'justify-end'}`}>
                {gpa && <p>{`${semesterIndex + 1}. Yarıyıl Genel Not Ortalamanız: ${gpa.toFixed(2)}`}</p>}
                <div className="flex items-center gap-5">
                  <p>Toplam Kredi: {totalCredit}</p>
                  <Button onClick={handleConfirmation} variant={'outline'}>
                    Onayla
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

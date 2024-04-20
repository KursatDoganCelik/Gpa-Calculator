'use client';

import { useEffect, useState } from 'react';
import SemesterBox from './components/SemesterBox';
import { Course, Semester } from '@/config/types';

export default function Transcript() {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  const maxSemesterLength = 12;

  const handleAddSemester = () => {
    const newSemester = { courses: [] };
    setSemesters([...semesters, newSemester]);
  };

  useEffect(() => {
    console.log(semesters);
  }, [semesters]);
  return (
    <div className="m-10 grid grid-cols-1 gap-10 md:grid-cols-2 min-[1920px]:grid-cols-3">
      {semesters.map((semester, index) => (
        <SemesterBox key={index} semesterIndex={index} semesters={semesters} setSemesters={setSemesters} />
      ))}

      {semesters.length < maxSemesterLength && (
        <button className="ring-1" onClick={handleAddSemester}>
          Yarıyıl Ekle
        </button>
      )}
    </div>
  );
}

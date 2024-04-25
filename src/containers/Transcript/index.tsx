'use client';

import { maxSemesterLength } from '@/config';
import { Button } from '@/components/ui/button';
import SemesterBox from './components/SemesterBox';
import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import Sidebar from '@/components/Sidebar';

export default function Transcript() {
  const { semesters } = useContext(SemesterContext);

  return (
    <main className="flex ">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col gap-3 bg-gray-100 px-2 py-3 dark:bg-gray-900 sm:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 min-[1920px]:grid-cols-3">
          {semesters.map((_, index) => (
            <SemesterBox key={index} semesterIndex={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

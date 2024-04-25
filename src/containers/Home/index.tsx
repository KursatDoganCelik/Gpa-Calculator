'use client';
import { SemesterContext } from '@/context/SemesterContext';
import SemesterBox from './components/SemesterBox';
import { useContext } from 'react';
import Sidebar from './components/Sidebar';

export default function Transcript() {
  const { semesters } = useContext(SemesterContext);

  return (
    <main className="flex">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col gap-3 bg-gray-100 px-8 py-4 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {semesters.map((_, index) => (
            <SemesterBox key={index} semesterIndex={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

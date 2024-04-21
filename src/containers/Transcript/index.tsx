'use client';

import { maxSemesterLength } from '@/config';
import { Button } from '@/components/ui/button';
import SemesterBox from './components/SemesterBox';
import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';

export default function Transcript() {
  const { semesters, addSemester } = useContext(SemesterContext);

  console.log('index semesters: ', semesters);

  return (
    <main className="flex flex-col gap-3 bg-gray-100 px-2 py-3 dark:bg-gray-900 sm:px-10">
      <div className="grid grid-cols-2 gap-2 font-semibold text-white sm:gap-10">
        <div className="sm:text-md flex h-10 items-center justify-center rounded-sm bg-[#010917] text-xs md:text-lg">
          Mevut GNO: 4.00
        </div>
        <div className="sm:text-md flex h-10 items-center justify-center rounded-sm bg-[#010917] text-xs md:text-lg">
          Hesaplanan GNO: 3.50
        </div>
      </div>
      <div className="grid select-none grid-cols-1 gap-10 md:grid-cols-2 min-[1920px]:grid-cols-3">
        {semesters.map((_, index) => (
          <SemesterBox key={index} semesterIndex={index} />
        ))}

        <div
          className={`flex items-center justify-center gap-5 self-center ${semesters.length % 2 !== 0 ? 'flex-col max-md:flex-row' : 'flex-row'}`}
        >
          {semesters.length < maxSemesterLength && (
            <Button variant="outline" className="w-40" size="lg" onClick={addSemester}>
              Yarıyıl Ekle
            </Button>
          )}
          <Button variant="outline" className="w-40" size="lg">
            GNO Hesapla
          </Button>
        </div>
      </div>
    </main>
  );
}

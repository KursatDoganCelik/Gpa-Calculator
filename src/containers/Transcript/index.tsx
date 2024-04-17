'use client';

import { useState } from 'react';
import SemesterBox from './components/SemesterBox';

export default function Transcript() {
  const [semesterKeys, setSemesterKeys] = useState<number[]>([1]);
  const maxSemesterLength = 12;

  function handleAddSemesterClick() {
    semesterKeys.length < maxSemesterLength && setSemesterKeys((prevKeys) => [...prevKeys, prevKeys.length + 1]);
  }
  return (
    <div className="m-10 grid grid-cols-1 gap-10 md:grid-cols-2 min-[1920px]:grid-cols-3">
      {semesterKeys.map((key) => (
        <SemesterBox key={key} index={key} />
      ))}

      {semesterKeys.length < maxSemesterLength && (
        <button className="ring-1" onClick={handleAddSemesterClick}>
          Yarıyıl Ekle
        </button>
      )}
    </div>
  );
}

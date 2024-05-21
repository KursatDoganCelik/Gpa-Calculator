import { useContext, useState, useEffect } from 'react';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { SemesterContext } from '@/context/SemesterContext';
import { maxSemesterLength } from '@/config/boxLength';
import { Button } from '@/components/ui/button';
import { NoteTypes } from '@/constants/NoteTypes';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'react-toastify';

const SemesterManager = () => {
  const { semesters, addSemester, removeSemester } = useContext(SemesterContext);

  return (
    <div className="flex items-center justify-center gap-2 pb-2 text-xl font-semibold">
      <p>Yarıyıl</p>
      <div className="flex cursor-default gap-2 rounded-full bg-gray-200 p-2 dark:bg-gray-800">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex h-fit cursor-pointer items-center justify-center px-1 py-0 hover:text-green-500"
              variant={'ghost'}
              disabled={semesters.length >= maxSemesterLength}
              onClick={() => {
                addSemester();
              }}
            >
              <BsPlusCircle size={20} />
            </Button>
          </TooltipTrigger>
          {semesters.length >= maxSemesterLength && (
            <TooltipContent>
              <p>En fazla {maxSemesterLength} yarıyıl eklenebilir</p>
            </TooltipContent>
          )}
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="flex h-fit cursor-pointer items-center justify-center px-1 py-0 hover:text-red-500"
              variant={'ghost'}
              disabled={semesters.length <= 1}
              onClick={() => {
                removeSemester();
              }}
            >
              <BsDashCircle size={20} />
            </Button>
          </TooltipTrigger>
          {semesters.length <= 1 && (
            <TooltipContent>
              <p>En az 1 yarıyıl olmalı</p>
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );
};

let noteType: string = 'Aa';
const NoteType = ({ email }: { email: string | null | undefined }) => {
  const { handleNoteTypeChange } = useContext(SemesterContext);
  const [selectedNoteType, setSelectedNoteType] = useState('Aa');

  useEffect(() => {
    if (email) {
      fetch(`/api/getNoteType?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          noteType = data.noteType;
          setSelectedNoteType(data.noteType);
          handleNoteTypeChange({ target: { value: data.noteType } } as React.ChangeEvent<HTMLSelectElement>);
        });
    }
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newNoteType = e.target.value;
    setSelectedNoteType(newNoteType);
    handleNoteTypeChange(e);

    // set global variable for saveCourses function
    noteType = newNoteType;
  };

  const showNoteType = (noteType: string) => {
    switch (noteType) {
      case 'Aa':
        return 'AA BA BB';
      case 'Ax':
        return 'A+ A A-';
      case 'A1':
        return 'A1 A2 A3';
      case 'Ab':
        return 'AA AB BA';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 pb-2 ">
      <p className="text-base font-medium">Not Tipi</p>
      <select
        name="note"
        autoComplete="off"
        value={selectedNoteType}
        onChange={handleChange}
        className="rm-arrow w-[88px] rounded-md border border-gray-300 py-1 text-center dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {Object.keys(NoteTypes).map((noteType) => (
          <option key={noteType} value={noteType} className="">
            {showNoteType(noteType)}
          </option>
        ))}
      </select>
    </div>
  );
};

const SaveCourseButton = ({ email }: { email: string }) => {
  const { semesters, isAllSemesterFull } = useContext(SemesterContext);

  const saveCourses = async () => {
    const res = await fetch('/api/saveCourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, semesters, noteType }),
    });

    res?.ok ? toast.success(await res.text()) : toast.error(await res.text());
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="m-2 h-fit px-3 py-1 text-base font-semibold hover:bg-[#177013] hover:text-white"
          variant={'default'}
          disabled={!isAllSemesterFull}
          onClick={saveCourses}
        >
          Kaydet
        </Button>
      </TooltipTrigger>
      {!isAllSemesterFull && (
        <TooltipContent>
          <p>Boş ders bilgisi mevcut</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export { SemesterManager, NoteType, SaveCourseButton };

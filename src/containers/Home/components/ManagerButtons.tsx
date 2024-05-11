import { useContext } from 'react';
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { SemesterContext } from '@/context/SemesterContext';
import { maxSemesterLength } from '@/config/boxLength';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

const SaveCourseButton = ({ email }: { email: string }) => {
  const { semesters, isAllSemesterFull } = useContext(SemesterContext);

  const saveCourses = () => {
    fetch('/api/saveCourses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, semesters }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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

export { SemesterManager, SaveCourseButton };

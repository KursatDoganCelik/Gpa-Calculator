'use client';
import { useContext, useState } from 'react';
import { BsChevronLeft, BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { SemesterContext } from '@/context/SemesterContext';
import { maxSemesterLength } from '@/config/boxLength';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Sidebar() {
  const { semesters, addSemester, removeSemester, semesterCreditAndGpa, totalCreditAndGpa } =
    useContext(SemesterContext);

  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [sidebarRender, setSidebarRender] = useState(true);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
    toggleCollapse
      ? setTimeout(() => setSidebarRender((prev) => !prev), 420)
      : setTimeout(() => setSidebarRender((prev) => !prev), 250);
  };

  return (
    <aside
      className={`sticky top-0 flex h-[calc(100vh-56px)] flex-col justify-between bg-white dark:bg-black ${toggleCollapse ? 'w-0' : 'w-72'}`}
      style={{ transition: 'width 500ms cubic-bezier(.8,.2,.8,.7) 0s ' }}
    >
      {!sidebarRender && (
        <div className="p-2">
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
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-center dark:bg-gray-900 ">
                <th className="py-2 pl-2 text-left">Yarıyıl</th>
                <th className="py-2">GNO</th>
                <th className="py-2">Kredi</th>
              </tr>
            </thead>

            <tbody className="divide-y-2">
              {semesters.map((_, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td className="py-1.5 pl-2 text-left">{index + 1}. Yarıyıl</td>
                    <td className="py-1.5">{semesterCreditAndGpa(index).gpa}</td>
                    <td className="py-1.5">{semesterCreditAndGpa(index).credit}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="bg-gray-100 text-center dark:bg-gray-900">
                <td className="py-1.5 pl-2 text-left font-semibold">Toplam</td>
                <td className="py-1.5">{totalCreditAndGpa().totalGpa}</td>
                <td className="py-1.5">{totalCreditAndGpa().totalCredit}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <button
        className={`absolute -right-6 top-[46%] rounded-r-full bg-white px-1 py-4 dark:bg-black`}
        onClick={handleSidebarToggle}
      >
        <BsChevronLeft className={`transition-transform duration-500 ${toggleCollapse && 'rotate-180'}`} />
      </button>
    </aside>
  );
}

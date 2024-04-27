'use client';
import { useContext, useState } from 'react';
import { BsChevronLeft, BsPlusCircle, BsDashCircle } from 'react-icons/bs';
import { SemesterContext } from '@/context/SemesterContext';
import { maxSemesterLength } from '@/config/boxLength';

export default function Sidebar() {
  const { semesters, addSemester, removeSemester, semesterCreditAndGpa, totalCreditAndGpa } =
    useContext(SemesterContext);

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [sidebarRender, setSidebarRender] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
    toggleCollapse
      ? setTimeout(() => setSidebarRender((prev) => !prev), 420)
      : setTimeout(() => setSidebarRender((prev) => !prev), 250);
  };

  return (
    <div
      className={`sticky top-0 flex h-[calc(100vh-56px)] flex-col justify-between bg-white dark:bg-black ${toggleCollapse ? 'w-0' : 'w-72'}`}
      style={{ transition: 'width 500ms cubic-bezier(.8,.2,.8,.7) 0s ' }}
    >
      {!sidebarRender && (
        <div className="p-2">
          <div className="flex items-center justify-center gap-2 pb-2 text-xl font-semibold">
            <p>Yarıyıl</p>
            <button className="flex cursor-default gap-4 rounded-full bg-gray-200 p-2 dark:bg-gray-800">
              <BsPlusCircle
                className="cursor-pointer hover:text-green-500"
                size={20}
                onClick={() => {
                  maxSemesterLength > semesters.length && addSemester();
                }}
              />
              <BsDashCircle
                className="cursor-pointer hover:text-red-500"
                size={20}
                onClick={() => {
                  semesters.length > 1 && removeSemester();
                }}
              />
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-center dark:bg-gray-900 ">
                <th className="py-2 text-left">Yarıyıl</th>
                <th className="py-2">GNO</th>
                <th className="py-2">Kredi</th>
              </tr>
            </thead>

            <tbody className="divide-y-2">
              {semesters.map((_, index) => {
                return (
                  <tr key={index} className="text-center">
                    <td className="py-1.5 text-left">{index + 1}. Yarıyıl</td>
                    <td className="py-1.5">{semesterCreditAndGpa(index).gpa}</td>
                    <td className="py-1.5">{semesterCreditAndGpa(index).credit}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="bg-gray-100 text-center dark:bg-gray-900">
                <td className="py-1.5 text-left font-semibold">Toplam</td>
                <td className="py-1.5">{totalCreditAndGpa().totalGpa}</td>
                <td className="py-1.5">{totalCreditAndGpa().totalCredit}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <button
        className={`absolute -right-6 top-[46%] rounded-full bg-white py-4 dark:bg-black ${toggleCollapse ? 'rotate-180 pl-2 pr-6' : 'pl-6 pr-2'}`}
        onClick={handleSidebarToggle}
      >
        <BsChevronLeft />
      </button>
    </div>
  );
}

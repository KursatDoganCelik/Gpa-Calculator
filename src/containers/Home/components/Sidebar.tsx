'use client';
import { useContext, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { SemesterContext } from '@/context/SemesterContext';
import { SaveCourseButton, NoteType, SemesterManager } from './ManagerButtons';

export default function Sidebar({ email }: { email: string | null | undefined }) {
  const { semesters, semesterCreditAndGpa, totalCreditAndGpa } = useContext(SemesterContext);

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [sidebarRender, setSidebarRender] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
    toggleCollapse
      ? setTimeout(() => setSidebarRender((prev) => !prev), 440)
      : setTimeout(() => setSidebarRender((prev) => !prev), 220);
  };

  return (
    <aside
      className={`sticky top-0 flex h-[calc(100vh-56px)] flex-col justify-between bg-white dark:bg-black ${toggleCollapse ? 'w-0' : 'w-72'}`}
      style={{ transition: 'width 500ms cubic-bezier(.8,.2,.8,.7) 0s ' }}
    >
      {!sidebarRender && (
        <div className="p-2 text-center">
          <SemesterManager />
          <NoteType email={email} />
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
          {email && <SaveCourseButton email={email} />}
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

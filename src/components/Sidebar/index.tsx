'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { SemesterContext } from '@/context/SemesterContext';
import { CgRemove } from 'react-icons/cg';

import { BsPlusCircle, BsDashCircle, BsChevronLeft } from 'react-icons/bs';
import { maxSemesterLength } from '@/config';
import { Button } from '../ui/button';
import AddSemesterButton from './AddSemesterButton';

const Sidebar = () => {
  const { semesters, addSemester, removeSemester } = useContext(SemesterContext);

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [sidebarRender, setSidebarRender] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
    toggleCollapse
      ? setTimeout(() => setSidebarRender((prev) => !prev), 150)
      : setTimeout(() => setSidebarRender((prev) => !prev), 150);
  };

  return (
    <div
      className={`sticky top-0 flex h-[calc(100vh-56px)] flex-col justify-between bg-white dark:bg-black ${toggleCollapse ? 'w-0' : 'w-80'}`}
      style={{ transition: 'width 500ms cubic-bezier(0.15, 0.65, 1, 1) 0s ' }}
    >
      {!sidebarRender && (
        <div className="flex flex-col gap-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-900 ">
                <th className="py-2 text-left">Yarıyıl</th>
                <th className="py-2 text-left">GNO</th>
                <th className="py-2 text-left">Kredi</th>
              </tr>
            </thead>

            <tbody>
              {semesters.map((_, index) => (
                <tr key={index}>
                  <td>{index + 1}. Yarıyıl</td>
                  <td>Sayı</td>
                  <td>Kredi</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Toplam</td>
                <td>T Sayı</td>
                <td>T Kredi</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <button
        className={`absolute -right-8 top-[46%] rounded-full bg-white py-4 dark:bg-black ${toggleCollapse ? 'rotate-180 pl-2 pr-6' : 'pl-6 pr-2'}`}
        onClick={handleSidebarToggle}
      >
        <BsChevronLeft />
      </button>
    </div>
  );
};

export default Sidebar;

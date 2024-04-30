import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { BsChevronUp, BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import { maxSemesterLength } from '@/config/boxLength';

export default function MobileDrawer() {
  const { semesters, addSemester, removeSemester, semesterCreditAndGpa, totalCreditAndGpa } =
    useContext(SemesterContext);
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="flex w-full justify-center rounded-t-full bg-white p-3 dark:bg-black">
          <BsChevronUp />
        </div>
      </DrawerTrigger>
      <DrawerContent>
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
      </DrawerContent>
    </Drawer>
  );
}

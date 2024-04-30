import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { BsChevronUp, BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import { maxSemesterLength } from '@/config/boxLength';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export default function MobileDrawer() {
  const { semesters, addSemester, removeSemester, semesterCreditAndGpa, totalCreditAndGpa } =
    useContext(SemesterContext);
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="sticky bottom-0 flex h-fit w-full justify-center rounded-t-full bg-white p-3 dark:bg-black sm:hidden">
          <BsChevronUp />
        </div>
      </DrawerTrigger>
      <DrawerContent>
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}

import { useContext } from 'react';
import { SemesterContext } from '@/context/SemesterContext';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import { BsChevronUp } from 'react-icons/bs';
import { SaveCourseButton, NoteType, SemesterManager } from './ManagerButtons';

export default function MobileDrawer({ email }: { email: string | null | undefined }) {
  const { semesters, semesterCreditAndGpa, totalCreditAndGpa } = useContext(SemesterContext);
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="rounded-t-full bg-white p-2 ring-2 ring-gray-200 dark:bg-black dark:ring-gray-800">
          <BsChevronUp />
        </div>
      </DrawerTrigger>
      <DrawerContent>
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
      </DrawerContent>
    </Drawer>
  );
}

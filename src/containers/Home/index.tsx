'use client';
import { SemesterContext } from '@/context/SemesterContext';
import SemesterBox from './components/SemesterBox';
import { useContext, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { motion } from 'framer-motion';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import MobileDrawer from './components/MobileDrawer';

export default function Home() {
  const { semesters, isLoading } = useContext(SemesterContext);

  useEffect(() => {
    // Pencere boyutu değiştiğinde sınıfı güncelle
    const updateColClass = () => {
      const semestersDiv = document.getElementById('semestersDiv');
      if (semestersDiv) {
        const divWidth = semestersDiv.offsetWidth;
        if (divWidth > 730) {
          semestersDiv.classList.add('grid-cols-1');
          semestersDiv.classList.add('sm:grid-cols-2');
        } else {
          semestersDiv.classList.remove('sm:grid-cols-2');
        }
      }
    };

    // İlk render'da ve pencere boyutu değiştiğinde sınıfı güncelle
    updateColClass();
    window.addEventListener('resize', updateColClass);
    // Listener'ı kaldır burası cleanup fonksiyonu
    return () => window.removeEventListener('resize', updateColClass);
  }, []);

  if (isLoading) {
    return (
      <main className="flex">
        <Sidebar />
        <div className="flex w-full flex-1 flex-col gap-3 bg-gray-100 px-8 py-4  dark:bg-gray-900">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="min-h-[300px] bg-white p-1 dark:bg-black ">
              <div className="flex items-center justify-between pl-2">
                <p className="py-2 text-xl font-semibold">1. Yarıyıl</p>
                <button className="flex size-8 items-center justify-center hover:text-green-500">
                  <BsPlusCircle size={16} />
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-900 ">
                    <th className="px-4 py-2 text-left">Ders Adı</th>
                    <th className="w-12 px-4 py-2 text-center">Not</th>
                    <th className="w-16 px-4 py-2 text-center">Kredi</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="even:bg-gray-100 dark:even:bg-gray-900">
                    <td className="px-2">
                      <div className="mb-2 mt-2 h-6 w-full animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-full animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-full animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-full animate-pulse rounded-full bg-white/80" />
                    </td>

                    <td className="px-2">
                      <div className="mb-2 mt-2 h-6 w-12 animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-12 animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-12 animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-12 animate-pulse rounded-full bg-white/80" />
                    </td>

                    <td className="px-2">
                      <div className="mb-2 mt-2 h-6 w-16 animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-16 animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-16 animate-pulse rounded-full bg-white/80" />
                      <div className="mb-2 h-6 w-16 animate-pulse rounded-full bg-white/80" />
                    </td>

                    <td>
                      <button className="flex size-8 items-center justify-center hover:text-red-500">
                        <div className="flex flex-col gap-5">
                          <BsDashCircle size={16} />
                          <BsDashCircle size={16} />
                          <BsDashCircle size={16} />
                          <BsDashCircle size={16} />
                        </div>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <div className="flex w-full flex-1 flex-col gap-3 bg-gray-100 px-1 pt-4 dark:bg-gray-900 sm:px-8 sm:py-4">
        <motion.ul
          id="semestersDiv"
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 "
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {semesters.map((_, index) => (
            <motion.li
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, duration: 1 }}
              key={index}
            >
              <SemesterBox semesterIndex={index} />
            </motion.li>
          ))}
        </motion.ul>

        <MobileDrawer />
      </div>
    </main>
  );
}

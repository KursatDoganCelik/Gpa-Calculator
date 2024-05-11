'use client';
import { SemesterContext } from '@/context/SemesterContext';
import SemesterBox from './components/SemesterBox';
import { useContext, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { motion } from 'framer-motion';
import MobileDrawer from './components/MobileDrawer';
import { Semester } from '@/config/types';

export default function Home({ userCourses }: { userCourses: Semester[] }) {
  const { semesters, setSemesters } = useContext(SemesterContext);

  useEffect(() => {
    userCourses && setSemesters(userCourses);
  }, []);

  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full bg-gray-100 px-2 py-4 dark:bg-gray-900 sm:px-8 md:py-8">
        <motion.ul
          id="semestersDiv"
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 md:gap-6 lg:grid-cols-2 lg:gap-10"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {semesters.map((_, index: number) => (
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

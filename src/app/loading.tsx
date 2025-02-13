import Sidebar from '@/containers/Home/components/Sidebar';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';

export default function Loading() {
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

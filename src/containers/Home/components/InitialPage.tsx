import { BsFileEarmarkArrowDown } from 'react-icons/bs';
// import { Button } from 'next/button';

export default function InitialPage() {
  return (
    <div className="flex h-full flex-col items-center justify-evenly gap-5 bg-gray-100 p-5 dark:bg-gray-900 sm:flex-row ">
      <div className="flex size-64 flex-col items-center justify-center gap-4 rounded-2xl border-4 border-dashed bg-white p-6 dark:bg-black dark:text-white md:size-80 md:p-8">
        <BsFileEarmarkArrowDown className="size-20 md:mb-4" />
        <button className="h-auto w-full cursor-pointer rounded border-4 border-solid p-1.5"> Dosya Yükle </button>
        <button className="h-auto w-full cursor-pointer rounded border-4 border-solid p-1.5"> Yarıyıl Ekle </button>
      </div>

      <div className="flex size-64 flex-col items-start justify-center gap-6 rounded-2xl border-4 border-solid bg-white p-6 dark:bg-black dark:text-white md:size-80 md:gap-8 md:p-8">
        <ul className="list-inside list-disc">
          <p className="mb-2 font-bold">Notlarınızı yüklemek için:</p>
          <li>E-devlet Transkript</li>
          <li>Text Dosyası</li>
          <li>Screenshot</li>
        </ul>

        <ul className="list-inside list-disc">
          <p className="mb-2 font-bold">Manuel eklemek için:</p>
          <li>Yarıyıl Ekle Butonu</li>
        </ul>
      </div>
    </div>
  );
}

import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="hidden items-center justify-between bg-white p-4 text-black dark:bg-black dark:text-white sm:flex md:px-8">
      <p className="pr-2 text-center">
        <span className="font-bold">Copyright ©</span>2024, <span className="font-bold">Desgined by</span> Soligin
      </p>
      <div className="flex gap-3 pl-2">
        <BsInstagram className="cursor-pointer transition-transform hover:scale-110" size={24} />
        <BsGithub className="cursor-pointer transition-transform hover:scale-110" size={24} />
        <BsLinkedin className="cursor-pointer transition-transform hover:scale-110" size={24} />
      </div>
    </footer>
  );
}

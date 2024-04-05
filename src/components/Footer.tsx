import { Facebook, Instagram, Twitch, Twitter } from 'lucide-react';

<Instagram />;
export default function Footer() {
  return (
    <footer className="flex justify-between bg-white p-6 text-black md:px-8">
      <p>© 2024 Your Company, Inc. All rights reserved.</p>
      <div id="social-media" className="flex gap-3">
        <Instagram className="cursor-pointer transition-transform hover:scale-125" size={24} />
        <Facebook className="cursor-pointer transition-transform hover:scale-125" size={24} />
        <Twitter className="cursor-pointer transition-transform hover:scale-125" size={24} />
        <Twitch className="cursor-pointer transition-transform hover:scale-125" size={24} />
      </div>
    </footer>
  );
}

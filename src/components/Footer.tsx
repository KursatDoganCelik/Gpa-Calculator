import { Facebook, Instagram, Twitch, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="flex justify-between p-6 md:px-8">
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

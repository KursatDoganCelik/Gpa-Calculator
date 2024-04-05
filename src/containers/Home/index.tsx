import { RefreshCw } from 'lucide-react';
import React from 'react';
export default function Home() {
  return (
    <main className="flex h-full w-full items-center justify-center text-white">
      <div
        id="container"
        className="flex h-fit w-full max-w-[444px] flex-col items-center gap-4 rounded-lg bg-[#0d111c] p-4"
      >
        <div className="flex w-full items-center justify-between">
          <p className="text-3xl">0.001</p>
          <select className="cursor-pointer rounded-lg bg-[#131a2a] px-3 py-2 hover:bg-[#293249]">
            <option value="btc1">ETH</option>
            <option value="btc2">SEP</option>
          </select>
        </div>

        <div className="flex w-full justify-evenly gap-2.5 leading-loose">
          <button className="flex-1 rounded-lg border border-[#1b2132] px-2 hover:bg-[#131a2a]">25%</button>
          <button className="flex-1 rounded-lg border border-[#1b2132] px-2 hover:bg-[#131a2a]">50%</button>
          <button className="flex-1 rounded-lg border border-[#1b2132] px-2 hover:bg-[#131a2a]">75%</button>
          <button className="flex-1 rounded-lg border border-[#1b2132] px-2 hover:bg-[#131a2a]">100%</button>
        </div>

        <RefreshCw size={24} className="cursor-pointer duration-500 hover:rotate-180" />

        <div className="flex w-full items-center justify-between">
          <p className="text-3xl text-white/50">123.01</p>
          <select className="cursor-pointer rounded-lg bg-[#131a2a] px-3 py-2 hover:bg-[#293249]">
            <option value="btc1">STR</option>
            <option value="btc2">SEP</option>
          </select>
        </div>

        <div className="flex w-full justify-between">
          <p>3.28</p>
          <p>Bakiye: 101.01</p>
        </div>
      </div>
    </main>
  );
}

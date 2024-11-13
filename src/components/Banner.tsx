'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
  const covers = ['/img/cover1.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg'];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      className="relative w-full h-[80vh] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
      onClick={() => setIndex(index + 1)}
    >
      <Image
        src={covers[index % 4]}
        alt="cover"
        fill={true}
        priority
        className="object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
      {/* Title */}
      <div className="relative top-[120px] z-20 text-center">
        <h1 className="text-5xl font-bold text-slate-900 bg-white/60 py-2 px-6 rounded-lg shadow-lg">
          Your Travel Partner
        </h1>
        <h3 className="text-2xl font-light text-slate-900 mt-2 bg-white/60 py-1 px-4 rounded-md shadow-sm">
          Explore Your World with Us
        </h3>
      </div>
      {/* User Greeting */}
      {session ? (
        <div className="z-10 absolute top-5 right-10 text-lg font-semibold text-cyan-100 shadow-md px-4 py-2 bg-cyan-900/70 rounded-lg">
          Hello {session.user?.name}
        </div>
      ) : null}
      {/* Button */}
      <button
        className="bg-white text-cyan-700 border border-cyan-600 font-semibold py-3 px-5 rounded-lg z-30 absolute bottom-10 right-10
                  hover:bg-cyan-700 hover:text-white hover:border-transparent transition-all duration-300 shadow-lg"
        onClick={(e) => {
          e.stopPropagation();
          router.push('/hotel');
        }}
      >
        Select Your Travel Partner NOW
      </button>
    </div>
  );
}

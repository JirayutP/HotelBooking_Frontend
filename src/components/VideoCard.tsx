'use client'
import { VlogPlayer } from "./VlogPlayer";
import { useState } from "react";
import { Rating } from "@mui/material";
import { useWindowListener } from "@/hooks/useWindowListener";

export function VideoCard() {
  const [playing, setPlaying] = useState(true);
  const [rating, setRating] = useState(0);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  useWindowListener('pointermove', (e) => {
    setPointerPosition({ x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY });
  });

  return (
    <div className="w-[60%] mx-auto my-10 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-100 shadow-xl flex flex-col md:flex-row items-center">
      {/* Responsive Video Container */}
      <div className="w-[60%] aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg mb-4 md:mb-0">
        <VlogPlayer isPlaying={playing} vdoSrc="/video/hotelVideo.mp4" />
      </div>
      <div className="flex-1 text-left md:ml-5">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Tour</h3>
        <p className="text-gray-500 mb-4">Mouse Position: ({pointerPosition.x}, {pointerPosition.y})</p>
        <button
          className="block w-auto px-4 py-2 mb-3 text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-600 transition-all duration-300"
          onClick={() => { setPlaying(!playing); }}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <Rating
          className="mt-2"
          value={rating || 0}
          onChange={(e, newValue) => { if (newValue != null) setRating(newValue); }}
        />
      </div>
    </div>
  );
}

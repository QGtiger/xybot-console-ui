'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';

interface ResizableImageProps {
  src: string;
  alt?: string;
  initialWidth?: number;
  initialHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onResize?: (width: number, height: number) => void;
}

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | null;

export function ResizableImage({
  src,
  alt = '',
  initialWidth = 400,
  initialHeight = 300,
  maxWidth = 800,
  maxHeight = 600,
  onResize,
}: ResizableImageProps) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [activeHandle, setActiveHandle] = useState<ResizeHandle>(null);
  const [isSelected, setIsSelected] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setActiveHandle(handle);
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width,
      height,
    };
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!activeHandle) return;

      const deltaX = e.clientX - startPos.current.x;
      const deltaY = e.clientY - startPos.current.y;

      let newWidth = startPos.current.width;
      let newHeight = startPos.current.height;

      if (activeHandle.includes('e')) {
        newWidth = Math.max(100, startPos.current.width + deltaX);
      }
      if (activeHandle.includes('w')) {
        newWidth = Math.max(100, startPos.current.width - deltaX);
      }
      if (activeHandle.includes('s')) {
        newHeight = Math.max(75, startPos.current.height + deltaY);
      }
      if (activeHandle.includes('n')) {
        newHeight = Math.max(75, startPos.current.height - deltaY);
      }

      setWidth(Math.round(newWidth));
      setHeight(Math.round(newHeight));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setActiveHandle(null);
      if (onResize) {
        onResize(width, height);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, activeHandle, width, height, maxWidth, maxHeight, onResize]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsSelected(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative  cursor-pointer`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        userSelect: isResizing ? 'none' : 'auto',
        boxShadow: isSelected ? `0 0 0 2px #5d15f2` : 'none',
      }}
      onClick={() => {
        setIsSelected(true);
      }}
    >
      <img
        src={src}
        alt={alt}
        className=" object-contain pointer-events-none w-full h-full"
        draggable={false}
      />

      {isSelected && (
        <>
          <div
            className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-white-1000 border-solid border-2 border-[#5d15f2] rounded-full cursor-nw-resize hover:scale-125 transition-transform"
            onMouseDown={(e) => handleMouseDown(e, 'nw')}
          />
          <div
            className="absolute -right-1.5 -top-1.5 w-3 h-3 bg-white-1000 border-solid border-2 border-[#5d15f2] rounded-full cursor-ne-resize hover:scale-125 transition-transform"
            onMouseDown={(e) => handleMouseDown(e, 'ne')}
          />
          <div
            className="absolute -left-1.5 -bottom-1.5 w-3 h-3 bg-white-1000 border-solid border-2 border-[#5d15f2] rounded-full cursor-sw-resize hover:scale-125 transition-transform"
            onMouseDown={(e) => handleMouseDown(e, 'sw')}
          />
          <div
            className="absolute -right-1.5 -bottom-1.5 w-3 h-3 bg-white-1000 border-solid border-2 border-[#5d15f2] rounded-full cursor-se-resize hover:scale-125 transition-transform"
            onMouseDown={(e) => handleMouseDown(e, 'se')}
          />

          {/* <div
            style={{
              transform: 'translateX(-50%)',
            }}
            className="absolute -bottom-8 left-1/2  border-solid bg-[#5d15f2] text-white-1000 text-xs px-2 py-1 rounded whitespace-nowrap"
          >
            {width} × {height}
          </div> */}
        </>
      )}
    </div>
  );
}

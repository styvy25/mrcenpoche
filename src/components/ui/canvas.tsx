import React, { useRef, useEffect, useState } from "react";

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
  onDraw?: (data: string) => void;
}

interface Position {
  x: number;
  y: number;
}

const Canvas: React.FC<CanvasProps> = ({
  width = 400,
  height = 400,
  className = "",
  onDraw,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set up the canvas
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    
    setCtx(context);

    // Clear canvas initially
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const position = getPosition(e);
    setLastPosition(position);
    
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !lastPosition) return;
    
    const position = getPosition(e);
    
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
    
    setLastPosition(position);
  };

  const stopDrawing = () => {
    if (isDrawing && ctx) {
      ctx.closePath();
      
      // If onDraw callback is provided, send the canvas data
      if (onDraw && canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL("image/png");
        onDraw(dataUrl);
      }
    }
    
    setIsDrawing(false);
    setLastPosition(null);
  };

  const getPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Position => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // If onDraw callback is provided, send the empty canvas data
    if (onDraw && canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onDraw(dataUrl);
    }
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`border border-gray-300 rounded-md ${className}`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        className="mt-2 px-3 py-1 bg-gray-200 rounded-md text-sm"
      >
        Effacer
      </button>
    </div>
  );
};

export default Canvas;

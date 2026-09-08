import { useRef, useState, useEffect } from 'react';
import './SmartBoardPen.css';

interface Props {
  onClose: () => void;
}

type PenTool = 'highlighter' | 'blue' | 'red' | 'green' | 'eraser';

export default function SmartBoardPen({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTool, setActiveTool] = useState<PenTool>('highlighter');
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to window size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // Save content before resize
      const ctx = canvas.getContext('2d');
      let imgData: ImageData | null = null;
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (ctx && imgData) {
        ctx.putImageData(imgData, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    lastPos.current = getCoordinates(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !lastPos.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCoordinates(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 28;
    } else {
      ctx.globalCompositeOperation = activeTool === 'highlighter' ? 'source-over' : 'source-over';
      if (activeTool === 'highlighter') {
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
        ctx.lineWidth = 20;
      } else if (activeTool === 'blue') {
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 5;
      } else if (activeTool === 'red') {
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 5;
      } else if (activeTool === 'green') {
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 5;
      }
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos.current = currentPos;
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="smart-board-pen-overlay">
      <canvas
        ref={canvasRef}
        className="smart-board-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* Floating Toolbar */}
      <div className="smart-board-toolbar" role="toolbar" aria-label="Smart Board Pen Controls">
        <div className="smart-board-toolbar__title">
          <span>✏️ Smart Board Pen</span>
        </div>

        <div className="smart-board-toolbar__tools">
          <button
            type="button"
            className={`tool-btn tool-btn--highlighter ${activeTool === 'highlighter' ? 'tool-btn--active' : ''}`}
            onClick={() => setActiveTool('highlighter')}
            title="Yellow Highlighter"
          >
            🖍️ Highlighter
          </button>
          <button
            type="button"
            className={`tool-btn tool-btn--blue ${activeTool === 'blue' ? 'tool-btn--active' : ''}`}
            onClick={() => setActiveTool('blue')}
            title="Blue Pen"
          >
            🖊️ Blue
          </button>
          <button
            type="button"
            className={`tool-btn tool-btn--red ${activeTool === 'red' ? 'tool-btn--active' : ''}`}
            onClick={() => setActiveTool('red')}
            title="Red Marker"
          >
            🔴 Red
          </button>
          <button
            type="button"
            className={`tool-btn tool-btn--green ${activeTool === 'green' ? 'tool-btn--active' : ''}`}
            onClick={() => setActiveTool('green')}
            title="Green Marker"
          >
            🟢 Green
          </button>
          <button
            type="button"
            className={`tool-btn tool-btn--eraser ${activeTool === 'eraser' ? 'tool-btn--active' : ''}`}
            onClick={() => setActiveTool('eraser')}
            title="Eraser"
          >
            🧽 Eraser
          </button>
        </div>

        <div className="smart-board-toolbar__actions">
          <button
            type="button"
            className="action-btn action-btn--clear"
            onClick={handleClear}
            title="Clear all markings"
          >
            🧹 Clear
          </button>
          <button
            type="button"
            className="action-btn action-btn--close"
            onClick={onClose}
            title="Exit Draw Mode"
          >
            ✕ Done
          </button>
        </div>
      </div>
    </div>
  );
}

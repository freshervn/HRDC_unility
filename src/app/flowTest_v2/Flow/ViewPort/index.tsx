import { useViewport } from 'reactflow'; 
export default function ViewportDisplay() {
  const { x, y, zoom } = useViewport(); 
  return (
    <div>
      <p>
        The viewport is currently at ({x}, {y}) and zoomed to {zoom}.
      </p>
    </div>
  );
}
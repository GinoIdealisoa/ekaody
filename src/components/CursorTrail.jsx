import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const cursorCanvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const trail = useRef([]);

  useEffect(() => {
    const cursorCanvas = cursorCanvasRef.current;
    if (!cursorCanvas) return;

    const ctx = cursorCanvas.getContext("2d");
    let animationFrameId;

    const resizeCursorCanvas = () => {
      cursorCanvas.width = window.innerWidth;
      cursorCanvas.height = window.innerHeight;
    };
    resizeCursorCanvas();
    window.addEventListener("resize", resizeCursorCanvas);

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Ajouter une nouvelle position à la traînée
      trail.current.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        size: 8,
      });

      // Limiter la longueur de la traînée
      if (trail.current.length > 30) {
        trail.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCursor = () => {
      ctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

      // Vieillir et dessiner la traînée
      trail.current = trail.current.filter((point) => {
        point.age += 0.05;
        return point.age < 1;
      });

      // Dessiner les vagues du sillage
      for (let i = 0; i < trail.current.length; i++) {
        const point = trail.current[i];
        const opacity = (1 - point.age) * 0.6;
        const size = point.size * (1 - point.age);

        // Cercle principal (sillage)
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size
        );
        gradient.addColorStop(0, `rgba(2, 132, 199, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(14, 165, 233, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Vagues latérales (effet en V comme un bateau)
        if (i > 0) {
          const prevPoint = trail.current[i - 1];
          const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
          
          // Vague gauche
          const leftX = point.x + Math.cos(angle + Math.PI / 3) * size * 2;
          const leftY = point.y + Math.sin(angle + Math.PI / 3) * size * 2;
          
          ctx.beginPath();
          ctx.arc(leftX, leftY, size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(2, 132, 199, ${opacity * 0.4})`;
          ctx.fill();

          // Vague droite
          const rightX = point.x + Math.cos(angle - Math.PI / 3) * size * 2;
          const rightY = point.y + Math.sin(angle - Math.PI / 3) * size * 2;
          
          ctx.beginPath();
          ctx.arc(rightX, rightY, size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(2, 132, 199, ${opacity * 0.4})`;
          ctx.fill();
        }

        // Particules d'écume
        if (Math.random() > 0.7) {
          const foamX = point.x + (Math.random() - 0.5) * size * 3;
          const foamY = point.y + (Math.random() - 0.5) * size * 3;
          ctx.beginPath();
          ctx.arc(foamX, foamY, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.fill();
        }
      }

      // Dessiner le curseur principal (le bateau)
      if (trail.current.length > 0) {
        const { x, y } = mousePos.current;

        // Ombre du curseur
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        const shadowGradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        shadowGradient.addColorStop(0, "rgba(2, 132, 199, 0.4)");
        shadowGradient.addColorStop(1, "rgba(2, 132, 199, 0)");
        ctx.fillStyle = shadowGradient;
        ctx.fill();

        // Curseur principal
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(2, 132, 199, 0.9)";
        ctx.fill();

        // Anneau externe
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(2, 132, 199, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Point central brillant
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener("resize", resizeCursorCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={cursorCanvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{ cursor: "none" }}
    />
  );
}
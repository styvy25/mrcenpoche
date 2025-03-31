
import { useState, useEffect, useRef } from "react";

// Interface pour les props de l'arrière-plan animé
interface AnimatedBackgroundProps {
  numberOfOrbs?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  intensity?: number;
  speed?: number;
  blur?: number;
}

export const AnimatedBackground = ({
  numberOfOrbs = 5,
  color1 = "rgba(21, 101, 192, 0.3)", // mrc-blue with opacity
  color2 = "rgba(46, 125, 50, 0.2)",  // mrc-green with opacity
  color3 = "rgba(198, 40, 40, 0.15)",  // mrc-red with opacity
  intensity = 0.4,
  speed = 1,
  blur = 60,
}: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Array<{ x: number; y: number; size: number; color: string; speedX: number; speedY: number }>>([]);
  const animationRef = useRef<number>(0);
  const lastUpdateTime = useRef<number>(0);

  // Initialiser les orbes
  useEffect(() => {
    const initOrbs = () => {
      const newOrbs = [];
      const colors = [color1, color2, color3];
      
      for (let i = 0; i < numberOfOrbs; i++) {
        newOrbs.push({
          x: Math.random() * 100, // pourcentage de la largeur
          y: Math.random() * 100, // pourcentage de la hauteur
          size: 20 + Math.random() * 40, // taille entre 20 et 60
          color: colors[i % colors.length],
          speedX: (Math.random() - 0.5) * speed * 0.1,
          speedY: (Math.random() - 0.5) * speed * 0.1
        });
      }
      
      orbsRef.current = newOrbs;
    };
    
    initOrbs();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [numberOfOrbs, color1, color2, color3, speed]);

  // Gestion de la position de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation des orbes
  useEffect(() => {
    const updateOrbs = (timestamp: number) => {
      if (!lastUpdateTime.current) {
        lastUpdateTime.current = timestamp;
      }
      
      const deltaTime = timestamp - lastUpdateTime.current;
      lastUpdateTime.current = timestamp;
      
      orbsRef.current = orbsRef.current.map(orb => {
        // Mouvement autonome
        let newX = orb.x + orb.speedX * deltaTime;
        let newY = orb.y + orb.speedY * deltaTime;
        
        // Rebondir sur les bords
        if (newX < 0 || newX > 100) {
          orb.speedX *= -1;
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY < 0 || newY > 100) {
          orb.speedY *= -1;
          newY = Math.max(0, Math.min(100, newY));
        }
        
        // Ajouter un effet d'attraction léger vers la souris
        const distX = mousePosition.x - newX;
        const distY = mousePosition.y - newY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 30) { // Seulement si la souris est proche
          newX += (distX / distance) * intensity * 0.1 * deltaTime;
          newY += (distY / distance) * intensity * 0.1 * deltaTime;
        }
        
        return {
          ...orb,
          x: newX,
          y: newY
        };
      });
      
      // Forcer le rendu
      forceUpdate();
      
      animationRef.current = requestAnimationFrame(updateOrbs);
    };
    
    // Hack pour forcer le rendu sans useState
    const forceUpdate = () => {
      if (containerRef.current) {
        const orbs = containerRef.current.querySelectorAll('.animated-orb');
        orbsRef.current.forEach((orb, index) => {
          if (orbs[index]) {
            const orbElement = orbs[index] as HTMLElement;
            orbElement.style.left = `${orb.x}%`;
            orbElement.style.top = `${orb.y}%`;
          }
        });
      }
    };
    
    animationRef.current = requestAnimationFrame(updateOrbs);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, intensity]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbsRef.current.map((orb, index) => (
        <div
          key={index}
          className="animated-orb absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}vw`,
            height: `${orb.size}vw`,
            backgroundColor: orb.color,
            filter: `blur(${blur}px)`,
            opacity: 0.8,
            transition: 'transform 0.5s ease-out',
            transform: `translate(-50%, -50%) scale(${Math.random() * 0.4 + 0.8})`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;

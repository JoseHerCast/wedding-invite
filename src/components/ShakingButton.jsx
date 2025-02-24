import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ShakingButton = ({ onClick=()=>{}, className="", children, shakeInterval = 4000 }) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800); // La vibración dura 300ms
    }, shakeInterval); // Se activa cada `shakeInterval` milisegundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [shakeInterval]);

  return (
    <motion.div
      onClick={onClick}
      className={className} // Mantiene los estilos personalizados
      animate={isShaking ? { x: [0, -2, 2, -2, 2, 0] } : {}}
      transition={isShaking ? { duration: 0.5 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default ShakingButton;

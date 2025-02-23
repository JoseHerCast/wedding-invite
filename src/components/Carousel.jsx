import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Carousel = ({ images }) => {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="relative overflow-hidden w-full mt-4 bg-cream-100 py-10">
      <h2 className="text-center text-3xl font-greatVibes text-darkGreen-500 mb-6">
        Recuerdos Especiales
      </h2>
      
      <div className="w-full overflow-x-scroll scrollbar-hide" ref={containerRef}>
        <motion.div
          className="flex gap-6 flex-nowrap"
          drag="x"
          dragConstraints={{ left: -((images.length - 1) * 320), right: 0 }} // Control de límites
          dragElastic={0.2} // Rebote natural
        >
          {images.map((src, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 min-w-[280px] sm:min-w-[320px] lg:min-w-[400px] cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Boda ${index}`}
                className="rounded-xl shadow-lg object-cover w-full h-64"
                priority
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Modal de Imagen Ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)} // Cierra al hacer clic fuera
          >
            <motion.img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic en la imagen
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-gray-800 bg-opacity-70 rounded-full px-4 py-2"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;

import React, { useEffect } from "react";

const BottomSheet = ({ isOpen, onClose, children, className = "" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloquea el scroll
    } else {
      document.body.style.overflow = "auto"; // Restaura el scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Asegura que se restaure al desmontar
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-cream-100 text-center p-4 rounded-t-2xl shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${className}`}
      >
        <div className="flex justify-end items-center">
          {/* Botón de cierre */}
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="pb-6 px-2">{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;

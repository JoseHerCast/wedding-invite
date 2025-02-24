import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircleIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const MyAlert = ({ type = "info", message, onClose, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircleIcon className="w-6 h-6 text-green-500 shrink-0" />,
    error: <XCircleIcon className="w-6 h-6 text-red-500 shrink-0" />,
    info: <InformationCircleIcon className="w-6 h-6 text-blue-500 shrink-0" />,
  };

  const bgColors = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-5 lg:left-1/2 lg:transform lg:-translate-x-1/2 px-4 py-3 rounded-lg shadow-lg border ${bgColors[type]} flex items-center gap-3 w-[90vw] max-w-xs sm:max-w-md`}
          style={{ minWidth: "250px" }}
        >
          {icons[type]}
          <span className="flex-1 text-sm sm:text-base">{message}</span>
          <button
            onClick={() => setVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MyAlert;

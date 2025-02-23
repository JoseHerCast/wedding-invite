const RSVPConfirmation = ({ onConfirm, isLoading }) => {
    return (
        <button
            onClick={onConfirm}
            disabled={isLoading} // Deshabilita el botón mientras se envía la solicitud
            className={`py-2 px-4 rounded ${isLoading ? "bg-gray-400" : "bg-sage-500"} text-white`}
        >
            {isLoading ? "Enviando..." : "Confirmar Asistencia"} {/* Mostrar loader */}
        </button>
    );
};

export default RSVPConfirmation;

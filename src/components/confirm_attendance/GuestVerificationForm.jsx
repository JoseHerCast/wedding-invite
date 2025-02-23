import { useState } from "react";
import { setCookie } from "@/utils/cookieHandler";
import MyAlert from "@/components/MyAlert";

const GuestVerificationForm = ({ setGuestData }) => {
  const [guestKey, setGuestKey] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("info");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activar loader
    setCookie("guestKey", guestKey);

    try {
      const res = await fetch("/api/fetchGuestDetails", {
        method: "POST",
        body: JSON.stringify({ guestKey }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setGuestData(result.data || []);
      } else {
        setAlertMessage("Código inválido o no encontrado.");
        setAlertType("error"); // Puede ser "success", "error" o "info"

        setGuestData([]);
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      alert("Hubo un error. Intenta de nuevo.");
      setGuestData([]);
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="h-svh flex flex-col items-center justify-center bg-darkGreen-500 text-beige-500 p-8 shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-greatVibes mb-4 text-center">
        Ingresa tu código personalizado
      </h2>
      <p className="text-sm lg:text-base text-center mb-6">
        Introduce el código de invitación para acceder a los detalles de la boda.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Código personalizado..."
          value={guestKey}
          onChange={(e) => setGuestKey(e.target.value)}
          className="border border-beige-500 p-2 rounded bg-transparent text-center text-beige-500 focus:outline-none focus:ring-2 focus:ring-oldGold-500 placeholder-beige-500"
          required
        />
        <button type="submit" className={`${isLoading ? 'bg-gray-400' : 'bg-oldGold-500'}  text-white py-2 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95`} disabled={isLoading} >
          {isLoading ? "Verificando..." : "Acceder"}
        </button>
      </form>
      {/* // Llamar a MyAlert cuando haya un mensaje */}
      {alertMessage && (
        <MyAlert
          type={alertType}
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default GuestVerificationForm;

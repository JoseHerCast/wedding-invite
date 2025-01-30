import { useState } from "react";
import { setCookie } from "@/utils/cookieHandler";

const GuestVerificationForm = ({ onVerify, setGuestData }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCookie("guestPhone", phoneNumber); // Guardar número en cookie

    try {
      const res = await fetch("/api/fetchGuestDetails", {
        method: "POST",
        body: JSON.stringify({ phoneNumber }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log("Datos encontrados:", result.data); // Depuración

      if (res.ok && result.success) {
        setGuestData(result.data || []); // Actualizar la tabla con los registros encontrados
        onVerify(phoneNumber);
      } else {
        console.error(result.message || "Error desconocido.");
        alert("No se encontró información para este número.");
        setGuestData([]); // Vaciar la tabla si no se encuentran registros
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Ocurrió un error al verificar el número. Inténtalo de nuevo.");
      setGuestData([]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <label htmlFor="phone" className="text-lg font-semibold">
          Número de Teléfono
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="Ingrese su número"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          Verificar
        </button>
      </form>
    </div>
  );
};

export default GuestVerificationForm;

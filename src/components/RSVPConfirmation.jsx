const RSVPConfirmation = ({ phoneNumber, guestData }) => {
  const confirmAttendance = async () => {
      try {
          console.log("📤 Enviando datos a la API con teléfono incluido:", guestData);

          if (!Array.isArray(guestData) || guestData.length === 0) {
              alert("No hay datos para confirmar.");
              return;
          }

          const res = await fetch("/api/confirmAttendance", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ guestData }),
          });

          const result = await res.json();

          if (res.ok && result.success) {
              alert("✅ ¡Confirmación registrada exitosamente!");
          } else {
              alert("⚠️ Error al registrar la confirmación.");
          }
      } catch (error) {
          console.error("❌ Error al enviar la confirmación:", error);
          alert("Hubo un problema al confirmar la asistencia.");
      }
  };

  return (
      <button
          onClick={confirmAttendance}
          className="bg-green-500 text-white py-2 px-4 rounded"
      >
          Confirmar Asistencia
      </button>
  );
};

export default RSVPConfirmation;

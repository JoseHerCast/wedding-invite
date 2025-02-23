import { useRef } from "react";
import GuestList from "./GuestList";
import RSVPControls from "./RSVPControls";

const ConfirmAttendanceSection = ({ confirmRef, guestData, setGuestData, formData, handleInputChange }) => {

  // Verificar si ya está registrado
  const attendance=guestData.some(guest=>guest.Asistencia === "Asistirá")
  const missed=guestData.filter(guest=>guest.Asistencia === "No Asistirá")
  // Referencia para el formulario
  const formRef = useRef(null);

  return (
    <section ref={confirmRef} className="flex flex-col items-center justify-center px-6 text-center bg-darkGreen-500 text-sage-500 py-10">
      <h2 className="text-3xl md:text-4xl text-beige-500 font-greatVibes">
        {attendance?"¡Gracias por confirmar!" : "Confirma tu Asistencia"}
      </h2>

      {missed.length === guestData.length?(
        <div className="text-lg p-4 rounded-md">
        <p>Lamentamos mucho que no puedas acompañarnos...</p>
        <p>¡Nos vemos en la próxima!</p>
      </div>
      ):attendance ? (
        <div className="text-lg p-4 rounded-md">
          <ul className="mt-2">
            {guestData.map((guest, index) => (
              <li key={index} className="font-semibold">{guest.Nombre.toUpperCase()}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-beige-500">Nos emociona mucho compartir este día tan especial con ustedes.</p>
          <p className="mt-2 text-sm text-beige-500">¡Nos vemos pronto!</p>
        </div>
      ) : (
        <form ref={formRef} className="w-full flex flex-col items-center gap-4">
          {guestData.length > 0 && (
            <GuestList guestData={guestData} formData={formData} handleInputChange={handleInputChange} />
          )}
          <RSVPControls guestData={guestData} setGuestData={setGuestData} formData={formData} formRef={formRef} />
        </form>
      )}
    </section>
  );
};

export default ConfirmAttendanceSection;


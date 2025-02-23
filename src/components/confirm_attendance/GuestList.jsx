import GuestRow from "./GuestRow";

const GuestList = ({ guestData, formData, handleInputChange}) => {
  /* console.log("Props recibidas en GuestList:", { guestData, formData }); */

  if (!guestData || guestData.length === 0) {
    console.warn("GuestList: No hay datos de invitados.");
    return null;
  }

  const titular = guestData.find(guest => guest["Titular"] === "TRUE");
  /* console.log("Titular encontrado:", titular); */

  if (!titular || !titular["Boletos"]) {
    console.warn("GuestList: No se encontró titular o no tiene boletos.");
    return null;
  }

  const boletos = parseInt(titular["Boletos"], 10) || 0;
  const numRegistros = guestData.length;
  const acompañantesFaltantes = boletos - numRegistros;

  /* console.log(`Boletos disponibles: ${boletos}, Registros actuales: ${numRegistros}, Acompañantes faltantes: ${acompañantesFaltantes}`); */

  const registrosCompletos = guestData.map((guest) => ({
    ...guest,
    EsAcompanante: false,
  }));

  for (let i = 1; i <= acompañantesFaltantes; i++) {
    registrosCompletos.push({
      Nombre: `Acompañante ${i}`,
      Asistencia: "Pendiente",
      Edad: "Adulto",
      EsAcompanante: true,
      NoUsaraBoleto: "No",
    });
  }

  /* console.log("Registros completos:", registrosCompletos); */

  return (
    <div className="w-full max-w-2xl space-y-2 md:space-y-2">
      <h2 className="text-lg font-semibold text-sage-500">¡Tienes {boletos} boletos!</h2>

      <div className="grid grid-cols-1">
        {registrosCompletos.map((row, index) => (
          <GuestRow key={index} index={index} guest={row} formData={formData} handleInputChange={handleInputChange} />
        ))}
      </div>
    </div>
  );
};

export default GuestList;

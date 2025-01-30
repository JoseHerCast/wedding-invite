import { useState } from "react";
import { getCookie } from "@/utils/cookieHandler"; // Para recuperar el teléfono guardado
import GuestVerificationForm from "@/components/GuestVerificationForm";
import RSVPConfirmation from "@/components/RSVPConfirmation";
import MapEmbed from "@/components/MapEmbed";
import 'tailwindcss/tailwind.css';

export default function Home() {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [guestData, setGuestData] = useState([]);
    const [formData, setFormData] = useState({}); // Estado para guardar selecciones

    // Manejar cambios en el formulario
    const handleInputChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [index]: { ...prev[index], [field]: value }
        }));
    };


    return (
        <div className="relative bg-cream-100 text-darkGreen-500 overflow-hidden">

            {/* Página 1 */}
            <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-cream-100">
                <h1 className="text-4xl md:text-5xl font-bold text-darkGreen-500 mb-4">
                    ¡Estamos listos para nuestro gran día!
                </h1>
                <p className="text-lg md:text-xl">
                    Nos encantaría que nos acompañaras a celebrar este momento tan especial en nuestras vidas.
                </p>
                <p className="text-lg md:text-xl mt-6">Desliza hacia abajo para más detalles.</p>
            </section>

            {/* Página 2 */}
            <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-sage-500">
                <h2 className="text-3xl md:text-4xl font-semibold text-cream-100 mb-4">
                    Detalles de la Boda
                </h2>
                <p className="text-lg md:text-xl text-cream-100">
                    <strong>Fecha:</strong> 15 de abril de 2025<br />
                    <strong>Hora:</strong> 5:00 PM<br />
                    <strong>Lugar:</strong> Jardines del Sol, Ciudad de México
                </p>
                <p className="text-lg md:text-xl mt-6 text-cream-100">
                    ¡Prepárate para disfrutar de una noche mágica llena de amor, música y sorpresas!
                </p>
            </section>

            {/* Página 3 */}
            <section className="h-auto flex flex-col items-center justify-center px-6 text-center bg-beige-500 py-10">
                <h2 className="text-3xl md:text-4xl font-semibold text-darkGreen-500 mb-4">
                    Confirma tu Asistencia
                </h2>

                {/* Verificar boletos */}
                {guestData.length > 0 && (
                    <div className="w-full max-w-2xl mt-8 mb-8">
                        <h2 className="text-lg font-semibold mb-2">
                            ¡Tienes {guestData.find(guest => guest["Titular"] === "TRUE")["Boletos"]} boletos!
                        </h2>

                        {(() => {
                            const boletos = parseInt(guestData.find(guest => guest["Titular"] === "TRUE")["Boletos"], 10) || 0;
                            const numRegistros = guestData.length;
                            const acompañantesFaltantes = boletos - numRegistros;

                            // Agregar acompañantes ficticios si faltan registros
                            const registrosCompletos = [...guestData];
                            for (let i = 1; i <= acompañantesFaltantes; i++) {
                                registrosCompletos.push({
                                    Nombre: `Acompañante ${i}`,
                                    Asistencia: "Pendiente",
                                    Edad: "Adulto",
                                });
                            }

                            return (
                                <div className="grid grid-cols-1 gap-2">
                                    {registrosCompletos.map((row, index) => {
                                        const esAcompañante = row.Nombre.includes("Acompañante");
                                        const noUsaBoleto = formData[index]?.NoUsaraBoleto === "Sí";

                                        return (
                                            <div key={index} className="grid grid-cols-3 gap-4 items-center border-b p-2">
                                                {/* Columna 1: Nombre fijo para acompañantes */}
                                                <span className="text-sm font-medium">{row.Nombre}</span>

                                                {/* Columna 2: Input para nombre de acompañante / Selector para invitados principales */}
                                                {esAcompañante ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Nombre del acompañante"
                                                        className="border border-gray-300 p-1 rounded-md w-full"
                                                        disabled={noUsaBoleto}
                                                        onChange={(e) => handleInputChange(index, "Nombre", e.target.value)}
                                                    />
                                                ) : (
                                                    <select
                                                        className="border border-gray-300 p-1 rounded-md"
                                                        defaultValue="" // Para mostrar "Selecciona una opción"
                                                        onChange={(e) => handleInputChange(index, "Asistencia", e.target.value)}
                                                    >
                                                        <option value="" disabled>Selecciona una opción</option>
                                                        <option value="Asistirá">Asistirá</option>
                                                        <option value="No Asistirá">No Asistirá</option>
                                                    </select>
                                                )}

                                                {/* Columna 3: Radios de Adulto/Niño (Para todos los invitados) */}
                                                <div className="flex justify-center gap-2">
                                                    <label className="flex items-center gap-1">
                                                        <input
                                                            type="radio"
                                                            name={`opcion-${index}`}
                                                            value="Adulto"
                                                            className="accent-green-500"
                                                            onChange={() => {
                                                                handleInputChange(index, "Edad", "Adulto");
                                                                handleInputChange(index, "NoUsaraBoleto", "No");
                                                            }}
                                                        />
                                                        <span className="text-sm">Adulto</span>
                                                    </label>
                                                    <label className="flex items-center gap-1">
                                                        <input
                                                            type="radio"
                                                            name={`opcion-${index}`}
                                                            value="Niño"
                                                            className="accent-blue-500"
                                                            onChange={() => {
                                                                handleInputChange(index, "Edad", "Niño");
                                                                handleInputChange(index, "NoUsaraBoleto", "No");
                                                            }}
                                                        />
                                                        <span className="text-sm">Niño</span>
                                                    </label>
                                                    {/* Solo los acompañantes pueden seleccionar "No usaré este boleto" */}
                                                    {esAcompañante && (
                                                        <label className="flex items-center gap-1">
                                                            <input
                                                                type="radio"
                                                                name={`opcion-${index}`}
                                                                value="Sí"
                                                                className="accent-red-500"
                                                                onChange={() => handleInputChange(index, "NoUsaraBoleto", "Sí")}
                                                            />
                                                            <span className="text-sm">No usaré este boleto</span>
                                                        </label>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </div>
                )}

                {!phoneNumber ? (
                    <GuestVerificationForm onVerify={setPhoneNumber} setGuestData={setGuestData} />
                ) : (
                    <RSVPConfirmation
                        phoneNumber={phoneNumber}
                        guestData={Object.values(formData).map((guest, index) => ({
                            ...guest,
                            Nombre: guest.Nombre || guestData[index]?.Nombre || "N/A", // Asegura que los invitados principales mantengan su nombre
                            Telefono: getCookie("guestPhone") || phoneNumber, // Recupera el teléfono desde la cookie
                        }))}
                    />
                )}
            </section>

            {/* Página 4 */}
            <section className="h-screen flex flex-col items-center justify-center px-6 text-center bg-cream-100">
                <h2 className="text-3xl md:text-4xl font-semibold text-darkGreen-500 mb-4">
                    ¿Cómo Llegar?
                </h2>
                <p className="text-lg md:text-xl text-darkGreen-500">
                    Encuentra la ubicación exacta de nuestro evento aquí:
                </p>
                <div className="mt-6">
                    <MapEmbed />
                </div>
            </section>
        </div>
    );
}

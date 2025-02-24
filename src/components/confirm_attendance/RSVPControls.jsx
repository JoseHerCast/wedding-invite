import { useState } from "react";
import RSVPConfirmation from "@/components/confirm_attendance/RSVPConfirmation";
import { getCookie } from "@/utils/cookieHandler";
import MyAlert from "@/components/MyAlert";

const RSVPControls = ({ guestData, formData, formRef, setGuestData }) => {
    const [isLoading, setIsLoading] = useState(false); // Estado para el loader
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState("info");

    const confirmAttendance = async (guestData) => {
        /* console.log("📤 Enviando datos de asistencia:", guestData); */
        setIsLoading(true); // Activar loader

        try {
            const res = await fetch("/api/confirmAttendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ guestData }),
            });

            /* console.log("📥 Respuesta recibida del servidor:", res); */

            const result = await res.json();
            /* console.log("📊 Resultado del JSON parseado:", result); */

            if (res.ok && result.success) {
                setAlertMessage("¡Confirmación registrada exitosamente!");
                setAlertType("success"); // Puede ser "success", "error" o "info"

                // Obtener la clave del invitado para hacer un nuevo fetch
                const guestKey = getCookie("guestKey");
                if (!guestKey) {
                    console.error("❌ No se encontró la clave de invitado después de la confirmación.");
                    setIsLoading(false);
                    return;
                }

                // Realizar fetch para actualizar guestData con la información más reciente
                /* console.log("🔄 Obteniendo información actualizada de invitados..."); */
                const updatedRes = await fetch("/api/fetchGuestDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ guestKey }),
                });

                const updatedData = await updatedRes.json();
                /* console.log("📊 Datos actualizados obtenidos:", updatedData); */

                if (updatedRes.ok && updatedData.success) {
                    setGuestData(updatedData.data); // Actualizar el estado con los datos más recientes
                } else {
                    console.warn("⚠️ No se pudo actualizar la lista de invitados:", updatedData);
                }
            } else {
                console.warn("⚠️ Error en la confirmación:", result);
                setAlertMessage("Error al registrar la confirmación.");
                setAlertType("error"); // Puede ser "success", "error" o "info"
            }
        } catch (error) {
            console.error("❌ Error en la solicitud de confirmación:", error);
            alert("");
            setAlertMessage("Hubo un problema al confirmar la asistencia.");
            setAlertType("error"); // Puede ser "success", "error" o "info"
        } finally {
            setIsLoading(false); // Desactivar loader después de la respuesta
        }
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        if (!formRef?.current) return;

        if (!formRef.current.checkValidity()) {
            formRef.current.reportValidity();
            return;
        }

        const formattedGuestData = Object.values(formData)
            .filter(guest => !(guest.EsAcompanante && guest.NoUsaraBoleto === "Sí"))
            .map((guest, index) => ({
                ...guest,
                Nombre: guest.Nombre || guestData[index]?.Nombre || "N/A",
                Clave: getCookie("guestKey"),
            }));

        confirmAttendance(formattedGuestData);
    };

    return (
        <>
            <RSVPConfirmation onConfirm={handleConfirm} isLoading={isLoading} />
            {/* // Llamar a MyAlert cuando haya un mensaje */}
            {alertMessage && (
                <MyAlert
                    type={alertType}
                    message={alertMessage}
                    onClose={() => setAlertMessage(null)}
                />
            )}
        </>
    );
};

export default RSVPControls;

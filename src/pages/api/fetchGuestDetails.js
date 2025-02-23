import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const GUEST_SHEET = "Invitados";
const CONFIRMED_SHEET = "Confirmados";

async function getSheetData(key) {
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await sheets.loadInfo();

    // Obtener la hoja de invitados
    const guestSheet = sheets.sheetsByTitle[GUEST_SHEET];
    if (!guestSheet) throw new Error(`No se encontró la hoja llamada "${GUEST_SHEET}"`);

    const guestRows = await guestSheet.getRows();

    // Filtrar todas las filas donde el número de teléfono coincida
    const guestData = guestRows
        .filter(row => row.get("Clave") === key)
        .map(row => row.toObject()); // Convertir cada fila en un objeto plano

    console.log("Guest DATA:", guestData)


    if (guestData.length===0) {
        console.warn("No se encontró información en 'Invitados'.");
        return null;
    }

    // Si el registro ya está confirmado, buscar en la hoja de "Confirmados"
    if (guestData[0]["Registro"] === "TRUE") {
        console.log("✅ Invitado ya registrado, buscando en 'Confirmados'.");

        const confirmedSheet = sheets.sheetsByTitle[CONFIRMED_SHEET];
        if (!confirmedSheet) throw new Error(`No se encontró la hoja llamada "${CONFIRMED_SHEET}"`);

        const confirmedRows = await confirmedSheet.getRows();

        // Buscar en "Confirmados"
        const confirmedGuests = confirmedRows
            .filter(row => (row.get("Clave") === key) && (row.get("Asistencia")==="Asistirá"))
            .map(row => row.toObject());

        return confirmedGuests.length > 0 ? confirmedGuests : null;
    }

    // Si el invitado no está registrado aún, devolver su información desde "Invitados"
    return guestData.length > 0 ? guestData : null;
}

export default async function handler(req, res) {
    console.log("BODY:", req.body)
    try {
        const { guestKey } = req.body; // Aseguramos que se extrae correctamente

        if (!guestKey) {
            console.error("🚨 guestKey no recibido en el servidor.");
            return res.status(400).json({ success: false, message: "Código no proporcionado." });
        }

        console.log("🔍 Código recibido en el backend:", guestKey); // Depuración

        const data = await getSheetData(guestKey);
        if (data) {
            res.status(200).json({ success: true, data });
        } else {
            res.status(404).json({ success: false, message: "Número no encontrado." });
        }
    } catch (error) {
        console.error("❌ Error al procesar la solicitud:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
}

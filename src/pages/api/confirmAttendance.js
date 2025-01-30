import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_NAME = "Confirmados"; // Hoja donde se guardarán los datos confirmados

async function saveConfirmationData(guestData) {
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await sheets.loadInfo();

    const confirmadosSheet = sheets.sheetsByTitle[SHEET_NAME];

    if (!confirmadosSheet) {
        throw new Error(`No se encontró la hoja llamada "${SHEET_NAME}"`);
    }

    // Registrar cada invitado y acompañante en una fila nueva
    for (const guest of guestData) {
        console.log("📝 Registrando en Google Sheets:", guest);
        await confirmadosSheet.addRow({
            Nombre: guest.Nombre || "N/A", // Asegura que el nombre siempre esté presente
            Telefono: guest.Telefono || "N/A",
            Asistencia: guest.Asistencia || "Pendiente",
            Edad: guest.Edad || "Adulto",
            NoUsaraBoleto: guest.NoUsaraBoleto === "Sí" ? "No usará boleto" : "Sí usará boleto"
        });
    }
    
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    try {
        const { guestData } = req.body;

        console.log("📥 Recibiendo datos en API con teléfono:", guestData);

        if (!guestData || !Array.isArray(guestData)) {
            return res.status(400).json({ success: false, message: "Datos inválidos." });
        }

        await saveConfirmationData(guestData);
        res.status(200).json({ success: true, message: "Confirmación guardada en Google Sheets" });
    } catch (error) {
        console.error("❌ Error al guardar confirmación:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
}

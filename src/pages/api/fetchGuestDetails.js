import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_NAME = "Invitados"; // Nombre de la hoja.

async function getSheetData(phoneNumber) {
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await sheets.loadInfo();

    const firstSheet = sheets.sheetsByIndex[0]; // Obtiene la primera hoja
    const rows = await firstSheet.getRows();

    // Filtrar todas las filas donde el número de teléfono coincida
    const matchingRows = rows
        .filter(row => row.get("Tel") === phoneNumber)
        .map(row => row.toObject()); // Convertir cada fila en un objeto plano

    return matchingRows.length > 0 ? matchingRows : null;
}

export default async function handler(req, res) {
    const { phoneNumber } = req.body;
    console.log("Número de teléfono recibido para búsqueda:", phoneNumber);

    try {
        const data = await getSheetData(phoneNumber);
        if (data) {
            res.status(200).json({ success: true, data });
        } else {
            res.status(404).json({ success: false, message: "Número no encontrado." });
        }
    } catch (error) {
        console.error("Error al consultar la hoja de cálculo:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
}

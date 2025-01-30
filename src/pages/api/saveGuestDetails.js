export default async function handler(req, res) {
    const { phoneNumber } = JSON.parse(req.body);
    // Lógica para guardar el número en una base de datos.
    res.status(200).json({ success: true });
  }
  
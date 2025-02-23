const GuestRow = ({ index, guest, formData, handleInputChange }) => {
    const esAcompanante = guest.EsAcompanante;
    const noUsaBoleto = formData[index]?.NoUsaraBoleto === "Sí";

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center border-b border-oldGold-500 p-2 text-oldGold-500">
        {/* Nombre del invitado */}
        <span className="text-md text-white font-medium italic">{guest.Nombre}</span>

        {/* Input para nombre si es acompañante */}
        {esAcompanante ? (
          <input
          type="text"
          placeholder="Nombre del acompañante"
          className="border border-oldGold-300 p-1 rounded-md w-full"
          disabled={noUsaBoleto}
          required={!noUsaBoleto} // Hace que el input sea obligatorio si no está deshabilitado
          pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]+" // Permite solo letras y espacios
          title="Solo se permiten letras y espacios"
          onInput={(e) => e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, "")}
          onChange={(e) => handleInputChange(index, "Nombre", e.target.value)}
      />
        ) : (
          <select
            className="border border-oldGold-300 p-1 rounded-md"
            defaultValue=""
            required // Hace que el select sea obligatorio
            onChange={(e) => handleInputChange(index, "Asistencia", e.target.value)}
          >
            <option value="" disabled>Selecciona una opción</option>
            <option value="Asistirá">Asistirá</option>
            <option value="No Asistirá">No Asistirá</option>
          </select>
        )}

        {/* Radios de Adulto/Niño y "No usaré boleto" */}
        <div className="flex justify-center gap-2 text-white">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name={`opcion-${index}`}
              value="Adulto"
              className="accent-oldGold-500"
              required // Hace que los radios sean obligatorios
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
              className="accent-oldGold-500"
              required // Hace que los radios sean obligatorios
              onChange={() => {
                handleInputChange(index, "Edad", "Niño");
                handleInputChange(index, "NoUsaraBoleto", "No");
              }}
            />
            <span className="text-sm">Niño</span>
          </label>
          {esAcompanante && (
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name={`opcion-${index}`}
                value="Sí"
                className="accent-red-500"
                required // Hace que los radios sean obligatorios
                onChange={() => handleInputChange(index, "NoUsaraBoleto", "Sí")}
              />
              <span className="text-sm">No usaré este boleto</span>
            </label>
          )}
        </div>

        {/* Campo oculto para indicar si es acompañante */}
        <input type="hidden" name={`EsAcompanante-${index}`} value={guest.EsAcompanante} />
      </div>
    );
  };

export default GuestRow;

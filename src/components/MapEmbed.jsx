const MapEmbed = () => (
  <div className="w-full max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-xl border border-gray-200 p-4">
    <iframe
      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.414107415479!2d-98.94024582130574!3d19.610748380029676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1eeb9986e944d%3A0x6644e07fe7d2f559!2sParroquia%20de%20Santa%20Mar%C3%ADa%20Magdalena%20de%20Tepexpan!5e0!3m2!1ses-419!2smx!4v1738113244789!5m2!1ses-419!2smx"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
);

export default MapEmbed;


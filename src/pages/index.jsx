import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GuestVerificationForm from "@/components/confirm_attendance/GuestVerificationForm";
import ConfirmAttendanceSection from "@/components/confirm_attendance/ConfirmAttendanceSection";
import BottomSheet from "@/components/BottomSheet";
import Carousel from "@/components/Carousel";
import 'tailwindcss/tailwind.css';
import { Great_Vibes, Playfair_Display } from 'next/font/google'
import Image from "next/image";

const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: '--font-greatVibes'
})

const playfairDisplay = Playfair_Display({
    weight: "400",
    subsets: ["latin"],
    variable: '--font-playfairDisplay'
})


export default function Home() {
    const [showShadow, setShowShadow] = useState(false); // Estado para la sombra parpadeante
    const [isPlaying, setIsPlaying] = useState(true); // Estado para controlar la música
    const [guestData, setGuestData] = useState([]);
    const [formData, setFormData] = useState({}); // Estado para guardar selecciones
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenGifts, setIsOpenGifts] = useState(false);
    const confirmRef = useRef(null);
    const audioRef = useRef(null);

    const images = [
        "/assets/gallery/carrusel1.jpg",
        "/assets/gallery/carrusel2.jpg",
        "/assets/gallery/carrusel3.jpg",
        "/assets/gallery/carrusel4.jpg",
        "/assets/gallery/carrusel5.jpg",
        "/assets/gallery/carrusel6.jpg",
        "/assets/gallery/carrusel7.jpg",
        "/assets/gallery/carrusel8.jpg",
      ];

    // Si ya hay datos del invitado, la página se desbloquea
    const isUnlocked = guestData.length > 0;

    useEffect(() => {
        if (isUnlocked && audioRef.current) {
            const audio = audioRef.current;
            audio.volume = 0.1; // Inicia con volumen bajo
            audio.play().catch(error => {
                console.error("Error reproduciendo la música:", error);
            });

            // Suavemente aumentar el volumen a 1 en 5 segundos
            let volume = 0.1;
            const interval = setInterval(() => {
                if (volume < 1.0) {
                    volume += 0.1;
                    audio.volume = Math.min(volume, 1.0);
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        }
    }, [isUnlocked]);

    useEffect(() => {
        if (isUnlocked) {
            let blink = true;
            setShowShadow(true); // Inicia con sombra visible

            const interval = setInterval(() => {
                setShowShadow(blink);
                blink = !blink; // Alternar entre true y false para el parpadeo
            }, 1000); // Parpadeo cada 1s

            // Detener el parpadeo después de 5 segundos
            setTimeout(() => {
                clearInterval(interval);
                setShowShadow(false); // Asegurar que la sombra desaparezca
            }, 7000);

            return () => clearInterval(interval); // Limpieza en caso de desmontaje
        }
    }, [isUnlocked]);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    const scrollToConfirm = (event) => {
        event.preventDefault();
        if (confirmRef.current) {
            confirmRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };



    useEffect(() => {
        if (guestData.length === 0) return;

        const titular = guestData.find(guest => guest["Titular"] === "TRUE");
        if (!titular || !titular["Boletos"]) return;

        const boletos = parseInt(titular["Boletos"], 10) || 0;
        const numRegistros = guestData.length;
        const acompañantesFaltantes = boletos - numRegistros;

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

        const initialFormData = {};
        registrosCompletos.forEach((guest, index) => {
            initialFormData[index] = { ...guest };
        });

        setFormData(initialFormData);
    }, [guestData]);



    // Manejar cambios en el formulario
    const handleInputChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: value,
                EsAcompanante: prev[index]?.EsAcompanante || false // Mantener el valor original
            }
        }));
    };



    return (
        <div className={`${playfairDisplay.variable} ${greatVibes.variable} font-playfairDisplay relative bg-cream-100 text-darkGreen-500 overflow-hidden`}>
            <audio ref={audioRef} loop preload="auto">
                <source src="/assets/song.mp3" type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
            </audio>

            {isUnlocked && (
                <button
                    onClick={toggleMusic}
                    className={`z-[9999] absolute top-16 right-4 p-3 rounded-full transition-all duration-1000 ${showShadow
                        ? "shadow-[0_0_10px_2px_rgba(255,255,255,0.6),_inset_0_0_8px_rgba(255,255,255,0.5)]"
                        : "shadow-none"
                        }`}
                >
                    <Image
                        className={`${isPlaying ? 'opacity-100' : 'opacity-40'} w-6`}
                        src="/assets/icons/musical_beige.png"
                        alt=""
                        priority
                    />
                </button>
            )}

            {!isUnlocked ? (
                <div className="h-svh flex items-center justify-center">
                    <div className="h-screen flex items-center justify-center">
                        <GuestVerificationForm setGuestData={setGuestData} />
                    </div>
                </div>
            ) : (
                <>
                    {/* Página 1 */}
                    <section className="relative z-0 h-[76vh] lg:h-screen flex flex-col items-center justify-center px-6 text-center 
    bg-[url('/assets/boda_alt.jpeg')] bg-[right_72%_top_5%] bg-[220%_auto] sm:bg-[160%_auto] md:bg-[130%_auto] lg:bg-[100%_auto]">
                        <p className="w-full absolute px-6 top-8 italic text-xs lg:text-xl text-beige-500">
                            <q>El amor es paciente, es bondadoso... Todo lo soporta, Todo lo espera. ( <cite>I Corintios 13:4-7</cite> )</q>
                        </p>


                    </section>

                    {/* Página 2 */}
                    <section className="relative z-0 flex-col text-center pb-10 bg-darkGreen-500 -mt-14 lg:-mt-32">
                        <div className="absolute w-full h-32 lg:top-[18%] flex flex-col items-center justify-cente mt-10">
                            <h1 className="font-greatVibes text-beige-500 text-5xl
                    drop-shadow-[2px_2px_3px_#846008FF] 
                    ">José y Carla</h1>
                            <p className="text-beige-500 text-base mt-1 drop-shadow-[2px_2px_3px_#846008FF] ">17 de Mayo 2025</p>
                            <button
                                onClick={scrollToConfirm}
                                className="px-3 py-1 text-white bg-transparent"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                                    className="mt-1 text-2xl"
                                >
                                    <Image priority className="w-6" src="/assets/icons/chevron_1_sage.png" alt="" />
                                </motion.div>
                            </button>
                        </div>
                        <span className="inline-block w-full h-[150px] overflow-y-hidden mb-4 bg-[url('/assets/background_wood.png')]"><Image className="" src="/assets/background_wood.png" alt="" priority /></span>
                        {/* Contenido con un z-index mayor para que esté sobre la imagen */}
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="w-full text-4xl mt-4 px-6 lg:text-xl text-beige-500 font-greatVibes">
                                Nuestra Boda
                            </h1>
                            <Image priority className="w-1/2" src="/assets/icons/flourish_beige.png" alt="" />
                        </div>
                        <p className="w-full mt-4 px-6 text-sm lg:text-xl text-sage-500">
                            Con la bendición de nuestros padres:
                        </p>
                        <div className="flex px-6 pt-3 justify-between text-sm italic">
                            <div>
                                <p className="w-full lg:text-xl font-semibold text-beige-500">
                                    Elvira Flores Ramírez
                                </p>
                                <p className="w-full lg:text-xl font-semibold text-beige-500">
                                    Carlos Garzón Ceballos
                                </p>
                            </div>
                            <div>
                                <p className="w-full lg:text-xl font-semibold text-beige-500">
                                    Leticia Castro Rosas
                                </p>
                                <p className="w-full lg:text-xl font-semibold text-beige-500">
                                    Jesús Hernández López
                                </p>
                            </div>
                        </div>
                        <p className="w-full mt-6 px-6 text-sm lg:text-xl text-sage-500">
                            Nos llena de alegría invitarte a compartir con nosotros este día tan especial.
                        </p>
                        <p className="w-full px-6 text-sm lg:text-xl text-sage-500">
                            Será un momento lleno de fe, amor y gratitud, donde celebraremos nuestra unión rodeados de quienes más queremos.
                        </p>
                        <p className="w-full px-6 mt-6 text-sm lg:text-xl font-semibold text-beige-500">
                            ¡TU PRESENCIA HARÁ QUE ESTE DÍA SEA INOLVIDABLE!
                        </p>
                    </section>

                    {/* Página 3 */}
                    <section className="flex flex-col items-center justify-center px-3 py-4 text-center bg-cream-100 text-oldGold-500">
                        <p className="w-full mt-6 text-base lg:text-xl font-semibold">
                            Detalles de la celebración
                        </p>
                        <div className="flex justify-between gap-6">
                            <div className="flex flex-col gap-2 justify-center">
                                <p className="text-6xl">17</p>
                                <p className="text-lg">MAYO</p>
                            </div>
                            <div className="flex flex-col justify-center mt-3">
                                <p className="text-lg">SÁBADO</p>
                                <p className="text-2xl font-greatVibes">14:00 hrs</p>
                            </div>
                        </div>
                        <a
                            href="https://maps.app.goo.gl/AA35o1x4hL8hvTaa9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2"
                        >
                            <Image priority src="/assets/icons/cathedral.png" alt="Icono de una catedral" />
                        </a>

                        <p className="w-full mt-6 text-2xl font-semibold lg:text-xl font-greatVibes text-oldGold-500">
                            Parroquia de Santa María Magdalena
                        </p>
                        <p className="w-full mt-2 text-xs lg:text-xl font-semibold text-oldGold-500">
                            Manzana 025, Tepexpan Centro, 55885, Méx.
                        </p>
                        <p className="w-full mt-6 text-base lg:text-xl font-semibold text-oldGold-500">
                            DESPUÉS DE LA CEREMONIA RELIGIOSA, AGRADECEMOS TU PRESENCIA EN:
                        </p>
                        <span className="inline-block mt-6"><Image priority src="/assets/icons/cheers.png" alt="Icono de una catedral" /></span>
                        <p className="w-full mt-6 text-2xl lg:text-xl font-semibold text-oldGold-500 font-greatVibes">
                            Jardín Privado
                        </p>
                        <p className="w-full mt-2 text-xs lg:text-xl font-semibold text-oldGold-500">
                            Santa Catarina, Acolman, 55875
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div onClick={() => setIsOpen(true)} className="flex flex-col">
                                <div className="flex mt-8 btn justify-center">
                                    <span className="w-10 content-center"><Image priority src="/assets/icons/suit_golden.png" alt="Icono de un traje" /></span>
                                    <span className="w-10 content-center"><Image priority src="/assets/icons/dress.png" alt="Icono de un vestido" /></span>
                                </div>
                                <p className="text-center cursor-pointer px-2 py-2 rounded-lg shadow-md hover:shadow-lg active:shadow-none transition-all active:scale-95">Dress Code</p>
                            </div>

                            <div onClick={() => setIsOpenGifts(true)} className="flex flex-col items-center">
                                <span className="w-16 content-center pt-9"><Image priority src="/assets/icons/gifts.png" alt="" /></span>
                                <p className="text-center cursor-pointer px-2 py-2 rounded-lg shadow-md hover:shadow-lg active:shadow-none transition-all active:scale-95">Mesa de regalos</p>
                            </div>
                        </div>
                    </section>

                    {/* Confirmar asistencia */}
                    <ConfirmAttendanceSection
                        confirmRef={confirmRef}
                        guestData={guestData}
                        formData={formData}
                        setGuestData={setGuestData}
                        handleInputChange={handleInputChange}
                    />

                    <Carousel images={images}/>



                    {/* Dresscode */}
                    <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <div className="flex flex-col mb-4 items-center justify-center text-sage-500">
                            <div className="flex mb-2">
                                <span className="w-14 content-center">
                                    <Image priority src="/assets/icons/suit_golden.png" alt="Icono de un traje" />
                                </span>
                                <span className="w-14 content-center">
                                    <Image priority src="/assets/icons/dress.png" alt="Icono de un vestido" />
                                </span>
                            </div>
                            <p className="w-full px-2 text-2xl lg:text-xl font-greatVibes">
                                Queremos que este día sea tan
                            </p>
                            <p className="w-full px-2 text-2xl lg:text-xl font-greatVibes">
                                especial como ustedes.
                            </p>
                            <p className="w-full mt-6 px-2 text-sm lg:text-xl text-oldGold-500">
                                <strong className="text-oldGold-500">Mujeres</strong>, las esperamos hermosas y radiantes como siempre.
                            </p>
                            <p className="w-full mt-2 px-2 text-sm lg:text-xl text-oldGold-500">
                                <strong className="text-oldGold-500">Hombres</strong>, apuestos y con el estilo que los caracteriza.
                            </p>
                            <p className="w-full mt-6 px-6 text-sm lg:text-xl">
                                La boda será en un jardín, no estableceremos un código de etiqueta, pero les pedimos <strong>evitar los colores blanco, beige, verde y dorado.</strong>
                            </p>
                            <div className="flex my-8 gap-2">
                                <span className="w-10 h-10 inline-block rounded-full border-2 bg-cream-100 border-oldGold-500"></span>
                                <span className="w-10 h-10 inline-block rounded-full border-2 bg-beige-500 border-oldGold-500"></span>
                                <span className="w-10 h-10 inline-block rounded-full border-2 bg-sage-500 border-oldGold-500"></span>
                                <span className="w-10 h-10 inline-block rounded-full border-2 bg-oldGold-500 border-oldGold-500"></span>
                            </div>
                            <p className="w-full -mt-1 px-6 text-sm lg:text-xl">
                                Lo más importante es que nos acompañen, se sientan cómodos y estén listos para bailar y disfrutar mucho.
                            </p>
                        </div>
                    </BottomSheet>

                    {/* Regalos */}
                    <BottomSheet isOpen={isOpenGifts} onClose={() => setIsOpenGifts(false)}>
                        <div className="flex flex-col items-center justify-center">
                            <span className="w-16 content-center mb-2"><Image priority src="/assets/icons/gifts.png" alt="" /></span>

                            <p className="w-full mt-2 px-3 text-2xl lg:text-xl text-sage-500 font-greatVibes">
                                Tu presencia es el mejor regalo:
                            </p>
                            <p className="w-full px-6 text-sm lg:text-xl text-sage-500">
                                Si deseas acompañarnos con un detalle, te dejamos dos opciones pensadas con cariño para nuestra nueva etapa.
                            </p>
                            <Image priority className="w-10 mt-6" src="/assets/icons/envelope.png" alt="" />
                            <p className="w-full mt-1 px-6 text-sm lg:text-xl font-semibold text-sage-500">
                                Dinero en Sobre Cerrado
                            </p>
                            <p className="w-full mt-2 px-6 text-sm lg:text-xl text-sage-500">
                                Una tradición que simboliza prosperidad y buenos deseos. Puedes entregarlo en un sobre cerrado.
                            </p>
                            <a className="w-10 mt-8" href="https://mesaderegalos.liverpool.com.mx/milistaderegalos/51451740" target="_blank">
                                <Image priority className="w-full" src="/assets/icons/Liverpool.png" alt="" />
                            </a>
                            <p className="w-full text-sm lg:text-xl font-semibold text-oldGold-500">
                                51451740
                            </p>
                            <p className="w-full mt-2 px-6 text-sm lg:text-xl font-semibold text-sage-500">
                                Mesa de Regalos en Liverpool
                            </p>
                            <p className="w-full mt-2 px-6 text-sm lg:text-xl text-sage-500">
                                Hemos seleccionado artículos que serán parte de nuestro nuevo hogar. Esta opción nos ayuda a recibir obsequios especiales sin duplicados y de forma práctica.
                            </p>
                        </div>
                    </BottomSheet>
                </>
            )}
        </div>
    );
}

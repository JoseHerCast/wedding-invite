import { motion } from "framer-motion";
import seedrandom from "seedrandom";

const FallingLeaves = () => {
    const rng = seedrandom("static-seed"); // Usar una semilla fija
    const leaves = Array.from({ length: 15 });

    return (
        <div className="absolute inset-0 pointer-events-none">
            {leaves.map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute w-10 h-10 bg-green-500 rounded-full"
                    style={{
                        top: `${rng() * 100}vh`,
                        left: `${rng() * 100}vw`,
                    }}
                    animate={{
                        y: ["-10vh", "110vh"],
                        x: ["0vw", `${rng() * 10 - 5}vw`],
                    }}
                    transition={{
                        duration: 8 + rng() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default FallingLeaves;

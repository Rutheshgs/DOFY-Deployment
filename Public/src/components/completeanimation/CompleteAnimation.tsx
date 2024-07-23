import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

function CompleteAnimation() {

    const customInit = async (engine: Engine): Promise<void> => {
        await loadConfettiPreset(engine);
    }

    const options = {
        emitters: [
            {
                life: {
                    duration: 5,
                    count: 3,
                },
                position: {
                    x: 30,
                    y: 30,
                },
                particles: {
                    move: {
                        direction: "top-right",
                    },
                },
            },
            {
                life: {
                    duration: 5,
                    count: 3,
                },
                position: {
                    x: 60,
                    y: 30,
                },
                particles: {
                    move: {
                        direction: "top-left",
                    },
                },
            },
        ],
        preset: "confetti",
    };

    return (
        <Particles options={options} init={customInit} />
    )
}

export default CompleteAnimation
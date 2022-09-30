import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const Background = () => {

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);

    return (
        <Particles
            className="absolute "
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {

                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: ["push", "remove"],
                        },
                        onHover: {
                            enable: true,
                            mode: ["grab"],
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 4,
                        },
                        grab: {
                            distance: 100,
                            line_linked: {
                                opacity: 0.8
                            }
                        },
                        remove: {
                            quantity: 4
                        }
                    },
                },
                particles: {
                    color: {
                        value: "#91b9ea",
                    },
                    links: {
                        color: "#0364d2",
                        distance: 140,
                        enable: true,
                        opacity: 0.4,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        directions: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: {min : 1, max: 2},
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 1000,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                            type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default Background;


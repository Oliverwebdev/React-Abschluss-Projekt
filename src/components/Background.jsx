import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const Background = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#000000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "repulse",
                        },
                        onHover: {
                            enable: true,
                            mode: "slow",
                        },
                        resize: true,
                    },
                    modes: {
                        repulse: {
                            distance: 220,
                            
                            duration: 0.4,
                            speed: 1,


                        },
                        slow: {
                            distance: 10,
                            duration: 1,
                            speed: 2,

                        },
                    },
                },
                particles: {
                    color: {
                      value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"], // Hier kannst du weitere Farben hinzufügen
                     },
                    links: {
                        color: "#ffffff",
                        distance: 100,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 4,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 100,
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
                    shadow: { 
                      enable: true,
                      blur: 10,
                      value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"], // Hier kannst du weitere Farben hinzufügen
                  },

                },
                detectRetina: true, 
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -1, // Hier wird der z-index auf -1 gesetzt
            }}
        />
    );
}; export default Background;
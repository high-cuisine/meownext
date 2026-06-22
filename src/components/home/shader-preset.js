export const HOME_SHADER_PRESET = {
  components: [
    {
      type: "Swirl",
      id: "idmopuqc7pml2j3z58j",
      props: {
        colorA: "#000000",
        colorB: "#0a0a0a",
        detail: 1.7,
      },
    },
    {
      type: "ChromaFlow",
      id: "idmopucfslad9zri29r",
      props: {
        baseColor: "#18181a",
        downColor: "#C20F36",
        intensity: 0.9,
        leftColor: "#99112e",
        momentum: 12,
        radius: 2.3,
        rightColor: "#99112e",
        upColor: "#FF1447",
      },
    },
    {
      type: "FlutedGlass",
      id: "idmopubojpm8gm5raws",
      props: {
        aberration: 0.6,
        frequency: 12,
        highlight: 0.12,
        highlightSoftness: 0,
        lightAngle: -90,
        refraction: 4,
        shape: "rounded",
        softness: 1,
        speed: 0.15,
      },
    },
    {
      type: "FilmGrain",
      id: "idmopv498snizgmx7xn",
      props: {
        strength: 0.05,
      },
    },
  ],
};

export const CONTACT_SHADER_PRESET = {
  components: HOME_SHADER_PRESET.components
    .filter((component) => component.type !== "FlutedGlass")
    .map((component) => ({
      ...component,
      id: `contact-${component.id}`,
    })),
};

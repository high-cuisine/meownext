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
  components: [
    ...HOME_SHADER_PRESET.components
      .filter((component) => component.type !== "FlutedGlass")
      .map((component) => ({
        ...component,
        id: `contact-${component.id}`,
      })),
    {
      type: "Chevron",
      id: "contact-chevron-pattern",
      props: {
        blendMode: "overlay",
        opacity: 0.5,
        colorA: "#000000",
        colorB: "#292929",
        count: 10,
        angle: 45,
        balance: 0.5,
        softness: 0.2,
        speed: 0,
        offset: 0,
        colorSpace: "linear",
      },
    },
  ],
};

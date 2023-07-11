const config = {
    content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            white: "#ffffff",
            yellow: {
                100: "#FFF8EC",
                200: "#FEF1DB",
                300: "#FFE3B4",
                400: "#FDD58B",
                500: "#FDC65F",
                600: "#FAB82E",
                700: "#f9a823",
                800: "#f69112",
                900: "#f37e0d",
            },
            orange: {
                100: "#FDE6D2",
                200: "#FBCCA4",
                300: "#F8B176",
                400: "#F39646",
                500: "#ED7817",
            },
            red: {
                200: "#FCDBCB",
                400: "#F7B296",
                600: "#F18863",
                800: "#EB5835",
                1000: "#E32112",
            },
            violet: {
                200: "#E3D2E6",
                400: "#C7A6CD",
                600: "#B47DB6",
                800: "#8E4D9B",
                1000: "#722082",
            },
            vinous: {
                200: "#DECCDB",
                400: "#BD99B7",
                600: "#A46B96",
                800: "#7B336F",
                1000: "#5A004B",
            },
            purple: {
                200: "#DECCDB",
                400: "#BD99B7",
                600: "#A46B96",
                800: "#7B336F",
                1000: "#5A004B",
            },
            gray_green: {
                100: "#e8eaea",
                200: "#D9DCDC",
                300: "#B3B9B9",
                400: "#8D9595",
                500: "#677272",
                600: "#414F4F",
                700: "#3b4848",
                800: "#323f3f",
                900: "#2a3636",
                1000: "#1c2626",
            },
            green: {
                200: "#DBE9D9",
                400: "#B7D2B3",
                600: "#92BC8C",
                800: "#6EA566",
                1000: "#4A8F40",
            },
            gray: {
                0: "#FFFFFF",
                20: "#FAFAFA",
                40: "#F4F4F4",
                60: "#EFEFEF",
                80: "#EAEAEA",
                100: "#E5E5E5",
                150: "#D8D8D8",
                200: "#CCCCCC",
                300: "#BEBEBF",
                400: "#B1B1B2",
                500: "#9B9B9C",
                600: "#868686",
                700: "#6E6E6D",
                800: "#565655",
                840: "#444444",
                900: "#2B2B2A",
                1000: "#000000",
            },
            blue: {
                100: "#EFF2F6",
                200: "#CED7E7",
                300: "#B6C2D4",
                400: "#9EADC5",
                500: "#859BBF",
                600: "#7086A9",
                700: "#5E769C",
                800: "#54698B",
                900: "#4B5D7C",
                1000: "#43536E",
            },
            // ...
        },
        screens: {
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            "xl": { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            "lg": { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            "md": { max: "767px" },
            // => @media (max-width: 767px) { ... }

            "sm": { max: "576px" },
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            fontFamily: {
                sans: ["GT Eesti Pro Text"],
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};

module.exports = config;

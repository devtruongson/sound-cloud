import { createContext } from "react";
import { themeLightDefault } from "./theme";

const configTheme: {
    currentTheme: { mode: string; currentTheme: any };
    changeTheme: () => any;
} = {
    currentTheme: {
        mode: "light",
        currentTheme: themeLightDefault,
    },
    changeTheme: () => "",
};
export const ThemeContext = createContext(configTheme);

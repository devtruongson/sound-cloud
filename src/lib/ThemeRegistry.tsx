"use client";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import { ThemeContext } from "./theme/ThemContext";
import { themeLightDefault } from "./theme/theme";

export default function ThemeRegistry(props: any) {
    const { options, children } = props;

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    const [themeProviderValue, setThemeProviderValue] = useState({
        currentTheme: themeLightDefault,
        mode: "light",
    });

    return (
        <CacheProvider value={cache}>
            <ThemeContext.Provider
                value={{
                    currentTheme: {
                        mode: themeProviderValue.mode,
                        currentTheme: themeProviderValue.currentTheme,
                    },
                    changeTheme() {
                        return setThemeProviderValue;
                    },
                }}
            >
                <ThemeProvider theme={themeProviderValue.currentTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </ThemeContext.Provider>
        </CacheProvider>
    );
}

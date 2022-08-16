import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <SessionProvider session={session}>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import { classname } from "@/utils/classname";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <main className={classname(
        inter.className,
        'flex flex-col gap-10 min-h-screen min-w-full items-center justify-center py-10 lg:py-0',
      )}>
        <Component {...pageProps} />
      </main>
    </NextUIProvider>
  );
}

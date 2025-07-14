import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import { classname } from "@/utils/classname";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <main className={classname(
          inter.className,
          'flex flex-col gap-10 min-h-screen min-w-full items-center justify-center py-10 lg:py-0',
        )}>
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

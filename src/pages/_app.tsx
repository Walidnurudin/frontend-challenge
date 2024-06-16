import "@/styles/globals.css";
import type { AppProps } from "next/app";
import BasicLayout from "@/layouts/BasicLayout";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="top-right" />
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </>
  );
}

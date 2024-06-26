import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Provider } from 'react-redux';
import { store } from "@/redux/store";
import { ReduxProvider } from "@/redux/provider";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>     
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </Provider>
  )
}

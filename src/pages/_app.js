// external libraries
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/main.scss";
import StoreProvider from "@/redux/StoreProvider";
import MainLayout from "@/layouts/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </StoreProvider>
  );
}

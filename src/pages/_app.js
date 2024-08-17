// external libraries
import "swiper/css";
import "swiper/css/pagination";
// import "antd/dist/antd.css";

// import "@/styles/globals.css";
import "@/styles/main.scss";
import StoreProvider from "@/redux/StoreProvider";
import MainLayout from "@/layouts/MainLayout";

const theme = {

};

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <MainLayout>
        {/* <ConfigProvider theme={theme}> */}
        <Component {...pageProps} />
        {/* </ConfigProvider> */}
      </MainLayout>
    </StoreProvider>
  );
}

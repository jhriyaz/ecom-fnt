// external libraries
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/main.scss";
import StoreProvider from "@/redux/StoreProvider";
import MainLayout from "@/layouts/MainLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";


export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </GoogleOAuthProvider>
    </StoreProvider>
  );
}

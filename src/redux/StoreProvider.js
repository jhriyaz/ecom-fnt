import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { verifyUser } from "./features/user/userAsyncActions";
import { fetchCategories } from "./features/general/generalAsyncAction";
import { Oval } from "react-loader-spinner";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { notificationFunc } from "@/components/global/notification";
import { useRouter } from "next/router";

export default function StoreProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const Router = useRouter()


  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));

    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');

    if (idToken) {
      console.log(idToken)
      axiosInstance.post('/user/googleauth', { tokenId: idToken })
        .then(res => {
          console.log(res)
          Cookies.set("myshop_auth2", res.data.token);
          notificationFunc("success", "Logged in successfully")
          window.location.pathname = '/'
        })
        .catch(err => {
          notificationFunc("error", "failed to login.Please try again later")
          console.log(err)
          Router.push('/auth/register')
        })
    }
  }, []);


  useEffect(() => {
    //dispatch the user and handle the loading state
    store
      .dispatch(verifyUser())
      .then((result) => {
        if (verifyUser.fulfilled.match(result)) {
          setLoading(false);
          Router.push('/')
        } else {
          setLoading(false);
          Router.push('/')
        }
      })
      .catch((err) => {
        setLoading(false)
        Router.push('/')
      });

    // dispatch the category action
    store.dispatch(fetchCategories());

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="spinner">
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return <Provider store={store}>{children}</Provider>;
}

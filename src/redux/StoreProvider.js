import { Provider } from "react-redux";
import store from "./store";
import { useEffect, useState } from "react";
import { verifyUser } from "./features/user/userAsyncActions";
import { fetchCategories } from "./features/general/generalAsyncAction";
import { Oval } from "react-loader-spinner";

export default function StoreProvider({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //dispatch the user and handle the loading state
    store
      .dispatch(verifyUser())
      .then((result) => {
        if (verifyUser.fulfilled.match(result)) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => setLoading(false));

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

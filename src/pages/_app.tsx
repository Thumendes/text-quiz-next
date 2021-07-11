import "styles/utilities.css";
import "styles/base.css";
import "styles/components.css";

import AuthContextProvider from "context/AuthContext";
import LoaderContextProvider from "context/LoaderContext";

function MyApp({ Component, pageProps }) {
  return (
    <LoaderContextProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </LoaderContextProvider>
  );
}

export default MyApp;

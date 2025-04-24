
import { useEffect } from "react";
import { useRouter } from "next/router";
import logVisit from "../utils/logVisit";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Log the visit when the route changes
    const handleRouteChange = async (url) => {
      await logVisit(url);
    };

    // Log initial page load
    handleRouteChange(router.asPath);

    // Listen for route changes (client-side navigation)
    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up event listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
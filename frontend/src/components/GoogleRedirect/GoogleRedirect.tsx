import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/AuthContext";

export const GoogleRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { processAuth } = useContext(AuthContext);

  useEffect(() => {
    const handleRedirect = async () => {
      const searchParams = new URLSearchParams(location.search);
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      if (!accessToken || !refreshToken) {
        return navigate("/");
      }
      const res = await processAuth({
        accessToken,
        refreshToken,
      });
      if (res.isAuthorized) {
        navigate("/");
      }
    };
    handleRedirect();
  }, [location.search, navigate, processAuth]);

  return <h2>Please wait...</h2>;
};

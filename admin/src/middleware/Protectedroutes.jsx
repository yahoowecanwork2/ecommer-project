import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminApi } from "../apis/auth";
import { setAuth, setUser } from "../redux/userSlice";

function Protectedroutes({ children }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // check user subscription latest if false open bluss modal on top

  const checkAllow = async () => {
    try {
      const res = await adminApi.checkAllow();
      return res;
    } catch (error) {
      console.log("Allow check failed", error);
      return null;
    }
  };

  const getProfile = async () => {
    try {
      const res = await adminApi.profile();
      if (res?.success) {
        dispatch(setUser(res.user));
        dispatch(setAuth(true));

        // check allow after profile load
        const allowResponse = await checkAllow();
        console.log("Allow response:", allowResponse);
      } else {
        localStorage.removeItem("token");
        dispatch(setAuth(false));
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(setAuth(false));
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    if (auth) {
      setCheckingAuth(false);
      return;
    }

    if (token) {
      getProfile();
    } else {
      setCheckingAuth(false);
    }
  }, []);

  if (checkingAuth) {
    return null;
  }

  if (!token && !auth) {
    return <Navigate to="/login" replace />;
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protectedroutes;
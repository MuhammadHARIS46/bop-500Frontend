import { useEffect } from "react";
import { useDispatch } from "@/app/store";
import { useRouter } from "next/router";

import {
  setAuthIsLoading,
  setIsAuthenticated,
  setUserData,
} from "@/features/auth/authSlice";
import { useValidateUserTokenQuery } from "@/app/services/auth";

interface IProps {
  children: JSX.Element;
}

const AuthCheckWrapperComponent = ({ children }: IProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, isLoading } = useValidateUserTokenQuery(undefined);

  useEffect(() => {
    dispatch(setAuthIsLoading(isLoading));
    if (data) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUserData(data));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }, [router.pathname, data, isLoading]);

  return children;
};

export default AuthCheckWrapperComponent;

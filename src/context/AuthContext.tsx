import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  AuthContextType,
  CommonResponse,
  RegisterFormType,
  SignInParams,
  SignInResponse,
  SignInReturn,
} from "../types";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { User } from "@prisma/client";
import Router from "next/router";
import { useEffect } from "react";
import { useLoader } from "./LoaderContext";

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider: React.FC = ({ children }) => {
  const loader = useLoader();
  const [user, setUser] = useState<User | null>(null);
  const cookieKey = "quiz.token";

  useEffect(() => {
    const cookies = parseCookies();

    const token = cookies[cookieKey];

    if (token) setLoggedUser(token);
  }, []);

  async function setLoggedUser(token: string) {
    loader.open();
    const { data } = await axios.get<User>(`/api/users/${token}?token=true`);

    if (data) setUser(data);
    loader.close();
  }

  async function signIn(payload: SignInParams): Promise<SignInReturn> {
    loader.open();
    const { data } = await axios.post<SignInResponse>("/api/auth", payload);
    loader.close();

    if (!data.success) return { success: false, msg: data.msg };

    setCookie(undefined, cookieKey, data.token, {
      maxAge: 60 * 60 * 24, // 1 day
    });

    setUser(data.user);

    if (payload.redirect) Router.push(payload.redirect);

    return { success: true, msg: "Usuário logado!" };
  }

  async function signUp() {
    if (!user) return;

    destroyCookie(undefined, cookieKey);
    setUser(null);
  }

  async function register(form: RegisterFormType) {
    loader.open();

    const { data } = await axios.post<CommonResponse>(
      "/api/users/create",
      form
    );

    loader.close();
    return data;
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

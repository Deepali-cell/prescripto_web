import { Signup } from "../components/Signup";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { Login } from "../components/Login";

export const RegisterPage = () => {
  const [state, setstate] = useState("login");

  return <>{state === "signup" ? <Signup /> : <Login />}</>;
};

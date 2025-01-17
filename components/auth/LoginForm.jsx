"use client";
import { performLogin } from "@/app/actions";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginForm = () => {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const user = await performLogin(formData);
      if (user) {
        setAuth(user);
        router.push("/");
      } else {
        setError("Please provide credentail");
      }
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <>
      <div className="my-2 text-rose-600">{error}</div>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label for="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;

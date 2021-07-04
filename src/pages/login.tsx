import { ChangeEvent, FormEvent, useState } from "react";
import { FormGroup, Input, Title, Button } from "../lib/ui";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Head from "next/head";

const LoginPage = () => {
  const { signIn } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await signIn({ ...form, redirect: "/" });

    if (!response.success) setError(response.msg);
  }

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [target.name]: target.value });
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Title>Sign In</Title>

          {error && (
            <div className="p-4 rounded-md bg-red-500 text-white">{error}</div>
          )}

          <FormGroup>
            <label>Username</label>
            <Input
              name="username"
              value={form.username}
              placeholder="Email or Nickname"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <Input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </FormGroup>

          <Button>Sign In</Button>

          <Link href="/register">
            <a className="text-center">Create an account</a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

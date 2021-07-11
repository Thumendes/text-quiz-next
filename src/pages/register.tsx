import { ChangeEvent, FormEvent, useState } from "react";
import { FormGroup, Input, Title, Button } from "lib/ui";
import { useAuth } from "context/AuthContext";
import Link from "next/link";
import { RegisterFormType } from "../types";
import Head from "next/head";
const RegisterPage = () => {
  const { register, signIn } = useAuth();
  const [error, setError] = useState<string>(null);
  const [form, setForm] = useState<RegisterFormType>({
    email: "",
    name: "",
    nickname: "",
    password: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name) return setError("Name field is required");
    if (!form.email) return setError("E-mail field is required");
    if (!form.nickname) return setError("Nickname field is required");
    if (!form.password) return setError("Password field is required");

    const response = await register({ ...form });

    if (!response.success) return setError(response.msg);

    const responseSignIn = await signIn({
      username: form.email,
      password: form.password,
      redirect: "/",
    });

    if (!responseSignIn.success) return setError(responseSignIn.msg);
  }

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [target.name]: target.value });
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <Title>Sign Up</Title>
          {error && (
            <div className="p-4 rounded-md bg-red-500 text-white">{error}</div>
          )}

          <FormGroup>
            <label>Name</label>
            <Input
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>E-mail</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              placeholder="E-mail"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Nickname</label>
            <Input
              name="nickname"
              value={form.nickname}
              placeholder="Nickname"
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

          <Button>Sign Up</Button>

          <Link href="/login">
            <a className="text-center">Already have an account?</a>
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;

import { Quiz } from "@prisma/client";
import { GetServerSidePropsResult } from "next";
import { useAuth } from "../context/AuthContext";
import prisma from "../lib/prisma";
import toJSON from "../lib/toJson";
import { Title, Button } from "../lib/ui";
import Link from "next/link";
import Head from "next/head";

type PageProps = {
  quizes: Quiz[];
};

const Home: React.FC<PageProps> = () => {
  const { user, signUp } = useAuth();

  return (
    <>
      <Head>
        <title>{user ? user.nickname : "Home"}</title>
      </Head>
      <div className="w-screen h-screen flex items-center justify-center flex-col gap-8">
        <Title>Test Application</Title>

        {user && (
          <div>
            <p className="text-center mb-4">You are logged as</p>

            <table className="table-auto text-left">
              <tbody>
                <tr>
                  <th className="p-2">Name</th>
                  <td className="p-2">{user.name}</td>
                </tr>
                <tr>
                  <th className="p-2">Nickname</th>
                  <td className="p-2">{user.nickname}</td>
                </tr>
                <tr>
                  <th className="p-2">E-mail</th>
                  <td className="p-2">{user.email}</td>
                </tr>
                <tr>
                  <th className="p-2">Created At</th>
                  <td className="p-2">{user.createdAt}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-4">
          {user ? (
            <Button onClick={signUp}>Sign Out</Button>
          ) : (
            <Link href="/login">
              <a>
                <Button>Sign in</Button>
              </a>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

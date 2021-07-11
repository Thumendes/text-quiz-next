import { Quiz } from "@prisma/client";
import { useAuth } from "context/AuthContext";
import { Title, Button } from "lib/ui";
import Link from "next/link";
import Head from "next/head";
import Layout from "lib/ui/layout";

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

      <Layout>
        <div className="">
          <Title>Test Application</Title>

          {user && (
            <div>
              <p className="mb-4">You are logged as</p>

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
        </div>
      </Layout>
    </>
  );
};

export default Home;

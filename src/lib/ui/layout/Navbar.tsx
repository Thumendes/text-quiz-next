import { useAuth } from "context/AuthContext";
import Link from "next/link";
import { Button } from "..";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const { user, signUp } = useAuth();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-center dark:bg-gray-800 sticky top-0">
      <div className="max-w-6xl w-full flex justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <span className="font-bold text-2xl mr-2">QuizApp</span>
              <small className="text-gray-300">by Thumendess</small>
            </a>
          </Link>
        </div>

        <div className="hidden items-center md:flex">
          <ul className="flex space-x-4">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link href="/studio">
                    <a>Studio</a>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <a>Perfil</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="hidden md:flex items-center">
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

        <div className="flex md:hidden">
          <Button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </Button>
          <div className="relative">
            {menuOpen && (
              <div className="transition-all absolute right-0 top-10 p-3 shadow-md rounded-lg dark:bg-gray-700 backdrop-blur-lg backdrop-opacity-75">
                <ul className="w-[125px] flex flex-col space-y-2">
                  <li>
                    <Link href="/studio">
                      <a>Studio</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <a>Perfil</a>
                    </Link>
                  </li>
                  <li>
                    {user ? (
                      <Button onClick={signUp}>Sign Out</Button>
                    ) : (
                      <Link href="/login">
                        <a>
                          <Button className="w-full">Sign in</Button>
                        </a>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

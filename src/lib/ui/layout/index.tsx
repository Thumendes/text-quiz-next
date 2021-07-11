import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-rows-[80px,1fr,70px] h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

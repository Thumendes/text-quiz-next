import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center dark:bg-gray-800 ">
      <a
        href="https://www.instagram.com/thumendess/"
        className="flex space-x-4 items-center"
      >
        <p>@thumendess</p>
        <FiInstagram />
      </a>
    </footer>
  );
};

export default Footer;

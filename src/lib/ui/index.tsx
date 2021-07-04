import {
  HTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
} from "react";
import { FiLoader } from "react-icons/fi";

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  ...props
}) => (
  <h1 className={"flex flex-col gap-2" + className} {...props}>
    {children}
  </h1>
);

export const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => (
  <button
    className={
      "outline-none transition-all py-1.5 px-4 text-lg rounded-lg text-white bg-blue-400 hover:bg-blue-500" +
      className
    }
    {...props}
  >
    {children}
  </button>
);

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input
    className={
      "outline-none transition-all placeholder-gray-400 py-1.5 px-3 text-lg rounded-lg border border-gray-300 focus:border-blue-400" +
      className
    }
    {...props}
  />
);

export const Title: React.FC<TitleProps> = ({
  children,
  className,
  ...props
}) => (
  <h1 className={"text-2xl font-bold " + className || ""} {...props}>
    {children}
  </h1>
);

export const Loader = () => (
  <div className="bg-black opacity-30 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
    <FiLoader className="animate-spin text-white" size={50} />
  </div>
);

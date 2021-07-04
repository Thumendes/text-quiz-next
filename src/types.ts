import { User } from "@prisma/client";

export type AuthContextType = {
  user: User;
  signIn: (data: SignInParams) => Promise<SignInReturn>;
  signUp: () => Promise<void>;
  register: (data: RegisterFormType) => Promise<CommonResponse>;
};

export type SignInParams = {
  username: string;
  password: string;
  redirect?: string;
};

export type SignInReturn = {
  success: boolean;
  msg?: string;
};

export type SignInResponse = {
  token?: string;
  user?: User;
} & CommonResponse;

export type CommonResponse = {
  success: boolean;
  msg?: string;
};

export type LoaderContextType = {
  isLoading: boolean;
  open: () => void;
  close: () => void;
};

export type RegisterFormType = Omit<User, "id" | "createdAt" | "updatedAt">;

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface NavOptions {
  id: string;
  label: string;
  path: string;
}

export interface NavITems {
  adminView: boolean;
  router: AppRouterInstance;
  isModalView: boolean;
}

export interface InputComponettypes {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  placeholder: string;
}

export interface Selectoptions {
  id: string;
  label: string;
}
export interface RegistrationformControls {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
  options?: Selectoptions[];
}
export interface LoginFormControls {
  id: string;
  type: string;
  placeholder: string;
  label: string;
  componentType: string;
}
export interface SelectComponentProps {
  options?: Selectoptions[];
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
export interface UserDataProps {
  name: string;
  email: string;
  password: string;
  role: string;
}

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
  onChange: () => void;
  value: string;
  type: string;
  placeholder: string;
}

export interface SelectComponentProps {
  options: [];
  label: string;
  onChange: () => void;
  value: string;
}

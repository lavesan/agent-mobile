import React from "react";
import { useForm } from "react-hook-form";

interface IMockFormProps {
  children: any;
}

export interface IMockForm {
  name: string;
}

export const MockForm = ({ children }: IMockFormProps) => {
  const { control } = useForm<IMockForm>();

  return <>{React.cloneElement(children, { control })}</>;
};

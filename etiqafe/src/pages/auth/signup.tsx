import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "../../services/authentication";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

type RegisterFormsInputs = {
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
}; 

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword : Yup.string().required("Confirm Password is required")
});

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handlesignup = (form: RegisterFormsInputs) => {
    registerAPI(form.email, form.username, form.password, form.confirmpassword,dispatch);
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
      </div>
      <form onSubmit={handleSubmit(handlesignup)}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">User Name</Label>
              <Input id="first-name" placeholder="Lee" required {...register("username")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Email</Label>
              <Input id="last-name" placeholder="Robinson" required {...register("email")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Password</Label>
            <Input id="email" placeholder="m@example.com" required type="password" {...register("password")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" required type="confirmpassword" {...register("confirmpassword")} />
          </div>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

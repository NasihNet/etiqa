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
  phoneNumber : string;
  hobby : string;
  skillSets : string;
  password: string;
  confirmpassword: string;
}; 

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  hobby: Yup.string().required("Hobby is required"),
  skillSets: Yup.string().required("Skill Set is required"),
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
    registerAPI(form.email, form.username, form.phoneNumber, form.hobby, form.skillSets ,form.password, form.confirmpassword ,dispatch);
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
      </div>
      <form onSubmit={handleSubmit(handlesignup)}>
        <div className="space-y-4">
       
            <div className="space-y-2">
              <Label htmlFor="user-name">User Name</Label>
              <Input id="user-name" placeholder="Lee"  {...register("username")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="example@gmail.com"  {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input id="phone-number" placeholder="019234567"  {...register("phoneNumber")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hobby">Hobby</Label>
              <Input id="hobby" placeholder="Running"  {...register("hobby")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-sets">SkillSet</Label>
              <Input id="skill-sets" placeholder=".Net Core"  {...register("skillSets")} />
            </div>
        
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="password"  type="password" {...register("password")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" placeholder='confirm password' type="password"  {...register("confirmpassword")} />
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

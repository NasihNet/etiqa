import {useState} from 'react';
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "../../services/authentication";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Link from "next/link"

type RegisterFormsInputs = {
  email: string;
  userName: string;
  phoneNumber : string;
  hobby : string;
  skillSets : string;
  password: string;
  confirmpassword: string;
}; 

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  userName: Yup.string().required("Username is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  hobby: Yup.string().required("Hobby is required"),
  skillSets: Yup.string().required("Skill Set is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword : Yup.string().required("Confirm Password is required")
});

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage,setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handlesignup = async (form: RegisterFormsInputs) => {
    const result = await registerAPI(form.email, form.userName, form.phoneNumber, form.hobby, form.skillSets ,form.password, form.confirmpassword ,dispatch);
    if (result) {
      setErrorMessage(result);
    }else{

      router.push('/userlist')
    }
  };

  return (
   
    <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-gray-500 dark:text-gray-400">Create your account to get started.</p>
      </div>
      <form onSubmit={handleSubmit(handlesignup)}>
        <div className="space-y-4">
       
            <div className="space-y-2">
              <Label htmlFor="user-name">User Name</Label>
              <Input id="user-name" placeholder="Lee"  {...register("userName")} />
              {errors.userName ? (
                  <p className="text-rose-600">{errors.userName.message}</p>
                ) : (
                  ""
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="example@gmail.com"  {...register("email")} />
              {errors.email ? (
                  <p className="text-rose-600">{errors.email.message}</p>
                ) : (
                  ""
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input id="phone-number" placeholder="019234567"  {...register("phoneNumber")} />
              {errors.phoneNumber ? (
                  <p className="text-rose-600">{errors.phoneNumber.message}</p>
                ) : (
                  ""
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hobby">Hobby</Label>
              <Input id="hobby" placeholder="Running"  {...register("hobby")} />
              {errors.hobby ? (
                  <p className="text-rose-600">{errors.hobby.message}</p>
                ) : (
                  ""
                )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-sets">SkillSet</Label>
              <Input id="skill-sets" placeholder=".Net Core"  {...register("skillSets")} />
              {errors.skillSets ? (
                  <p className="text-rose-600">{errors.skillSets.message}</p>
                ) : (
                  ""
                )}
            </div>
        
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="password"  type="password" {...register("password")} />
            {errors.password ? (
                  <p className="text-rose-600">{errors.password.message}</p>
                ) : (
                  ""
                )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" placeholder='confirm password' type="password"  {...register("confirmpassword")} />       
               {errors.confirmpassword ? (
                  <p className="text-rose-600">{errors.confirmpassword.message}</p>
                ) : (
                  ""
                )}
          </div>
          <Button className="w-full" type="submit" >
            Sign Up
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/SignIn" className="font-medium text-gray-900 hover:underline dark:text-gray-50" prefetch={false}>
          Sign In
        </Link>
      </div>
    </div>
  </div>
  );
};

export default SignUp;

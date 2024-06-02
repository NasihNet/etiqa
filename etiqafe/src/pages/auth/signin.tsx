import {useState} from 'react'
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinAPI } from '@/services/authentication';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Link from "next/link"


type LoginFormsInputs = {
  email: string;
  passwordHash: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  passwordHash: Yup.string().required("Password is required"),
});

function signin() {
 // const { loginUser } = useAuth();
 const dispatch = useDispatch<AppDispatch>();
 const router = useRouter(); // Initialize useRouter hook
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
  const handleLogin = async (form: LoginFormsInputs) => {
    const error = await signinAPI(form.email, form.passwordHash, dispatch) ;
    debugger;
    if (error) {
      setErrorMessage("error");
    }else{

      router.replace('/userlist')
    }
  };

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-12 mt-10">
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <img
          alt="Company Logo"
          className="mb-4"
          height={100}
          src="/img/logo.jpg"
          style={{
            aspectRatio: "48/48",
            objectFit: "cover",
          }}
          width={100}
        />
      </div>
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="text-gray-500 dark:text-gray-400">Enter your email and password to access your account.</p>
    </div>
    <form onSubmit={handleSubmit(handleLogin)}>
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">    
    {errorMessage && (
            <div className="text-rose-600 mb-4">{errorMessage}</div>
          )}
      <div className="space-y-2">
        <Label className="font-medium" htmlFor="email">
          Email
        </Label>
        <Input
          className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:border-gray-600 dark:focus:ring-gray-600"
          id="email"
          placeholder="m@example.com"
          type="email"
          {...register("email")}
        />
         {errors.email ? (
                  <p className="text-rose-600">{errors.email.message}</p>
                ) : (
                  ""
                )}
      </div>
      <div className="space-y-2">
        <Label className="font-medium" htmlFor="password">
          Password
        </Label>
        <Input
          className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:border-gray-600 dark:focus:ring-gray-600"
          id="password"         
          type="password"
          placeholder="••••••••"
          {...register("passwordHash")}
        />
      </div>
      {errors.passwordHash ? (
                  <p className="text-rose-600">{errors.passwordHash.message}</p>
                ) : (
                  ""
                )}
      <Button
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
        type="submit"
      >
        Sign In
      </Button>
    </div>
    </form>
    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Dont have an account?{" "}
        <Link href="/auth/signup" className="font-medium text-gray-900 hover:underline dark:text-gray-50" prefetch={false}>
          Sign Up
        </Link>
      </div>
  </div>
  )
}

export default signin
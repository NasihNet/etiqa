
import Navbar from "./navbar";
import Footer from "./footer";
import { Toaster } from 'sonner';
import { useRouter } from "next/router";
import { AppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from "react";

const Layout: React.FC<any> = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.value.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/signin"); // Redirect to login page if not authenticated
    }
  }, [isLoggedIn, router]);

    return (
      <div className="content">                   
         <Navbar />
         <Toaster position="top-right"/>
           { children }      
        <Footer/>
      </div>
    );
  }
 
export default Layout;
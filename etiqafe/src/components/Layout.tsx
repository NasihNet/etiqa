
import Navbar from "./navbar";
import Footer from "./footer";
import { Toaster } from 'sonner';
import { ReduxProvider } from "@/redux/provider";

const Layout: React.FC<any> = ({ children }) => {
    return (
      <div className="content">
        <Toaster/>
         <Navbar />
         <ReduxProvider>
           { children }
         </ReduxProvider>
       
        <Footer/>
      </div>
    );
  }
 
export default Layout;
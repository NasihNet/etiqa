import { Toaster, toast } from 'sonner'
import { useAppSelector , AppDispatch} from '@/redux/store';
import { UseDispatch, useDispatch } from 'react-redux';
import { signout } from '@/redux/slices/auth-slice';




const Navbar =()  =>{
  const isLoggedIn = useAppSelector((state) => state.auth.value.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo or Brand */}
          <div className="flex-shrink-0 flex items-center">
            {/* Insert your logo or brand here */}
            <span className="text-xl font-bold text-gray-800">CDN</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center">
            {isLoggedIn
             ? 
             <div> 
             <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">Home</a>
             <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">About</a>
             <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">Services</a>
             <button onClick={() => { dispatch(signout()) }} className="text-gray-600 hover:text-gray-800 px-3 py-2">Logout</button>
                      
           </div>
            :<>
              
            </>}
           
           
          </nav>
        </div>
      </div>
    </header>
  );
}


export default Navbar

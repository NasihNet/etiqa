
import { ShoppingCart } from 'react-feather';
import { Badge } from "@/components/ui/badge";
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner'




function Navbar() {
  const counter = useSelector((state: any) => state.counter.value);
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
            <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">Services</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 px-3 py-2">Contact</a>
            
            {/* Cart Icon */}
            <div className="flex items-center gap-3 shrink-0 ml-auto">
              <ShoppingCart className="text-gray-600 hover:text-gray-800 w-6 h-6" />
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{counter}</Badge>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}


export default Navbar

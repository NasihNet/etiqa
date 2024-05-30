import {
  Card,

} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { useState, useEffect, useRef  } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/slices/productSlice';
import { TableHead ,TableRow,TableHeader,TableCell,TableBody,Table} from "@/components/ui/table";
import { AvatarImage,AvatarFallback,Avatar } from "@radix-ui/react-avatar";
import { getUsers } from "@/services/user";
import { AppDispatch, useAppSelector } from '@/redux/store';
import UserForm from './userform';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Product {
  productId: string,
  name: string,
  description: string,
  unitPrice: number,
  maximumQuantity: number,
  imageName: string
}

interface User{

  userId: number,
  userName: string,
  email:string,
  phoneNumber:string,
  skillsets:string,
  hobby:string,

}

export function PlusIcon(props : any) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export function TrashIcon(props :any) {
  return (
    <svg
    {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}

// async function getProducts(): Promise<User[]> {
 
//   try {
//     const response = await axios.get<User[]>('https://localhost:7254/api/User');
  
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// }

const userlist = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.user.Users);
  const [editUser,isEditUser] = useState(false);

  const isEditing = (isEditing : boolean) => {
  

  }

  useEffect(() => {
    const fetchData =  () => {
      try {
        getUsers(dispatch);
     
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <main>
      <h2 className="mb-8">User Management</h2>
      
        {loading ? (
          <>
            {"abcdefghi".split('').map(i => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : (
          <>
           
             <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
    
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Skill Set</TableHead>
              <TableHead>Hobby</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {userData.map((user) => (
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage alt="Avatar" src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.userName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.userName}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.skillSets}</TableCell>
              <TableCell>{user.hobby}</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button size="icon" variant="ghost">
                  <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button className="text-red-500" size="icon" variant="ghost">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>   
             ))}     
          </TableBody>
        </Table>
      </div>
              </div>
            <div id="bottom-sentinel" style={{ height: '10px' }}></div>
          </>
        )}
       
      
      
    </main>
  );
}




export default userlist;
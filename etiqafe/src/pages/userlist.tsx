import {
  Card,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner'
import { useState, useEffect, useRef } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/slices/productSlice';
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { AvatarImage, AvatarFallback, Avatar } from "@radix-ui/react-avatar";
import { getUsers } from "@/services/user";
import { AppDispatch, useAppSelector } from '@/redux/store';
import EditUserForm from './edituserform';
import { User } from "@/Model/User";
import ConfirmDeleteModal from "@/components/Modal/confirmdeletemodal";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export function PlusIcon(props: any) {
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

export function TrashIcon(props: any) {
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

const UserList = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.value.isLoggedIn);
 
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize] = useState<number>(100);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useAppSelector((state) => state.user.Users);
  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUser(true);
  }

  const handlerDeleteUser = (user : User) => {
    setSelectedUser(user);
    setIsDeleteUser(true);
  }

  const fetchData = async () => {
    try {
      const data = await getUsers(dispatch, pageNumber, pageSize);
      if (data.length < pageSize) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const router = useRouter();
  useEffect(() => {
   
      if (!isLoggedIn) {
      router.replace("/auth/signin"); // Redirect to login page if not authenticated
    }
    fetchData();
  }, [dispatch,isLoggedIn]);

  const handleLoadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

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
                    <TableRow key={user.id}>
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
                          <Button size="icon" variant="ghost" onClick={() => handleEditUser(user)}>
                            <FaEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button className="text-red-500" size="icon" variant="ghost" onClick={() => handlerDeleteUser(user)}>
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only" >Delete</span>
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
          {hasMore && (
            <Button onClick={handleLoadMore} className="mt-4">Load More</Button>
          )}
        </>
      )}

      {isEditUser && selectedUser && (
        <EditUserForm user={selectedUser} onClose={() => setIsEditUser(false)} />
      )}
       {isDeleteUser && selectedUser && (
        <ConfirmDeleteModal user={selectedUser} onClose={() => setIsDeleteUser(false)} />
      )}
      
    </main>
  );
}

export default UserList;

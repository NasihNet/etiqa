import { AppDispatch } from '@/redux/store';
import { deleteUserApi } from '@/services/user'
import React from 'react'
import { useDispatch } from 'react-redux';
import { AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogContent, AlertDialog }  from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { User } from '@/Model/User';



interface DeleteUserFormProps {
  user: User;
  onClose: () => void;
} 



  const confirmdeletemodal: React.FC<DeleteUserFormProps> = ({ user, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleDeleteUser = async () => {

       deleteUserApi(user.id,dispatch);
        onClose();
    }
  return (
    <div>
      <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this {user.userName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user and remove their data from our system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleDeleteUser}>Delete User</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default confirmdeletemodal
    
import { Toaster, toast } from 'sonner';
import { deleteUser } from '@/redux/slices/user-slice';
import { Middleware } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

const toastMiddleware: Middleware = () => next => (action: AnyAction) => {
  switch (action.type) {
    case deleteUser.type:
      toast.success('User deleted successfully!');
      break;
    // Add other cases here as needed
    case "Users/editUser":
      toast.success('User updated!');
      break;   
      case "Users/deleteUser":
        toast.success('User deleted!');
        break;   
    default:
      break;
  }
  return next(action);
};

export default toastMiddleware;

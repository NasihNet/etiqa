import { Toaster, toast } from 'sonner'
import {
    increment
} from '../store/slices/productSlice';
import { Middleware } from '@reduxjs/toolkit';


const ToastMiddleware: Middleware = () => next => action => {
    switch (action) {
        case increment.type:
           toast.success('test');
            break;

        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;
import axios, { InternalAxiosRequestConfig } from "axios";
import { UserProfileToken } from "../Model/User";
import { userAuthenticated } from '@/redux/slices/auth-slice';
import { AppDispatch } from '@/redux/store'; // Ensure this import is correct
import { toast } from "sonner";



const api = "https://localhost:7254/api/";
const axiosInstance = axios.create({    
    baseURL: `${process.env.NEXT_APP_BASE_URL}/api/User`,
})

axiosInstance.interceptors.request.use((config : InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
    return config;
});

export const registerAPI = async (
    email: string,
    username: string,
    phoneNumber : string,
    hobby : string,
    skillSets : string,
    passwordhash: string,
    confirmpasswordhash: string,
    dispatch: AppDispatch 
) => {
    try {
        const { data } = await axios.post<UserProfileToken>(api + "authentication/signup/", {
            Email: email,
            Username: username,
            PhoneNumber : phoneNumber,     
            Hobby :hobby,
            SkillSets : skillSets,    
            PasswordHash: passwordhash,
            ConfirmPasswordhash: confirmpasswordhash
        });
        dispatch(userAuthenticated(data));

        return data.userName; // No error

    } catch (error : any) {
      
      // Check if error is an AxiosError and if it has a response
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data.message; // Return the error message from the response
      }
      return "An unexpected error occurred"; // Fallback error message
    }
};


export const signinAPI = async (
    email: string,
    passwordhash: string,
    dispatch: AppDispatch,
   
  ): Promise<string | null> => {
    try {
      const { data } = await axios.post<UserProfileToken>(api + "authentication/signin/", {
        email: email,
        passwordHash: passwordhash,
      });
       
     
        dispatch(userAuthenticated(data));    
        return data.userName; // No error
      
     
    } catch (error : any) {
      debugger
      // Check if error is an AxiosError and if it has a response
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);  // Return the error message from the response
      }
      if (error.response?.data?.includes('Invalid username and password')) {
        toast.error('Invalid username and password');  // Return the error message from the response
        
      }
   
      throw error // Fallback error message
    }
  };


import axios from "axios";
import { UserProfileToken } from "../Model/User";
import { userAuthenticated } from '@/redux/slices/auth-slice';
import { AppDispatch } from '@/redux/store'; // Ensure this import is correct


const api = "https://localhost:7254/api/";

export const registerAPI = async (
    email: string,
    username: string,
    phoneNumber : string,
    hobby : string,
    skillSets : string,
    passwordhash: string,
    confirmpasswordhash: string,
    dispatch: AppDispatch // Correct function signature
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

        return data;
    } catch (error) {
        // Handle error
        console.error(error);
    }
};


export const signinAPI = async (
  email: string,
  passwordhash: string,
  dispatch: AppDispatch, // Correct function signature
  onSuccess: () => void // Add onSuccess callback function
) => {
  try {
      const { data } = await axios.post<UserProfileToken>(api + "authentication/signin/", {
          email: email,       
          passwordHash: passwordhash,       
      });
      console.log();
      
      if(data.token != null )
        {
            onSuccess();
        }
      dispatch(userAuthenticated(data));
      return data;
  } catch (error) {
      // Handle error
      console.error(error);
  }
};


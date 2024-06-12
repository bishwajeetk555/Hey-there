import React, { useEffect } from 'react'
import{Link,useNavigate} from 'react-router-dom'
import{RegisterUser} from '../../apicalls/users';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { HideLoader,ShowLoader } from '../../redux/loaderSlice';

function Register() {

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const[user,setUser]=React.useState({
        name:"",
        email:"",
        password:"",
    });

    const register= async()=>{
        try{
            dispatch(ShowLoader());
            const response=await RegisterUser(user);
            dispatch(HideLoader());
            if(response.success){
                toast.success(response.message);
            }
            else{
                toast.error(response.message);
            }

        }

        catch(error){
            toast.error(error.message);
            dispatch(HideLoader());
        }
    };

    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/");
      }

      
    },[]);


  return (
    <div className='h-screen bg-primary flex justify-center items-center'>

        <div className='bg-white shadow-md p-5 flex flex-col gap-4 w-96'>
            <h1 className='text-2xl  uppercase font-semibold'>Hey there!   register</h1>
            <hr />

            <input type="text" placeholder="Enter your name" value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
            <input type="email" placeholder="Enter your email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password"  placeholder="Enter your password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>

            <button className="contained-btn" onClick={register}>Register</button>

            <Link to="/login" className="underline" >Already have an account? Login</Link>
        
          


        </div>
      
    </div>
  );
}

export default Register;



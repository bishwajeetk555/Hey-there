import React,{useEffect} from 'react'
import{Link, useNavigate} from 'react-router-dom'
import{LoginUser} from '../../apicalls/users';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { HideLoader,ShowLoader } from '../../redux/loaderSlice';




function Login() {

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const[user,setUser]=React.useState({        
        email:'',
        password:'',
    })

    const login=async()=>{
        try{
            dispatch(ShowLoader());
            const response=await LoginUser(user);
            dispatch(HideLoader());
            if(response.success){
                toast.success(response.message);
                localStorage.setItem("token",response.data);
                window.location.href="/";
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
            <h1 className='text-2xl  uppercase font-semibold'>Hey there! login</h1>
            <hr />

            
            <input type="email" placeholder="Enter your email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
            <input type="password"  placeholder="Enter your password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>

            <button className="contained-btn" onClick={login}>Login</button>

            <Link to="/register" className="underline" >Don't have an account? Register</Link>
        
          


        </div>
      
    </div>
  );
}


export default Login;



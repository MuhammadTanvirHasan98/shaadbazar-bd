import { Link, useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import { FcGoogle } from "react-icons/fc";
import logo from '../../assets/images/logo.png'
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Login = () => {

  const {user, loginUser, loginWithGoogle} = useAuthContext();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  console.log(location);
  const gotoThere = location.state || '/';

  useEffect(()=>{
     if(user){
       navigate(gotoThere);
     }
  },[user])


  const handleLogin = async e =>{
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log({email, password});

      try{
        const result = await loginUser(email, password);
        const{data} = await axiosSecure.post( '/jwt', {email: result?.user?.email})

         console.log(data);

         toast.success("Successfully logged in!")
         navigate(gotoThere, {replace:true});
      } 
      catch(err){
         console.log(err.message)
         toast.error(err.message);
      }
  }

  const handleGoogleLogin = async () =>{
  
     try{
       const result =  await loginWithGoogle()
       const{data} = await axiosSecure.post( '/jwt', {email: result?.user?.email})
       console.log(data);

       toast.success("Successfully logged in with google!")
       navigate(gotoThere, {replace:true});
     }
     catch(err){ 
        console.error(err.message);
        toast.error(err.message);
     } 
  }

  if(user) return

  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-306px)] my-20'>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
          style={{
            backgroundImage: `url('https://i.ibb.co/nBwC4d3/login.png')`,
          }}
        ></div>

        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <img
              className='w-12 h-12 '
              src={logo}
              alt='website logo'
            />
          </div>

          <p className='mt-3 text-2xl text-center text-gray-600 font-extrabold merienda'>
            Welcome back!
          </p>

          <div onClick={handleGoogleLogin} className='flex cursor-pointer items-center justify-center gap-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 px-4 py-3 '>

              <FcGoogle className="text-xl"/>
              Sign in with Google
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
              or login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-semibold text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                placeholder="Enter your email address"
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-semibold text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                placeholder="Enter your password"
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-2 text-lg font-semibold tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 '
              >
                Login
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-400  md:w-1/4'></span>

            <Link
              to='/register'
              className='text-xs text-gray-500 uppercase  hover:underline'
            >
              or register
            </Link>

            <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
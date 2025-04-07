import { useForm } from "react-hook-form";
import { registerUser as apiRegisterUser } from "../../ApiCalls/authUserApi";
import React, { useEffect } from "react";
import { toast } from 'react-hot-toast';
import  {Link,useNavigate}  from "react-router-dom";

function Register() {

    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { confirmPassword, ...formData } = data;
    console.log("Form Data:", formData);
    submitUser(formData)
      reset();
    
  };

  useEffect(() => {
    submitUser();
  },[])

  const submitUser = async (data) => {
    try {
        const response = await apiRegisterUser(data);
        console.log("User registered successfully:", response);
        if(response.success){
          toast.success(response.message);
          navigate("/login")
      }else{
          toast.error(response.message);
      }
    } catch (error) {
        console.error("Error registering user:", error);
      }
  }

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white p-6 rounded shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Full name is required" })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;

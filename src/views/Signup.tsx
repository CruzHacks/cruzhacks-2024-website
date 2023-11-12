import React from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { classNames } from "../utils/string"
import { Link } from "react-router-dom"
import { auth } from "../utils/firebaseapp"
import { ArrowLeftIcon, LockClosedIcon, UsersIcon } from "@heroicons/react/24/outline"

// This component uses react-hook-form to handle data validation and input
// specific errors. Follow this tutorial to learn more about how Zod is used in
// react-hook-form to validate the schema:
// https://react-hook-form.com/get-started#SchemaValidation

const formSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .min(1, "Password is required"),
    passwordConfirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })

type FormSchemaType = z.infer<typeof formSchema>

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(formSchema) })

  const handleRegister: SubmitHandler<FormSchemaType> = async data => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        console.log("User Account Created:", userCredential.user)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className='min-w-screen flex min-h-screen flex-1 items-center justify-center'>
      <Link to='/' className='fixed left-5 top-5'>
        {/* <image className='h-10 w-auto' src={logo} alt='StudentStay' /> */}
        <ArrowLeftIcon className='h-8 w-auto' />
      </Link>
      <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <h2 className='mt-8 font-title text-5xl leading-10 py-6'>
              Sign Up
            </h2>
            <p className='font-subtext'>
              Please sign up to continue
              {/* <Link
                to='/login'
                className='text-green-800 hover:text-green-700 font-semibold'
              >
                Login
              </Link> */}
            </p>
          </div>

          <div className='mt-10'>
            <div>
              <form
                onSubmit={handleSubmit(handleRegister)}
                className='space-y-6'
              >
                <div>
                  <div className='flex mt-2 border px-4 py-6 rounded-xl shadow-sm gap-3 bg-white/20'>
                    <UsersIcon className = 'w-8' />
                    <input
                      type='email'
                      {...register("email")}
                      name='email'
                      id='email'
                      className={classNames(
                        errors.email
                          ? "text-error placeholder:text-red-300"
                          : "",
                        "text-lg placeholder-white font-subtext block w-full border-b-2 px-3 py-1.5 shadow-sm sm:text-lg sm:leading-6 bg-white/0 focus:outline-none"
                      )}
                      placeholder='Username'
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby='password-error'
                    />
                    {errors.email && (
                      <div className='pointer-events-none inset-y-0 right-0 flex items-center pr-3'>
                        <ExclamationCircleIcon
                          className='text-error h-5 w-5'
                          aria-hidden='true'
                        />
                      </div>
                    )}
                  </div>

                  {errors.email && (
                    <p className='text-red-600 mt-2 text-sm' id='email-error'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <div className='flex mt-2 border px-4 py-6 rounded-xl shadow-sm gap-3 bg-white/20'>
                    <LockClosedIcon className = 'w-8' />
                    <input
                      type='password'
                      {...register("password")}
                      name='password'
                      id='password'
                      placeholder="Password"
                      className={classNames(
                        errors.password
                          ? "text-error placeholder:text-red-300"
                          : "",
                        "text-lg placeholder-white font-subtext block w-full border-b-2 px-3 py-1.5 shadow-sm sm:text-lg sm:leading-6 bg-white/0 focus:outline-none"
                      )}
                      aria-invalid={errors.password ? "true" : "false"}
                      aria-describedby='password-error'
                    />
                    {errors.password && (
                      <div className='pointer-events-none inset-y-0 right-0 flex items-center pr-3'>
                        <ExclamationCircleIcon
                          className='text-error h-5 w-5'
                          aria-hidden='true'
                        />
                      </div>
                    )}
                  </div>

                  {errors.password && (
                    <p className='text-red-600 mt-2 text-sm' id='email-error'>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className='flex items-center justify-between'>
                <div className='text-sm leading-6'>
                  <a
                    href='/'
                    className='text-green-800 hover:text-green-700 font-semibold'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>


                <div>
                <button
                  type='submit'
                  className='flex h-16 w-full items-center justify-center rounded-md bg-white px-3 py-1.5 font-subtext text-2xl leading-6 text-blue-imperial shadow-sm transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-royal disabled:bg-white/50'
                >
                Sign Up
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

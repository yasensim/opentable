import React from 'react'
interface Props {
    inputs: {
        email: string,
        password: string,
        city: string,
        firstName: string,
        lastName: string,
        phoneNumber: string,
    }
    handelChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
    isSignin: boolean
}
export default function AuthModalInputs({inputs, handelChangeInput, isSignin}: Props) {
  return (
    <div>
        { isSignin ? null :<div className="flex my-3 justify-between text-sm">
            <input type="text" id="first_name" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="First Name" 
            value={inputs.firstName} onChange={handelChangeInput} name='firstName' />
            <input type="text" id="last_name" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="Last Name" 
            value={inputs.lastName}  onChange={handelChangeInput} name='lastName' />
        </div>}
        <div className="flex my-3 justify-between text-sm">
            <input type="email" id="email" className="border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" 
            value={inputs.email}  onChange={handelChangeInput} name='email' />
        </div>
        { isSignin ? null :<div className="flex my-3 justify-between text-sm">
            <input type="text" id="phone" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="Phone" 
            value={inputs.phoneNumber} onChange={handelChangeInput} name='phoneNumber' />
            <input type="text" id="city" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="City" 
            value={inputs.city} onChange={handelChangeInput} name='city' />
        </div>}
        <div className="flex my-3 justify-between text-sm">
            <input type="password" id="password" className="border rounded p-2 py-2 w-full leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" 
            value={inputs.password} onChange={handelChangeInput} name='password' />
        </div>
    </div>
  )
}

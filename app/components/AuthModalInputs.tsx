import React from 'react'

export default function AuthModalInputs() {
  return (
    <div>
        <div className="flex my-3 justify-between text-sm">
            <input type="text" id="first_name" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="First Name" />
            <input type="text" id="last_name" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="Last Name" />
        </div>
        <div className="flex my-3 justify-between text-sm">
            <input type="email" id="email" className="border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" />
        </div>
        <div className="flex my-3 justify-between text-sm">
            <input type="text" id="phone" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="Phone" />
            <input type="text" id="city" className="border rounded p-2 py-2 w-[49%] leading-tight focus:outline-none focus:shadow-outline" placeholder="City" />
        </div>
        <div className="flex my-3 justify-between text-sm">
            <input type="password" id="password" className="border rounded p-2 py-2 w-full leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" />
        </div>
    </div>
  )
}

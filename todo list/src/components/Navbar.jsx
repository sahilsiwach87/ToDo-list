import React from 'react'
const Navbar = () => {
    return (
        <nav className="flex justify-between bg-slate-700 text-white py-3">
            <div className="logo">
                <span className="font-bold text-xl mx-5">MyTask</span>
            </div>
            <ul className="flex gap-8 mx-5 ">
                <li className="cursor-pointer hover:font-bold transition-all">
                    Home
                </li >
                <li className="cursor-pointer hover:font-bold transition-all">
                    Contacts
                </li>
                <li className="cursor-pointer hover:font-bold transition-all">
                    About us
                </li>
            </ul>
        </nav>
    )
}

export default Navbar

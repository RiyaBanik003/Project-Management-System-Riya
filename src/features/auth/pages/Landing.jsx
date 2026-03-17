import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../../utils/constants";
const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">

            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-sm">
                {/* <h1 className="text-xl font-bold text-[#002D74]">
                    TaskSphere
                </h1> */}
                <Link to="/" className="">
                    <img src={IMAGES.logo} alt="logo" className="w-20 h-10 object-contain" />
                </Link>

                <div className="flex gap-6 items-center">
                    <Link to="/login" className="text-sm font-medium hover:text-[#002D74]">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-[#002D74] text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-900 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Helo section  */}

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-10 py-16 grid md:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-6">

                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                            <span className="flex items-center gap-2">
                                A New Way of
                                <img src={IMAGES.acc1} alt="" className="w-10 h-10 object-contain" />
                            </span>

                            <span className="flex items-center gap-2 text-[#002D74]">
                                Project Management
                                <img src={IMAGES.acc2} alt="" className="w-10 h-10 object-contain" />
                            </span>
                        </h2>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        Manage projects smarter, collaborate better, and achieve goals faster
                        with our powerful project management system.
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-3 pt-2">

                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-[#002D74] font-bold">➤</span>
                            <span>Advanced Task Planning</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-[#002D74] font-bold">➤</span>
                            <span>Seamless Team Coordination</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <span className="text-[#002D74] font-bold">➤</span>
                            <span>Powerful Progress Tracking</span>
                        </div>

                    </div>
                </div>

                {/* Right Image */}
                <div className="flex justify-center md:justify-end">
                    <img
                        src={IMAGES.heroBg}
                        alt="hero"
                        className="w-full max-w-lg object-contain"
                    />
                </div>

            </div>


            {/* Footer */}
            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-10 py-12 grid md:grid-cols-3 gap-10">

                    {/* Left Section */}
                    <div className="space-y-4">
                        <img src={IMAGES.logo} alt="Logo" className="w-32" />
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Manage your tasks efficiently and collaborate with your team.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Contact Us</h4>

                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                            {/* Phone Icon */}
                            <svg
                                className="w-4 h-4 text-[#002D74]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.72 11.72 0 003.67.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.27.2 2.5.59 3.67a1 1 0 01-.24 1z" />
                            </svg>
                            <span>+91 9900112233</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                            {/* Email Icon */}
                            <svg
                                className="w-4 h-4 text-[#002D74]"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span>support@pms.com</span>
                        </div>
                    </div>

                    {/* Social Section */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Follow Us</h4>

                        <div className="flex gap-4">

                            {/* Facebook */}
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-[#002D74] hover:text-white transition"
                            >
                                F
                            </a>

                            {/* Twitter */}
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-[#002D74] hover:text-white transition"
                            >
                                X
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-[#002D74] hover:text-white transition"
                            >
                                in
                            </a>

                            {/* Website */}
                            <a
                                href="#"
                                className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-[#002D74] hover:text-white transition"
                            >
                                🌐
                            </a>

                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-center text-sm text-gray-500 border-t py-4">
                    © {new Date().getFullYear()} Project Management System. All rights reserved.
                </div>
            </footer>

        </div>
    );
};

export default Landing;
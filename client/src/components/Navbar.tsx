import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
      : "text-white hover:text-indigo-300 transition";

  return (
    <>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
        <NavLink to="/">
          <img src={assets.logo} alt="Logo" className="h-5 sm:h-7" />
        </NavLink>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/projects" className={navClass}>
            My Projects
          </NavLink>
          <NavLink to="/community" className={navClass}>
            Community
          </NavLink>
          <NavLink to="/pricing" className={navClass}>
            Pricing
          </NavLink>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/auth/signin")}
            className="px-6 py-1.5 text-sm bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded"
          >
            Get started
          </button>

          <button
            className="md:hidden active:scale-90 transition"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 text-white backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden">
          <NavLink
            to="/"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            My Projects
          </NavLink>
          <NavLink
            to="/community"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Community
          </NavLink>
          <NavLink
            to="/pricing"
            className={navClass}
            onClick={() => setMenuOpen(false)}
          >
            Pricing
          </NavLink>

          <button
            onClick={() => setMenuOpen(false)}
            className="size-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}

      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/hero/bg-gradient-2.png"
        className="absolute inset-0 -z-10 size-full"
        alt=""
      />
    </>
  );
};

export default Navbar;

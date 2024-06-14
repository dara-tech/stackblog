import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useMantineColorScheme, Button } from "@mantine/core";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import useStore from "../store";
import Logo from "./Logo";
import Switch from "./Switch";
import MobileDrawer from "./MobileDrawer";
import UserMenu from "./UserMenu";
import clsx from "clsx";

const Navbar = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user, signInModal, setSignInModal } = useStore();
  const location = useLocation();
  const theme = colorScheme === "dark";

  const handleLogin = () => {
    if (location.pathname === "/auth") setSignInModal(!signInModal);
  };

  return (
    <div className="w-full bg-transparent flex flex-row md:px-6 py-4 md:py-5 justify-between">
      {user?.token && (
        <div className="block lg:hidden">
          <MobileDrawer theme={theme} />
        </div>
      )}

      <div className="flex flex-row gap-2">
        <Link
          to="/"
          className="text-red-600 hover:text-red-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800"
        >
          <FaYoutube />
        </Link>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800"
        >
          <FaFacebook />
        </Link>
        <Link
          to="/"
          className="text-rose-600 hover:text-rose-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800"
        >
          <FaInstagram />
        </Link>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-500 shadow-md p-2 rounded-md hover:shadow-gray-300 hover:shadow-sm dark:bg-gray-800"
        >
          <FaTwitterSquare />
        </Link>
      </div>

      <Logo />

      <div className="flex items-center gap-2">
        <Switch />
        {user?.token ? (
          <UserMenu user={user?.user} theme={theme} />
        ) : (
          <Link to="/auth" onClick={handleLogin}>
            <Button variant="outline" className={clsx(theme ? "text-white" : "text-black")}>
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

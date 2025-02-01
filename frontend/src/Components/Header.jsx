import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Helper function for classNames
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src="/logo.jpeg" alt="Logo" className="h-14" />
            <p className="font-semibold text-lg text-gray-800">ज्ञानांकूर प्रज्ञाशोध परीक्षा 2024-25</p>
          </div>
        </Link>

        <button onClick={handleMenu} className="lg:hidden">
          {menu ? <CloseIcon className="text-gray-600" /> : <MenuIcon className="text-gray-600" />}
        </button>

        <nav
          className={`space-x-6 ${menu ? "py-6 w-full left-0 gap-3 text-center bg-gray-100 absolute top-24 flex flex-col" : "hidden"} lg:flex items-center`}
        >
          {/* Gallery (Active) */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500 hover:text-white">
                Gallery
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/gallery"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Gallery
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          {/* Registration (Active) */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-500 hover:text-white">
                Registration
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/coordinator"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Co-Ordinator
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/school-register"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        School
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/student-register"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Student
                      </Link>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>

          {/* Disabled Sections */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 cursor-not-allowed">
                Exam 2023-24
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex justify-center gap-x-1.5 rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 cursor-not-allowed">
                Download
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>
          </Menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;

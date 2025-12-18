import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  IoCartOutline,
  IoClose,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoMailOutline,
} from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import {
  MdOutlineShoppingBag,
  MdOutlineCancel,
  MdOutlineLogout,
} from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const lastScroll = useRef(0);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const navLinks = [
    { link: "Home", href: user ? "/home" : "/", icon: IoHomeOutline },
    { link: "About", href: "/about", icon: IoInformationCircleOutline },
    { link: "Contact", href: "/contact", icon: IoMailOutline },
    ...(user ? [] : [{ link: "Sign Up", href: "/signup" }]),
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest("nav")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Handle scroll behavior
  useEffect(() => {
    // Initialize lastScroll with current position
    lastScroll.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;

        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const scrollDifference = currentScroll - lastScroll.current;

          // Always show navbar when mobile menu is open
          if (mobileMenuOpen) {
            setVisible(true);
          }
          // Show navbar at top of page
          else if (currentScroll <= 60) {
            setVisible(true);
          }
          // Hide when scrolling down (more than 5px)
          else if (scrollDifference > 5) {
            setVisible(false);
          }
          // Show when scrolling up (more than 5px)
          else if (scrollDifference < -5) {
            setVisible(true);
          }

          // Always update lastScroll
          lastScroll.current = currentScroll;
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 bg-[#292828] shadow-lg transform transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <nav className="max-w-7xl mx-auto w-full px-4 md:px-6">
        <div
          className="flex items-center justify-between"
          style={{ height: "4rem" }}
        >
          <div className="flex ">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#FFAD33] p-2 rounded-md hover:bg-white/10 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <IoMdClose style={{ width: "1.5rem", height: "1.5rem" }} />
              ) : (
                <IoMdMenu style={{ width: "1.5rem", height: "1.5rem" }} />
              )}
            </button>

            {/* Logo */}
            <Link to={user ? "/home" : "/"} className="flex-shrink-0">
              <img
                src="/images/brand/logo.png"
                alt="The Director"
                className="rounded-full brightness-150 object-cover"
                style={{ width: "6rem", height: "3.5rem" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navLinks.map(({ link, href }, index) => (
              <Link
                key={index}
                to={href}
                className="text-[#FFAD33] text-nowrap hover:text-yellow-400 transition-colors text-sm lg:text-base font-medium px-2 lg:px-3 py-2"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 ">
            {/* Search Bar */}
            <div className="bg-white rounded overflow-hidden px-1">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center "
              >
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  className="w-full px-2 py-2 text-sm focus:outline-none text-gray-800 placeholder-gray-500"
                />
                <button type="submit" className="p-1">
                  <IoIosSearch
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    className="text-gray-700 hover:text-[#ffad33] transition-colors"
                  />
                </button>
              </form>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="text-[#FFAD33] hover:text-yellow-400 transition-colors p-2"
              aria-label="Wishlist"
            >
              <IoMdHeartEmpty style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="text-[#FFAD33] hover:text-yellow-400 transition-colors p-2"
              aria-label="Cart"
            >
              <IoCartOutline style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>

            {/* User Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setUserDropdownOpen(true)}
              onMouseLeave={() => setUserDropdownOpen(false)}
              ref={dropdownRef}
            >
              <button
                className="text-white bg-[#fd4444] p-2 rounded-full transition-all hover:bg-[#fd4444]/80 hover:scale-105"
                aria-label="User menu"
              >
                <BiUser style={{ width: "1.25rem", height: "1.25rem" }} />
              </button>

              {/* Desktop Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 z-50 animate-fadeIn">
                  <div
                    className="bg-gradient-to-b from-[#2d2d2d] via-[#3a3a3a] to-[#4a4a4a] backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-white/10"
                    style={{ width: "14rem" }}
                  >
                    {user ? (
                      <div className="">
                        <Link
                          to="/account/profile"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <BiUser
                            style={{ width: "1.25rem", height: "1.25rem" }}
                            className="text-gray-300"
                          />
                          <span className="text-[#ffad33] text-sm">
                            Manage Account
                          </span>
                        </Link>
                        <Link
                          to="/account/orders"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <MdOutlineShoppingBag
                            style={{ width: "1.25rem", height: "1.25rem" }}
                            className="text-gray-300"
                          />
                          <span className="text-[#ffad33] text-sm">
                            My Orders
                          </span>
                        </Link>
                        <Link
                          to="/account/cancellations"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <MdOutlineCancel
                            style={{ width: "1.25rem", height: "1.25rem" }}
                            className="text-gray-300"
                          />
                          <span className="text-[#ffad33] text-sm">
                            Cancellations
                          </span>
                        </Link>
                        <Link
                          to="/account/reviews"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <AiOutlineStar
                            style={{ width: "1.25rem", height: "1.25rem" }}
                            className="text-gray-300"
                          />
                          <span className="text-[#ffad33] text-sm">
                            My Reviews
                          </span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 border-t border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                          <MdOutlineLogout
                            style={{ width: "1.25rem", height: "1.25rem" }}
                            className="text-gray-300"
                          />
                          <span className="text-[#ffad33] text-sm">Logout</span>
                        </button>
                      </div>
                    ) : (
                      <div className="">
                        <Link
                          to="/login"
                          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <BiUser
                            style={{ width: "1.25rem", height: "1.25rem" }}
                            className="text-gray-300"
                          />
                          <span className="text-[#ffad33] text-sm">Login</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => navigate("/wishlist")}
              className="text-[#FFAD33] hover:text-yellow-400 transition-colors p-2"
              aria-label="Wishlist"
            >
              <IoMdHeartEmpty style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="text-[#FFAD33] hover:text-yellow-400 transition-colors p-2"
              aria-label="Cart"
            >
              <IoCartOutline style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>
            {/* User Icon */}
            <Link
              className="text-white bg-[#fd4444] p-2 rounded-full transition-all hover:bg-[#fd4444]/80 hover:scale-105"
              to="/account/profile"
            >
              <BiUser style={{ width: "1.25rem", height: "1.25rem" }} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="absolute top-0 w-screen h-screen bg-[#1d1c1c91] z-10"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}

        {/* Mobile Menu Sidebar */}
        <div
          className={`md:hidden h-screen z-50 absolute top-0 left-0 bg-[#292828] shadow-lg transition-all ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "70%" }}
        >
          <div className="w-full flex">
            <Link
              to="/"
              className="bg-[#ffad33]/80 w-full font-extrabold text-2xl px-8 py-3 text-gray-100"
            >
              The Director
            </Link>
          </div>

          <div className="px-4 py-4 space-y-1">
            {/* Navigation Links */}
            {navLinks.map(({ link, href, icon: Icon }, index) => (
              <Link
                key={index}
                to={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-base text-white hover:bg-white/10 rounded-lg transition-colors font-medium ${
                  link === "Sign Up" ? "hidden" : ""
                }`}
              >
                {Icon && (
                  <Icon
                    style={{ width: "1.25rem", height: "1.25rem" }}
                    className="text-gray-300"
                  />
                )}
                <span className="text-[#ffad33]">{link}</span>{" "}
              </Link>
            ))}

            <div className="border-t border-white/10 my-2"></div>

            {/* User Menu Items */}
            <Link
              to="/account/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <BiUser
                style={{ width: "1.25rem", height: "1.25rem" }}
                className="text-gray-300"
              />
              <span className="text-[#ffad33] text-base">My Account</span>
            </Link>

            <Link
              to="/account/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <MdOutlineShoppingBag
                style={{ width: "1.25rem", height: "1.25rem" }}
                className="text-gray-300"
              />
              <span className="text-[#ffad33] text-base">My Orders</span>
            </Link>

            <Link
              to="/account/cancellations"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MdOutlineCancel
                style={{ width: "1.25rem", height: "1.25rem" }}
                className="text-gray-300"
              />
              <span className="text-[#ffad33] text-base">My Cancellations</span>
            </Link>

            <Link
              to="/account/returns"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MdOutlineCancel
                style={{ width: "1.25rem", height: "1.25rem" }}
                className="text-gray-300"
              />
              <span className="text-[#ffad33] text-base">My Returns</span>
            </Link>

            <Link
              to="/account/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <AiOutlineStar
                style={{ width: "1.25rem", height: "1.25rem" }}
                className="text-gray-300"
              />
              <span className="text-[#ffad33] text-base">My Reviews</span>
            </Link>

            <div className="border-t border-white/10 my-2"></div>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <MdOutlineLogout
                  style={{ width: "1.25rem", height: "1.25rem" }}
                  className="text-gray-300"
                />
                <span className="text-[#ffad33] text-base">Logout</span>
              </button>
            )}

            {!user && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 mt-4 text-center text-base bg-[#fd4444] text-white rounded-lg hover:bg-[#fd4444]/80 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

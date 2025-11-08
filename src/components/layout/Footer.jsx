import { BsTwitterX } from "react-icons/bs";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from 'react-router-dom'
export const Footer = () => {
  return (
    <div>
        <footer className="bg-[#18130e] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
            <div className="w-full flex items-center gap-4">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-12 h-12 brightness-150 rounded-full flex-shrink-0"
              />
              <div className="w-full flex flex-wrap gap-3 text-nowrap md:flex-nowrap">
                {[
                  "Home",
                  "The Origin Decree",
                  "Products",
                  "Membership Protocol",
                  "Confidentiality Protocol",
                ].map((item, index) => (
                  <a key={index} className="w-full text-[#c9b396] hover:text-white text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
              <div className="flex gap-3">
                <FaFacebookF className="text-[#c9b396] w-8 h-8 cursor-pointer" />
                <BsTwitterX className="text-[#c9b396] w-8 h-8 cursor-pointer" />
                <FaInstagram className="text-[#c9b396] w-8 h-8 cursor-pointer" />
              </div>
              <Link to="/contact" className="bg-[#be9b6c] text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition w-full sm:w-auto text-center">Contact Production Office</Link>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">
              &copy; 2024 The Director. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

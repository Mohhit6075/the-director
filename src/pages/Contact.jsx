import { BsTelephone } from "react-icons/bs";
import { GoMail } from "react-icons/go";

export default function Contact() {
  return (
    <div className=" max-w-7xl w-[90%] mt-20 py-20 mx-auto flex items-center justify-center">
      <div className="w-full flex flex-col lg:flex-row gap-8">
        {/** Contact Info Panel */}
        <div className="w-full lg:w-[340px] bg-white text-black p-8 rounded shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#fd4444] rounded-full flex items-center justify-center text-white shrink-0">
                <BsTelephone size={18} />
              </div>
              <h3 className="font-bold text-base tracking-wide">Call To Us</h3>
            </div>
            <p className="text-sm tracking-wide">
              We are available 24/7, 7 days a week.
            </p>
            <p className="text-sm font-medium">Phone: +8801611112222</p>
          </div>

          <hr className="border-gray-300 my-8" />

          {/* Write To US */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 ">
              <div className="w-10 h-10 bg-[#fd4444] rounded-full flex items-center justify-center text-white shrink-0">
                <GoMail size={18} />
              </div>
              <h3 className="font-bold text-base tracking-wide">Write To Us</h3>
            </div>
            <p className="text-sm tracking-wide">
              Fill out our form and we will contact you within 24 hours.
            </p>
            <p className="text-sm font-medium">
              Emails: customer@exclusive.com
            </p>
            <p className="text-sm font-medium">Emails: support@exclusive.com</p>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="flex-1 bg-white p-4 py-6 md:p-6 lg:p-8 rounded order-first lg:order-none shadow-lg text-black">
          <form className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                className="w-full bg-gray-200 rounded px-4 py-3.5 outline-none focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-500 text-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email *"
                className="w-full bg-gray-200 rounded px-4 py-3.5 outline-none focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-500 text-sm"
                required
              />
              <input
                type="tel"
                placeholder="Your Phone *"
                className="w-full bg-gray-200 rounded px-4 py-3.5 outline-none focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-500 text-sm"
                required
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows="8"
              className="w-full bg-gray-200 rounded px-4 py-3.5 outline-none focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-500 text-sm resize-none"
            ></textarea>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#fd4444] text-white px-10 py-3.5 rounded hover:bg-[#c93e3e] transition-all font-medium"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

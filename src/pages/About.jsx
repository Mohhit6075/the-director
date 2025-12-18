import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { GoShieldCheck } from "react-icons/go";

export default function About() {
  return (
    <div className="max-w-7xl w-[80%] min-h-screen mx-auto mt-20 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
        <div className="text-white order-last">
          <h1 className="text-3xl md:text-3xl lg:text-5xl  text-[#ffad33] font-extrabold mb-2 lg:mb-6 tracking-wider">
            Our Story
          </h1>
          <p className="text-white/80 mb-2 lg:mb-6 leading-relaxed text-base lg:text-lg tracking-wide">
            Launched in 2025, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p className="text-white/80 leading-relaxed text-base lg:text-lg tracking-wide">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img
            src="/images/ui/hero_bg.jpg"
            alt="About Exclusive"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center hover:bg-white/10 transition-all group">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#fd4444] transition-colors">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <TbTruckDelivery className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">10.5k</h3>
          <p className="text-white/70 text-sm">Sellers active on our site</p>
        </div>

        <div className="bg-[#fd4444] rounded-lg p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <RiCustomerService2Line className="text-black text-2xl" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">33k</h3>
          <p className="text-white/90 text-sm">Monthly Product Sale</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center hover:bg-white/10 transition-all group">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#fd4444] transition-colors">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <GoShieldCheck className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">45.5k</h3>
          <p className="text-white/70 text-sm">Customers active on our site</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center hover:bg-white/10 transition-all group">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#fd4444] transition-colors">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <TbTruckDelivery className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">25k</h3>
          <p className="text-white/70 text-sm">Annual gross sale on our site</p>
        </div>
      </div>

      {/* Services Section */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:p-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
              <TbTruckDelivery className="text-white text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#ffad33] mb-3 tracking-wide">
            FREE AND FAST DELIVERY
          </h3>
          <p className="text-yellow-500/90 text-sm">
            Free delivery for all orders over $140
          </p>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
              <RiCustomerService2Line className="text-white text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#ffad33] mb-3 tracking-wide">
            24/7 CUSTOMER SERVICE
          </h3>
          <p className="text-yellow-500/90 text-sm">
            Friendly 24/7 customer support
          </p>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
              <GoShieldCheck className="text-white text-3xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#ffad33] mb-3 tracking-wide">
            MONEY BACK GUARANTEE
          </h3>
          <p className="text-yellow-500/90 text-sm">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
}

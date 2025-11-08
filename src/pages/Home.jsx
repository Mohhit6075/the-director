
import { MdChevronRight } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Footer } from "../components/layout/Footer";
import { Navbar } from "../components/layout/Navbar";
export default function Home () {

  return (
    <div>
        {/* Navigation */}
      <Navbar />
   
    <div className="min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat ">
      
      
      <section className="relative min-h-[60vh] md:h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-95"
          style={{ backgroundImage: `url("/images/hero_bg.jpg")` }}
        />
        <div className=" z-10 px-8 py-3 relative top-52 text-center text-[#212529] bg-[#be9b6c] hover:bg-yellow-700 rounded-full text-lg font-medium transition transform hover:scale-105">
          

            Discover More

        </div>
      </section>

      {/* Unleash Your Potential Section */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-md w-full flex flex-col gap-6">
            <h2 className="text-3xl md:text-6xl font-semibold text-[#f6f6f6] mb-6">
              Unleash your
              <br />
              potential.
            </h2>
            <p className="text-[#e8e8e8] text-[17px] font-light">
              Step into a new world where creativity meets innovation and your
              vision becomes reality. Experience the extraordinary with our
              cutting-edge solutions.
            </p>
            <button className="bg-[#be9b6c] w-fit hover:bg-yellow-700 px-6 py-3 rounded-full text-xl text-[#212529] flex items-center gap-2 transition">
              Start Now <MdChevronRight className="w-5 h-5 mt-1" />
            </button>
          </div>
          <div className="w-full mt-4 ">
              <div className="relative rounded-2xl">
                <div className="max-w-lg px-6 md:px-12 h-72 md:h-[30rem]">
                  <img
                    src="https://wallpapers.com/images/hd/trendy-men-s-clothing-store-fnk73p47fq9fj501.jpg"
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <img
                  src="https://www.permanentstyle.com/wp-content/uploads/2020/08/T-shirts-at-Clutch-Cafe-london-500x625.jpg"
                  alt=""
                  className="h-44 w-36 md:h-60 md:w-48 absolute right-4 md:right-8 top-6 md:top-12 object-cover rounded-md"
                />
                <div className="md:absolute relative md:-left-32 md:bottom-16 max-w-lg flex flex-col gap-3 bg-white p-6 rounded-md border-l-4 border-[#be9b6c] shadow-lg">
                <p className="text-gray-700">
                  "This is a game changer in our industry. The innovation and
                  creativity behind this platform is truly remarkable."
                </p>
                <span className="flex gap-3">
                  <img
                    src="https://thedirector.odoo.com/web/image/website.s_blockquote_default_image"
                    alt=""
                    className="w-10 h-10 bg-gray-300 rounded-full"
                  ></img>
                  <span>
                    <h1 className="font-semibold text-gray-800">
                      Alex Johnson
                    </h1>
                    <p className="text-sm text-gray-600">Lead Designer</p>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Experience Section */}
      <section className="pt-20 bg-[#e8e7e6]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#b29165] font-medium text-4xl">
              Full Experience
            </h1>

            <p className="text-gray-950">
              Our clothing is designed to make you feel confident and stylish.
              From casual wear to formal attire, we have everything you need to
              elevate your wardrobe.
            </p>
            <p className="text-gray-950">
              Start with the customer – find out what they need and give it to
              them.
            </p>
            <a
              href=""
              className="bg-[#140f09] w-fit hover:bg-black px-6 py-3 rounded-full text-white font-medium transition"
            >
              Find Out More
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="https://thedirector.odoo.com/web_editor/shape/theme_kea/s_text_image.svg?c1=o-color-1"
              alt=""
            />
          </div>
        </div>
        <div className="relative pt-56">
          <img src="/images/22_001.svg" alt="" className="absolute bottom-0" />
        </div>
      </section>

      {/* Fashion Section */}
      <section className="pb-80 pt-20 relative text-white bg-[#140f09] backdrop-opacity-20">
        <div className="z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Step into a new world of
            <br />
            fashion
          </h2>
          <p className="text-md text-gray-300 mb-12 max-w-2xl mx-auto">
            Put yourself at the center of an extraordinary fashion universe with
            exclusive collections.
          </p>
          <div className="w-80 z-10 h-48 rounded-2xl mx-auto scale-125 pt-10">
            <img
              src="https://thedirector.odoo.com/web_editor/image_shape/website.s_media_list_default_image_1/web_editor/geometric_round/geo_round_blob_medium.svg"
              alt=""
              className="scale-150 z-10"
            />
          </div>
        </div>
        <div className="absolute -z-1 bottom-0 w-full flex justify-center">
          <img src="/images/03.svg" alt="" />
          <p className="absolute bottom-20 text-gray-200">
            Watch as your personal style comes alive all around you, with a
            seamless fit wherever you go.
          </p>
        </div>
      </section>

      {/* Style World Section */}
      <section className="pt-20 relative bg-[#e8e7e6]">
        <div className="relative">
          <img src="/images/2.svg" alt="" className="absolute -top-20" />
        </div>
        <div className="max-w-7xl pt-60 pb-28 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img
              src="https://thedirector.odoo.com/web_editor/shape/theme_kea/s_image_text.svg?c1=o-color-1"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[#b29165] font-medium text-4xl">
              Enter a new world of style
            </h1>

            <p className="text-gray-950">
              Our clothing is designed to make you feel confident and stylish.
              From casual wear to formal attire, we have everything you need to
              elevate your wardrobe.
            </p>
            <p className="text-gray-950">
              Start with the customer – find out what they need and give it to
              them.
            </p>
            <a
              href=""
              className="bg-[#140f09] w-fit hover:bg-black px-6 py-3 rounded-full text-white font-medium transition"
            >
              Find Out More
            </a>
          </div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="h-[90vh] w-full ">
        <div className="w-full h-full flex items-center ">
          <div className="h-full w-full flex items-center lg:flex-row flex-col gap-0 group">
            {["Bollywood", "Hollywood", "Tollywood"].map((title, index) => (
              <div
                key={index}
                className={`h-full
                } shadow-2xl group-hover:shadow-3xl transition duration-300 flex items-center relative`}
              >
                <div
                  className="absolute inset-0 z-1 brightness-50 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url("https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?cs=srgb&dl=pexels-markus-winkler-1430818-3812433.jpg&fm=jpg")`,
                  }}
                ></div>

                <div className=" text-white z-10">
                  <h3 className="text-4xl font-bold mb-2 text-center">
                    {title}
                  </h3>
                  <p className="text-md opacity-90 mb-4 text-center px-20">
                    No matter who you are, with a growing selection of styles
                    and sizes, there are no limits to how you can express
                    yourself through fashion.
                  </p>
                  <a className="bg-[#be9b6c] mx-auto w-fit hover:bg-yellow-700 px-4 py-2 rounded-full text-md text-[#212529] flex items-center gap-2 transition">
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style & Comfort Section */}
      <section className="py-20 bg-[#e8e7e6]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-64 ">
              <div className="w-full h-full scale-125">
                <img
                  src="https://thedirector.odoo.com/web_editor/image_shape/website.s_media_list_default_image_3/web_editor/geometric_round/geo_round_blob_medium.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Style & Comfort
            </h2>
            <p className="text-gray-900 text-md mb-6">
              We only use high-quality fabrics and materials. We ensure you
              receive the best quality clothing available at competitive prices.
              All our products come with a satisfaction guarantee.{" "}
            </p>
            <a className=" w-fit  text-md text-[#765a34] flex items-end gap-2 ">
              Discover New Styles{" "}
              <MdChevronRight className="w-5 h-5 text-[#765a34]" />
            </a>
            <div className="absolute left-60 w-fit grid grid-cols-5 gap-3">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-[#a7a4a3] "></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tailored Design Section */}
      <section className="py-20 bg-[#e8e7e6]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tailored Design
            </h2>
            <p className="text-gray-900 text-md mb-6">
              We only use high-quality fabrics and materials. We ensure you
              receive the best quality clothing available at competitive prices.
              All our products come with a satisfaction guarantee.{" "}
            </p>
          </div>
          <div className=" scale-125">
            <img
              src="https://thedirector.odoo.com/web_editor/image_shape/website.s_media_list_default_image_2/web_editor/geometric_round/geo_round_blob_medium.svg"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Natural Fit Section */}
      <section className="py-24 bg-[#e8e7e6]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className=" scale-125">
            <img
              src="https://thedirector.odoo.com/web_editor/image_shape/website.s_media_list_default_image_1/web_editor/geometric_round/geo_round_blob_medium.svg"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Natural Fit
            </h2>
            <p className="text-gray-900 text-md mb-4">
              Our natural fit philosophy ensures that every piece moves with
              you, providing unparalleled comfort without compromising on style.
              Experience clothing that feels like a second skin.
            </p>
            <a className=" w-fit text-md text-[#765a34] flex items-end gap-2 ">
              Continue Reading{" "}
              <FaArrowRightLong className="w-5 h-5 text-[#765a34]" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}

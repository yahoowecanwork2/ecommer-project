import heroImg from "../../img/heroImg.jpg";

export default function Contact() {
  return (
    <section className="min-h-screen bg-stone-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Image */}
        <div>
          <img
            src={heroImg}
            alt="Living Room"
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-4">
            Contact Us
          </h1>

          <p className="text-gray-600 text-lg mb-10">
            Let's start transforming your space—contact us today!
          </p>

          {/* Address */}
          <div className="flex gap-4 mb-8">
            <div className="text-3xl">📍</div>
            <div>
              <h3 className="text-2xl font-semibold text-stone-800">
                Office Address
              </h3>
              <p className="text-gray-600">
                4517 Washington Ave, Manchester, Kentucky
                <br />
                New Delhi, India
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 mb-8">
            <div className="text-3xl">✉️</div>
            <div>
              <h3 className="text-2xl font-semibold text-stone-800">
                Company Website / Email
              </h3>
              <p className="text-gray-600">www.noblenest.com</p>
              <p className="text-gray-600">support@noblenest.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex gap-4">
            <div className="text-3xl">📞</div>
            <div>
              <h3 className="text-2xl font-semibold text-stone-800">
                Phone Number
              </h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600">+91 91234 56789</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function NewsletterPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto mt-16">
        <div className="grid md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
            alt="room"
            className="w-full h-full object-cover"
          />

          <div className="bg-teal-50 flex flex-col justify-center p-12">
            <h2 className="text-4xl font-serif text-slate-700">
              Join Our Newsletter
            </h2>

            <p className="text-gray-600 mt-4">
              Receive exclusive deals, discounts and offers.
            </p>

            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="border px-4 py-3 w-full rounded"
              />

              <button className="bg-teal-700 text-white px-6 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl">
                INVODO
              </h3>

              <p className="text-gray-500 mt-3">
                4517 Washington Ave,
                Manchester, Kentucky
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                My Account
              </h4>

              <ul className="space-y-2 text-gray-500">
                <li>Sign In</li>
                <li>Register</li>
                <li>Order Status</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Help
              </h4>

              <ul className="space-y-2 text-gray-500">
                <li>Support</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Legal Stuff
              </h4>

              <ul className="space-y-2 text-gray-500">
                <li>Privacy Policy</li>
                <li>Terms</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
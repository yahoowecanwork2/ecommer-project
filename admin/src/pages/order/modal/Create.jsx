import React, { useState } from "react";
import { orderApis } from "../../../apis/order";

const Create = ({ closemodal, fetchorder }) => {
  const [formData, setFormData] = useState({
    customername: "",
    phoneno: "",
    emailid: "",
    shippingaddress: "",
    pincode: "",
    alternateno: "",
    paymentType: "cod",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try{
//         const res = await orderApis.
//     }
//   };

  return (
    <div className="fixed inset-0 z-50 min-h-screen overflow-y-auto bg-black/40 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl mt-60 rounded-3xl shadow-2xl overflow-y-auto ">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Create Product</h2>

          <button className="border px-2" onClick={closemodal}>
            X
          </button>
        </div>

        <form className="space-y-4 mx-4 my-3 ">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Customer Name
            </label>

            <input
              type="text"
              name="customername"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Customer Name"
              value={formData.customername}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Phone No.
            </label>

            <input
              type="text"
              name="phoneno"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Phone Number"
              value={formData.phoneno}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Email Id
            </label>

            <input
              type="email"
              name="emailid"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Email"
              value={formData.emailid}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Shipping Address
            </label>

            <textarea
              name="shippingaddress"
              placeholder="Shipping Address"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              value={formData.shippingaddress}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              PinCode
            </label>

            <input
              type="text"
              name="pincode"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Alternate Number
            </label>

            <input
              type="text"
              name="alternateno"
              className="w-full mt-2 border rounded-xl px-4 py-3"
              placeholder="Alternate Number"
              value={formData.alternateno}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Payment Type
            </label>

            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="online">Online Payment</option>
            </select>
          </div>

          <button type="submit"  className="w-full bg-[#006EFF]  transition-all duration-300 text-white py-3 rounded-xl font-medium">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;

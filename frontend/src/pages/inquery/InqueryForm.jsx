import React from "react";
import Layout from "../../../../admin/src/componets/common/Layout";
import { inquiryApi } from "../../apis/inquiry";
import { useState } from "react";
import toast from "react-hot-toast";

const InqueryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });


   const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const createInquery = async (e) => {
    e.preventDefault();

    try {
      const res = await inquiryApi.create(formData);

      if(res.success){
        toast.success("Inquiry submitted successfully");
      }

      // reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto  px-10 py-10">
      <div className=" rounded-md p-6 shadow-sm bg-white  ">
        <h2 className="text-3xl font-bold mb-2">Inquiry Form</h2>
        <p className="text-gray-600 mb-8">
          Fill in the details below and we'll get back to you soon.
        </p>

        <form className="space-y-5" onSubmit={createInquery} >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full border rounded-md px-4 py-2 outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md px-4 py-2 outline-none focus:border-black resize-none"
            ></textarea>
          </div>

          <button

            type="submit"
            style={{ backgroundColor: "var(--color-teal-700)" }}
            className=" text-white px-8 py-3 rounded-md  transition cursor-pointer"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default InqueryForm;

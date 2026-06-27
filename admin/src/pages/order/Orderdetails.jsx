import React from "react";
import Layout from "../../componets/common/Layout";
import { useLocation } from "react-router-dom";

const Orderdetails = () => {
  const location = useLocation();

  const order = location.state?.order;
  return (
    <Layout>
      <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between rounded-lg border bg-white p-4">
        <div>
          <h1 className="text-2xl font-bold">
            Order #{order.orderno}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Order Date : {order.Date}
          </p>
        </div>

        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-600 capitalize">
          {order.status}
        </span>
      </div>

      
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Customer Details
          </h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">Name :</span>{" "}
              {order.customername}
            </p>

            <p>
              <span className="font-medium">Phone :</span>{" "}
              {order.phoneno}
            </p>

            <p>
              <span className="font-medium">Email :</span>{" "}
              {order.emailid}
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Shipping Details
          </h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">Address :</span>{" "}
              {order.shippingaddress}
            </p>

            <p>
              <span className="font-medium">Pincode :</span>{" "}
              {order.pincode}
            </p>

            <p>
              <span className="font-medium">
                Alternate No :
              </span>{" "}
              {order.alternateno || "-"}
            </p>
          </div>
        </div>
      </div>

      
      <div className="mt-5 rounded-lg border bg-white p-5">
        <h2 className="mb-5 text-lg font-semibold">
          Order Items
        </h2>

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.imageurl}
                alt={item.name}
                className="h-24 w-24 rounded-md border object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600">
                  Size : {item.size}
                </p>

                <p className="text-sm text-gray-600">
                  Quantity : {item.quantity}
                </p>

                <p className="mt-1 font-medium">
                  ₹{item.price}
                </p>
              </div>

              <div className="font-semibold">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Payment Details
          </h2>

          <div className="space-y-3">
            <p>
              <span className="font-medium">
                Payment Type :
              </span>{" "}
              {order.paymentType}
            </p>

            <p>
              <span className="font-medium">
                Payment Status :
              </span>{" "}
              {order.paymentstatus}
            </p>
          </div>

          <hr className="my-4" />

          <div className="space-y-2">
            <p>
              <span className="font-medium">
                Calculated Amount :
              </span>{" "}
              ₹{order.calculatedamount}
            </p>

            <p>
              <span className="font-medium">
                Discount :
              </span>{" "}
              ₹{order.discount}
            </p>

            <p className="pt-2 text-lg font-bold text-green-600">
              Order Total : ₹{order.ordertotal}
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">
            Order Status
          </h2>

          <p className="mb-4">
            Current Status :
            <span className="ml-2 font-semibold capitalize">
              {order.status}
            </span>
          </p>

          <select
            defaultValue={order.status}
            className="w-full rounded-md border p-2 outline-none"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="intransit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>

          <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Update Status
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Orderdetails;

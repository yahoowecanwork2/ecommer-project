import Order from "../models/Order.js";
import { Payment } from "../models/Payment.js";
import { generateOrderId } from "../utils/idGenerate.js";



//------------------------------ user controller ---------------------------
// use rozer pay payment method check out payment

export const checkoutPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }
    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1
    };
    const order = await instance.orders.create(options);
    return res.status(201).json({
      success: true,
      message: "Proceeding for payment",
      order
    });
  } catch (error) {
    console.error("Checkout Payment Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
  


// firstly make payment verify then place save order in our data base 
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      customername,
      phoneno,
      emailid,
      shippingaddress,
      pincode,
      alternateno,
      calculatedamount,
      discount,
      ordertotal,
      paymentType,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order items required",
      });
    }
    const order = await Order.create({
      items,
      customerId:req.id,
      orderno:generateOrderId(),
      customername,
      phoneno,
      emailid,
      shippingaddress,
      pincode,
      alternateno,
      calculatedamount,
      discount,
      ordertotal,
      paymentType,
      paymentstatus: paymentType === "online" ? "complete" : "pending",
    });
    if (paymentType === "online") {
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Razorpay payment details required",
        });
      }
      const payment = await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId: order._id,
        customerId:order.customerId,
      });
      order.payment = payment._id;
      await order.save();
    }
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};;




// my orders 
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalOrders = await Order.countDocuments(query);
    const orders = await Order.find({ customerId: userId })
      .select(`
        orderno 
        customername 
        phoneno 
        shippingaddress 
        pincode 
        ordertotal 
        delivereddate 
        status 
        cancelStatus 
        return 
        createdAt
        items.name 
        items.quantity 
        items.itemId 
        items.itemModel
      `)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      orders
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};




// get single order 
export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId) .select(`
  -returnremark
  `)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .populate({
    path: "items.item",
    select: "name price image slug"
  })
      .populate("customerId", "name email")
      .populate("payment").lean();
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const updateOrderCancelStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { cancelStatus } = req.body;
    const updateData = { cancelStatus };
    if (cancelStatus === "yes") {
      updateData.status = "canceled";
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};




//------------------------------------ admin routes -------------------------------------

// order stats 
export const orderStats = async (req, res) => {
    try{
        const totalOrders = await Order.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );
    const lastMonthOrders = await Order.countDocuments({
        createdAt: { $gte: oneMonthAgo },
    });
    const pending = (await Order.find({status: "pending" })).length
    const processing = (await Order.find({status: "processing" })).length
    const dispatched = (await Order.find({status: "dispatched" })).length
    const intransit= (await Order.find({status: "intransit" })).length
    const delivered = (await Order.find({status: "delivered" })).length
    const canceled = (await Order.find({status: "canceled" })).length
    const returned = (await Order.find({return: "yes" })).length
    return res.status(201).json({
        success:true,
        status: "success",
        message: "Order fetched successfully",
        totalOrders,
        lastMonthOrders,
        pending,
        processing,
        dispatched,
        intransit,
        delivered,
        canceled,
        returned
    })
    }catch(error){
      console.error(error);
      return res.status(500).json({
      success: false,
      message: "Failed to get stats"
    });
    }}



// get all orders 
export const allUsersOrders = async (req, res) => {
    try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Get total count for frontend pagination
    const totalOrders = await Order.countDocuments();
    // Fetch paginated orders
    const orders = await Order.find()
      .select(`
        orderno 
        customername 
        phoneno 
        shippingaddress 
        pincode 
        ordertotal 
        delivereddate 
        status 
        cancelStatus 
        return 
        createdAt
        items.name 
        items.quantity 
        items.itemId 
        items.itemModel
      `)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
      orders
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}



// get single order 
export const getUserOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId) .select(`
    orderno 
    customerId
    customername 
    phoneno 
    shippingaddress 
    pincode 
    ordertotal 
    delivereddate 
    status 
    cancelStatus 
    return 
    createdAt
    items
  `)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .populate({
    path: "items.item",
    select: "name price image slug" // select only needed fields
  })
      .populate("customerId", "name email")
      .populate("payment").lean();
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      order,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



// get order on the bases of status 
export const filterByStatus = async (req, res) => {
  try {
   const {status} = req.body
   const orderCount = (await Order.find({status: status })).length
    const orders = await Order.find({ status:status })
      .select(`
        orderno 
        customername 
        phoneno 
        shippingaddress 
        pincode 
        ordertotal 
        delivereddate 
        status 
        cancelStatus 
        return 
        createdAt
        items.name 
        items.quantity 
        items.itemId 
        items.itemModel
      `)
      .sort({ createdAt: -1 }) 
      .lean();
    return res.status(200).json({
      success: true,
      orderCount,
      orders
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// filter by date 
export const filterOrderByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    const orders = await Order.find(filter)
      .select(`
        orderno 
        customername 
        phoneno 
        shippingaddress 
        pincode 
        ordertotal 
        delivereddate 
        status 
        cancelStatus 
        return 
        createdAt
        items.name 
        items.quantity 
        items.itemId 
        items.itemModel
      `)
      .sort({ createdAt:-1 })
    const totalCount = await Order.countDocuments(filter);
    return res.status(200).json({
      success: true,
      totalCount,
      returned: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Filter by date failed:", error);
    return res.status(500).json({
      success: false,
      message: "Error while filtering orders",
      error: error.message,
    });
  }
};



export const filterByReturnStatus = async (req, res) => {
  try {
   const {returnStatus} = req.body
   const orderCount = (await Order.find({return: returnStatus })).length
    const orders = await Order.find({ return:returnStatus })
      .select(`
        orderno 
        customername 
        phoneno 
        shippingaddress 
        pincode 
        ordertotal 
        delivereddate 
        status 
        cancelStatus 
        return 
        createdAt
        items.name 
        items.quantity 
        items.itemId 
        items.itemModel
      `)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean();
    return res.status(200).json({
      success: true,
      orderCount,
      orders
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const filterByCancelStatus = async (req, res) => {
  try {
   const {cancelStatus} = req.body
   const orderCount = (await Order.find({cancelStatus: cancelStatus })).length
    const orders = await Order.find({ cancelStatus:cancelStatus})
      .select(`
        orderno 
        customername 
        phoneno 
        shippingaddress 
        pincode 
        ordertotal 
        delivereddate 
        status 
        cancelStatus 
        return 
        createdAt
        items.name 
        items.quantity 
        items.itemId 
        items.itemModel
      `)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean();
    return res.status(200).json({
      success: true,
      orderCount,
      orders
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// update status 
  export const updateOrderStatus = async (req, res) => {
    try{
    const { orderId } = req.params;
    const { status } = req.body;
    // console.log(id)
    // console.log(status)
    const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );
    res.status(201).json({
        status: "success",
        message: "Order status updated successfully",
        order
    })
        }catch(error){
     console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order"
    });
  }}

   

// update return status 
  export const updateReturnStatus = async (req, res) => {
    try{
    const { orderId } = req.params;
    const { returnStatus } = req.body;
    // console.log(id)
    // console.log(status)
    const order = await Order.findByIdAndUpdate(
        orderId,
        { return :returnStatus},
        { new: true }
    );
    res.status(201).json({
        status: "success",
        message: "Order status updated successfully",
        order
    })
        }catch(error){
     console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get unread inqueries"
    });
  }}




  
import { Payment } from "../models/Payment.js";


export const allPayments = async (req, res, next) => {
   try {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  const payments = await Payment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
      const now = new Date();
      const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
      );
      const lastMonthPayments = await Payment.countDocuments({
          createdAt: { $gte: oneMonthAgo },
      });

  res.status(200).json({
      payments,
      lastMonthPayments
  });
   }
   catch (err) {
     console.log(err);
   }
}



// ------------------- filter paymemnts ----------------
export const filterPayment = async (req, res) => {
  const {search} = req.params;
  // console.log(keyword)
  const payments = await Payment.find({razorpay_payment_id:search})
  if(payments.length <= 0){
      res.status(201).json({
          status: "success",
          message: "No payment Found according to this field",
          payments : null
      })
  }
  res.status(201).json({
      status: "success",
      message: "fetched successfully",
      payments,
  })
}
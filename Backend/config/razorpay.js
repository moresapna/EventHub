import Razorpay from "razorpay";

console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: "rzp_test_SqlqmCEB1QyWIr",
  key_secret: "BUib7DW1bobgEcsPgB3u4L00",
});

export default razorpay;
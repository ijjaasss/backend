import { instance } from "../server.js"
import crypto from 'crypto'

export const checkout = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount provided.",
      });
    }

    const options = {
      amount: amount , 
      currency: "INR",
      receipt: `receipt_${Math.random()}`, // Unique receipt ID
      notes: {
        description: "Order for online shopping",
      },
    };

  
    
    // Await the Razorpay API request
    const order = await instance.orders.create(options); // This line is the critical part to await



    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order.",
      error: error.message,
    });
  }
};

export const paymentverification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Log incoming request for debugging purposes
  console.log('Payment Verification Request:', req.body);


  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: 'Missing required parameters',
    });
  }

  // Create the body string that Razorpay will use for signature verification
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  
  // Generate the expected signature using your Razorpay Secret Key
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
    .update(body)
    .digest('hex');

  // Log received and generated signatures for debugging
const isAuthentic=expectedSignature === razorpay_signature
if(isAuthentic){
  res.redirect(`http://localhost:3000/pyment?reference=${razorpay_payment_id}`)
}else{
    res.status(400).json({
        success: false,
       
      });
}



};

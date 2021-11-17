const Order = require("./order.model");
const mail = require("../../mails/mail.service");

async function getOrders(req, res) {
  // READ
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getOrderDetailed(req, res){
  // READ
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("orderItems.productId");
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

async function createOrder(req, res, next) {
  // CREATE
  try {
    const { ...orderInfo } = req.body;
    const orderCount = await Order.count();
    const orderNumber = `OR-${orderCount}`
    console.log("ORDERINFO: ", orderInfo);
    const order = new Order({...orderInfo, orderNumber});
    await order.save();
    req.body.orderNumber = orderNumber;
    req.body.orderId = order._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

async function updateStatus(req, res) {
  // UPDATE
  try {
    const { id } = req.params;
    const { status: orderStatus } = req.body;
    console.log(id, orderStatus);
    const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
    const { clientEmail, orderNumber } = order;
    await mail.orderStatusChangeFunction(orderNumber, orderStatus, req.body.message, clientEmail);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

module.exports = { getOrders, createOrder, getOrderDetailed, updateStatus };
// Order routes
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const ordersFilePath = path.join(__dirname, "../data/orders.txt");

router.post("/place-order", (req, res) => {
  const { name, phone, address, items, totalAmount } = req.body;

  if (!name || !phone || !address || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const orderText = `
------------------------
Name: ${name}
Phone: ${phone}
Address: ${address}
Items: ${items.join(", ")}
Total Amount: ₹${totalAmount || 0}
Date: ${new Date().toLocaleString()}
------------------------

`;

  fs.appendFile(ordersFilePath, orderText, err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to save order" });
    }

    res.status(200).json({ message: "Order saved successfully" });
  });
});

module.exports = router;
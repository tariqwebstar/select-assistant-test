// Retrieve all users who have placed at least one order in the past 30 days:
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
db.orders.aggregate([
  { $match: { orderDate: { $gte: thirtyDaysAgo } } },
  { $group: { _id: "$userId" } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  { $replaceRoot: { newRoot: "$user" } },
]);

// Update the stock quantity of a specific product when an order is placed
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const orderId = 99999;
  const order = db.orders.findOne({ _id: orderId });

  for (const item of order.products) {
    db.products.updateOne(
      { _id: item.productId },
      { $inc: { stockQuantity: -item.quantity } }
    );
  }

  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}

// Retrieve the top 5 best-selling products based on order quantities
db.orders.aggregate([
  { $unwind: "$products" },
  {
    $group: {
      _id: "$products.productId",
      totalQuantity: { $sum: "$products.quantity" },
    },
  },
  { $sort: { totalQuantity: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  { $unwind: "$productDetails" },
  {
    $project: {
      _id: 0,
      productName: "$productDetails.name",
      totalQuantitySold: "$totalQuantity",
    },
  },
]);

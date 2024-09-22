// Users Collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password"],
      properties: {
        username: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email address and is required",
        },
        password: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        orderHistory: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
            description: "must be an objectId referencing an order",
          },
        },
      },
    },
  },
});

// Products Collection
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category", "stockQuantity"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        price: {
          bsonType: "number",
          minimum: 0,
          description: "must be a non-negative number and is required",
        },
        category: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        stockQuantity: {
          bsonType: "int",
          minimum: 0,
          description: "must be a non-negative integer and is required",
        },
      },
    },
  },
});

// Orders Collection
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "products", "totalPrice", "orderDate"],
      properties: {
        userId: {
          bsonType: "objectId",
          description: "must be an objectId referencing a user and is required",
        },
        products: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["productId", "quantity"],
            properties: {
              productId: {
                bsonType: "objectId",
                description:
                  "must be an objectId referencing a product and is required",
              },
              quantity: {
                bsonType: "int",
                minimum: 1,
                description: "must be a positive integer and is required",
              },
            },
          },
        },
        totalPrice: {
          bsonType: "number",
          minimum: 0,
          description: "must be a non-negative number and is required",
        },
        orderDate: {
          bsonType: "date",
          description: "must be a date and is required",
        },
      },
    },
  },
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.products.createIndex({ name: 1 });
db.orders.createIndex({ userId: 1, orderDate: 1 });
db.orders.createIndex({ "products.productId": 1 });

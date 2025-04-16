# **Essen Welt Backend Integration**

This guide explains the **backend architecture**, **API endpoints**, **authentication flow**, and **database models** used in EssenWelt.

---

## **📂 Project Structure**

```bash
app/
  ├───── app.js            # Express app setup
  ├───── server.js         # Server initialization

src
  ├── config/
    ├───── index.js        # Configuration files (DB, Stripe, JWT)

    ├── error/
    ├───── AppError.js     # Error Instance

    ├── middlewares/      # Auth validation, error handling

  ├── modules/              # Models, Controllers
  ├── controllers/          # Route handlers (Auth, Menu, Orders, etc.)
  ├── models/               # MongoDB schemas (User, Menu, Booking, etc.)
  ├── routes/               # API endpoint definitions
  ├── utils/                # Helper functions (JWT, Stripe, email)
```

---

## **🔧 Tech Stack**

| **Component**      | **Technology**      |
| ------------------ | ------------------- |
| **Framework**      | Express.js          |
| **Database**       | MongoDB (Atlas)     |
| **ORM**            | Mongoose            |
| **Authentication** | Firebase Auth + JWT |
| **Payments**       | Stripe API          |

---

## **🚀 API Endpoints**

### **1. Menu Management (`/api/v1/menus`)**

| **Endpoint** | **Method** | **Description**          |
| ------------ | ---------- | ------------------------ |
| `/`          | GET        | Fetch all menu items     |
| `/popular`   | GET        | Filter by popular items" |
| `/admin`     | POST       | Admin-only: Add new item |
| `/admin/:id` | PUT        | Admin-only: Modify item  |

**Example Response (GET `/api/v1/menus`):**

```json
{
  "data": [
    {
      "_id": "661a3d...",
      "name": "Margherita Pizza",
      "category": "mains",
      "price": 12.99,
      "image": "pizza.jpg"
    }
  ]
}
```

---

### **2. Table Bookings (`/api/v1/bookings`)**

| **Endpoint** | **Method** | **Description**          |
| ------------ | ---------- | ------------------------ |
| `/`          | POST       | Book a table             |
| `/:id`       | PUT        | Update reservation       |
| `/`          | GET        | User’s upcoming bookings |

**Example Booking Request (POST `/api/v1/bookings`)**

```json
{
  "date": "2025-05-20",
  "numberOfPeople": 4,
  "startTime": "19:00",
  "endTime": "22:00"
}
```

---

### **3. Orders (`/api/v1/orders`)**

| **Endpoint** | **Method** | **Description**   |
| ------------ | ---------- | ----------------- |
| `/`          | POST       | Place a new order |
| `/`          | GET        | User's orders     |

---

## **🗃️ Database Models**

### **1. Menu (`modules/menu/menu-model.js`)**

```javascript
const menuItemSchema = new Schema(
  {
    name: { type: String, required: true },
    recipe: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ['starters', 'mains', 'desserts', 'beverages'],
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    popular: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);
```

### **2. Order (`modules/order/order-model.js`)**

```javascript
const orderSchema = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      itemId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      priceAtOrder: {
        type: Number,
        required: true,
      },
      itemName: {
        type: String,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
  },
});
```

---

## **⚙️ Project Setup**

Follow the steps below to get the project running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/eh-munna/essen-welt-server
cd essen-welt-server
```

### 2. Install Dependencies

```bash
npm install
```

---

## **Environment Variables**

Create a `.env` file:

```env
# DB Configuration
DB_URI= your_db_uri


# Secret Configuration
SECRET_KEY= your_jwt_secret_key


# Salt Rounds
SALT_ROUNDS = any_integer_number;

#CORS_ORIGIN
CORS_ORIGIN= your_defined_origin

#STRIPE_SECRET
STRIPE_SECRET= your_stripe_secret
```

---

## **🚨 Error Handling**

- **Global error middleware** catches and formats errors.
- **HTTP Status Codes**:
  - `401` Unauthorized
  - `403` Forbidden
  - `404` Not Found
  - `500` Server Error

---

## **📌 Deployment Notes**

1. **MongoDB Atlas**: Ensure IP whitelisting and network access.
2. **Stripe**: Make sure to use correct one.
3. **CORS**: Configure allowed origins (e.g., your frontend URL).

---

## **🔍 Need Frontend?**

🔗 [Frontend Repo](https://github.com/eh-munna/essen-welt)

---

## 📬 Contact

Feel free to reach out or connect with me!

<div style="display: flex; gap: 30px;">
   <a href="https://www.linkedin.com/in/eh-munna/">
      <img src="https://img.shields.io/badge/LinkedIn-%230A66C2?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn">
   </a>
   <a href="https://github.com/eh-munna">
      <img src="https://img.shields.io/badge/GitHub-%23121011?style=flat&logo=github&logoColor=white" alt="GitHub">
   </a>
   <a href="mailto:emran.h.munna@gmail.com">
      <img src="https://img.shields.io/badge/emran.h.munna@gmail.com-%23D14836?style=flat&logo=gmail&logoColor=white" alt="Email">
   </a>
</div>

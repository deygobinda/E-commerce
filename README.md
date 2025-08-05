# 🛒 Online Shopping App

A full-stack Online Shopping App application built with modern technologies, featuring user authentication, product management, shopping cart, payment processing, and admin analytics.

![Online Shopping App Screenshot](frontend/public/screenshot-for-readme.png)

## 🚀 Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure authentication with JWT tokens
- **Role-based Access Control** - Customer and Admin roles
- **Session Management** - Redis-based session storage with refresh tokens
- **Password Security** - BCrypt password hashing

### 🛍️ Shopping Experience
- **Product Catalog** - Browse products by categories
- **Product Categories** - Bags, Glasses, Jackets, Jeans, Shoes, Suits, T-shirts
- **Featured Products** - Highlighted products on homepage
- **Shopping Cart** - Add, remove, and update product quantities
- **Persistent Cart** - Cart items saved to user account

### 💳 Payment & Orders
- **Stripe Integration** - Secure payment processing
- **Order Management** - Complete order tracking
- **Purchase Success/Cancel Pages** - User-friendly payment flow

### 🎟️ Promotions
- **Coupon System** - Discount codes with percentage-based discounts
- **Personalized Coupons** - User-specific coupon generation
- **Expiration Management** - Time-limited offers

### 👨‍💼 Admin Features
- **Admin Dashboard** - Comprehensive management interface
- **Product Management** - Create, read, update, delete products
- **Analytics** - Sales insights and data visualization
- **User Management** - View and manage user accounts

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Session Storage:** Redis
- **Payment Processing:** Stripe
- **Image Storage:** Cloudinary
- **Security:** BCrypt, CORS, Cookie Parser

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **UI Components:** Lucide React (icons)
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Notifications:** React Hot Toast
- **Effects:** React Confetti

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh-token` - Refresh access token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart` - Remove all items from cart
- `PUT /api/cart/:id` - Update cart item quantity

### Coupons
- `GET /api/coupons` - Get user coupon
- `POST /api/coupons/validate` - Validate coupon code

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout session
- `POST /api/payments/checkout-success` - Handle successful payment

### Analytics (Admin)
- `GET /api/analytics` - Get sales analytics

## 🎯 Usage

### For Customers
1. **Register/Login** - Create an account or log in
2. **Browse Products** - Explore different categories
3. **Add to Cart** - Select products and quantities
4. **Apply Coupons** - Use discount codes if available
5. **Checkout** - Secure payment through Stripe
6. **Order Confirmation** - Receive order confirmation

### For Admins
1. **Access Admin Dashboard** - Navigate to `/secret-dashboard`
2. **Manage Products** - Add, edit, or remove products
3. **View Analytics** - Monitor sales and performance
4. **Manage Inventory** - Track product availability

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - BCrypt for password security
- **CORS Protection** - Cross-origin request security
- **HTTP-only Cookies** - Secure token storage
- **Input Validation** - Server-side validation
- **XSS Prevention** - Cross-site scripting protection
- **CSRF Protection** - Cross-site request forgery protection



## 🙏 Acknowledgments

- **Stripe** for payment processing
- **Cloudinary** for image management
- **MongoDB** for database solutions
- **React** and **Vite** for frontend development
- **Express.js** for backend framework

---


Built with ❤️ using modern web technologies


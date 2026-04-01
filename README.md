# Swop.it

**Swop.it** is a full-stack marketplace platform dedicated to non-monetary transactions (item trading). It allows users to list items they own, discover items they want, and propose trades seamlessly.

## Tech Stack
* **Frontend:** React.js, Redux, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT) & bcrypt

## Authors

- [Arthur Pires](https://github.com/ArthurBPires)
- [Arthur Baumgardt](https://github.com/4rthb)
- [Tiago Schmidt](https://github.com/tiagotschmidt)

## Features
* **User Authentication:** Secure registration and login.
* **Item Management:** Add, view, and manage available inventory.
* **Trade Proposals:** Offer your items in exchange for other users' items.
* **Offer Management:** Accept, reject, or cancel pending trade offers.
* **User Ratings:** Rate and review users after completing a successful trade.

## Database Schemas
* **User:** Stores user details including `name`, `email`, `password`, `phoneNumber`, `address`, an `isAdmin` flag, and a `ratingList` for peer reviews.
* **Item:** Represents tradeable goods, tracking the item's `name`, `image`, `category`, `description`, what is `expected` in return, its `currentState` (e.g., AVAILABLE or BLOCKED), and the `owner` (User reference).
* **Offer:** Manages trade transactions, containing the `itemDesired`, an array of `itemsOffered`, the `offerState` (e.g., PENDING, ACCEPTED, FINISHED), references to the `desiredOwner` and `offeredOwner`, and review tracking flags.

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* MongoDB instance (local or MongoDB Atlas)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swop.it
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the `/server` directory and add the following:
   ```env
   JWT_SECRET=your_super_secret_jwt_key
   MONGODB_URI=your_mongodb_connection_string
   ```

3. **Start the App**
   * **Backend:** `cd server && npm install && npm start`
   * **Frontend:** `cd client && npm install && npm start`

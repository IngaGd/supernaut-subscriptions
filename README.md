# Supernaut Subscription Status Tracker

A minimal backend service that tracks user subscription status through Stripe webhook events. Determines whether a user currently has access to the product (i.e., whether their subscription is active or canceled).

## Tech Stack

- **Node.js** – JavaScript runtime environment
- **Express.js** – Node.js web application framework
- **Nodemon** – A tool that simplifies Node.js development by automatically restarting your application whenever changes are detected in your project's files
- **File System (fs)** – Tool for file operations in Node.js
- **Postman** – Used for sending mock webhook POST requests (manual testing) as well to check user access with GET method

## Getting Started

### Clone repository in command line

git clone https://github.com/IngaGd/supernaut-subscriptions.git

### Install dependencies

npm install

### Run the server

    - development mode

    npm run dev

    - production mode

    npm start

Server runs at: http://localhost:3000

## Data Structure

Subscription data is stored in subscriptions.json as an array of objects. Each object represents a single subscription entry. The project uses a JSON file as a lightweight in-memory database, as permitted by the task requirements.

Example JSON:

[
{
"subscriptionId": Stripe subscription ID,
"customerId": Stripe customer ID,
"status": current status of the subscription,
"updatedAt": timestamp of the lates change
}
]

## Chosen WebHook Events

According to a task we need to determine whether a user currently has an access, so we need to track customer's subscription status, I've used events below that returns subscription object (with custumer ID and subscription status).

- customer.subscription.created (possible statuses: incomplete, incomplete_expired, trialing, active, past_due, canceled, unpaid, paused)
- customer.subscription.updated (possible statuses: incomplete, incomplete_expired, trialing, active, past_due, canceled, unpaid, paused)
- customer.subscription.deleted (status tipically canceled)

Only when payment is completed, customer gets status "active" and access should be granted.

## API endpoints

### Webhook (POST)

**URL:** /webhook
**Description:** Accepts mock Stripe event data

Example of JSON paylod (minimyzed for the task):

{
"type": "customer.subscription.created",
"data": {
"object": {
"id": "sub_test_123",
"customer": "cus_test_001",
"status": "active"
}
}
}

Copy and paste mock data from the mock_data folder into the Postman request body. Choose raw and set the type to JSON, then use the POST method to simulate creating, deleting, or updating subscriptions. You’ll receive responses and see changes in subscriptions.json.

### Access Check (GET)

**URL:** /access/:customerId  
**Description:** Returns subscription access status

Example response JSON:

{
"access": true,
"status": "active"
}

Paste the URL with a valid customer ID from the mock data and use the GET method to check the customer's access status in the response.

## Assumptions & Limitations

- Each customer may have multiple subscriptions, only the latest is evaluated for access.
- Access is granted only if the latest status is "active", all other statuses deny access.
- No database or retry logic is implemented (by design for simplicity).
- Each event updates the data file with a timestamp via updatedAt to represent changes over time.
- To determine "whether a user currently has access", a separate GET endpoint (/access/:customerId) was created to return the customer's current access status based on the latest subscription data.

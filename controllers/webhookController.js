const { subscriptions, dataFilePath } = require("../utils/subscriptions");
const fs = require("fs");

exports.handleWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "customer.subscription.created") {
      subscriptions.push({
        subscriptionId: data.object.id,
        customerId: data.object.customer,
        status: data.object.status,
        updatedAt: new Date(),
      });
      fs.writeFileSync(
        dataFilePath,
        JSON.stringify(subscriptions, null, 2),
        "utf8"
      );
      return res.status(200).json({ message: "Data saved to json db" });
    }

    if (type === "customer.subscription.deleted") {
      const updatedSubscription = subscriptions.map((subscription) => {
        if (subscription.subscriptionId === data.object.id) {
          return {
            ...subscription,
            status: data.object.status,
            updatedAt: new Date(),
          };
        }
        return subscription;
      });
      fs.writeFileSync(
        dataFilePath,
        JSON.stringify(updatedSubscription, null, 2),
        "utf8"
      );
      return res.status(200).json({ message: "Json db data updated" });
    }

    if (type === "customer.subscription.updated") {
      const updatedSubscription = subscriptions.map((subscription) => {
        if (subscription.subscriptionId === data.object.id) {
          return {
            ...subscription,
            status: data.object.status,
            updatedAt: new Date(),
          };
        }
        return subscription;
      });
      fs.writeFileSync(
        dataFilePath,
        JSON.stringify(updatedSubscription, null, 2),
        "utf8"
      );
      return res.status(200).json({ message: "Json db data updated" });
    }
  } catch (err) {
    console.error("Error writing to data file:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

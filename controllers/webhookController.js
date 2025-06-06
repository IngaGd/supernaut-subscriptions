const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "../data/subscriptions.json");

exports.handleWebhook = async (req, res) => {
  console.log("stripe route");
  try {
    const { type, data } = req.body;
    const fileData = fs.readFileSync(dataFilePath, "utf8");

    let dataJson = [];
    dataJson = JSON.parse(fileData);

    if (type === "customer.subscription.created") {
      dataJson.push({
        subscriptionId: data.object.id,
        customerId: data.object.customer,
        status: data.object.status,
        updatedAt: new Date(),
      });
      fs.writeFileSync(dataFilePath, JSON.stringify(dataJson, null, 2), "utf8");
      return res.status(200).json({ message: "Data saved to json db" });
    }

    if (type === "customer.subscription.deleted") {
      const updatedData = dataJson.map((subscription) => {
        if (subscription.subscriptionId === data.object.id) {
          return {
            ...subscription,
            status: data.object.status,
            updatedAt: new Date(),
          };
        }
        return subscription;
      });
      console.log(updatedData);
      fs.writeFileSync(
        dataFilePath,
        JSON.stringify(updatedData, null, 2),
        "utf8"
      );
      return res.status(200).json({ message: "Json db data updated" });
    }

    if (type === "customer.subscription.updated") {
      const updatedData = dataJson.map((subscription) => {
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
        JSON.stringify(updatedData, null, 2),
        "utf8"
      );
      return res.status(200).json({ message: "Json db data updated" });
    }
  } catch (err) {
    console.error("Error writing to data file:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

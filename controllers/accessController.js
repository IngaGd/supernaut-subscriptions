const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "../data/subscriptions.json");

exports.checkCustomerAccess = async (req, res) => {
  try {
    const { customerId } = req.params;
    const fileData = fs.readFileSync(dataFilePath, "utf8");

    let dataJson = [];
    dataJson = JSON.parse(fileData);
    console.log("customerId: ", customerId);

    const filteredCustomer = dataJson.filter(
      (customer) => customer.customerId === customerId
    );

    if (filteredCustomer.length === 0) {
      return res.status(404).json({ message: "customer not found" });
    }

    if (filteredCustomer[0].status === "active") {
      return res.status(200).json({ access: true, status: "active" });
    }
    if (filteredCustomer[0].status !== "active") {
      return res
        .status(403)
        .json({ access: false, status: filteredCustomer[0].status });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

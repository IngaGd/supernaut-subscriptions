const { subscriptions } = require("../utils/subscriptions");

exports.checkCustomerAccess = async (req, res) => {
  try {
    const { customerId } = req.params;
    const filteredCustomer = subscriptions.filter(
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

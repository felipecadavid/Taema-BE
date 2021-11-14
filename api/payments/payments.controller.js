var epayco = require("epayco-sdk-node")({
  apiKey: "fa153c3e3007c13b023ba518e6513b00",
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: "ES",
  test: true,
});

async function createCard(req, res) {
  const cardInfo = req.body;
  console.log(cardInfo);
  try {
    const token = await epayco.token.create(cardInfo);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function createCustomer(req, res) {
  try {
    epayco.customers.list().then((customers) => {
    });

    const customerInfo = req.body;
    const customer = await epayco.customers.create(customerInfo);
    res.status(201).json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function charge(req, res) {
  let payment_info;
  if (!req.body.customer_id) {
    payment_info = { ...req.body, customer_id: "1898c940e19de5b476d1502" };
  } else {
    payment_info = req.body;
  }
  epayco.charge
    .create(payment_info)
    .then(function (charge) {
      res.status(201).json({ charge });
    })
    .catch(function (err) {
      console.log("err: " + err);
      res.status(500).send(err);
    });
}

module.exports = {
  createCard,
  createCustomer,
  charge,
};

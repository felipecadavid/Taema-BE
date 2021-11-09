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

  const customer_info = req.body;

//   var customer_info = {
//     token_card: "toke_id",
//     name: "Joe",
//     last_name: "Doe", 
//     email: "joe@payco.co",
//     default: true,
// }

epayco.customers.create(customer_info)
    .then(function(customer) {
        console.log(customer);
    })
    .catch(function(err) {
        console.log("err: " + err);
    });

  const customerInfo = req.body;
  console.log(customerInfo);
  try {
    const customer = await epayco.customers.create(customerInfo);
    res.status(201).json({ customer });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function charge(req, res) {
  console.log("aqui")
  const payment_info = req.body;
  console.log(payment_info);
  // const payment_info = {
  //   token_card: "token_card",
  //   customer_id: "customer_id",
  //   doc_type: "CC",
  //   doc_number: "10358519",
  //   name: "John",
  //   last_name: "Doe",
  //   email: "email@example.com",
  //   city: "Bogota",
  //   address: "Cr 4 # 55 36",
  //   phone: "3005234321",
  //   cell_phone: "3010000001",
  //   bill: "OR-1234",
  //   description: "Payment",
  //   value: "{VALUE}",
  //   tax: "0",
  //   tax_base: "0",
  //   currency: "COP",
  //   dues: "1",
  //   ip: "190.000.000.000" /*This is the client's IP, it is required */,
  //   url_response: "https://ejemplo.com/respuesta.html",
  //   url_confirmation: "https://ejemplo.com/confirmacion",
  //   method_confirmation: "GET",
  // };
  epayco.charge
    .create(payment_info)
    .then(function (charge) {
      console.log(charge);
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
  charge
};

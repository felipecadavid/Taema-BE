const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send an email with a sendgrid template

function sendTestEmail(req, res, next) {
  const msg = {
    to: "felipe.cadavid3@gmail.com", // Change to your recipient
    from: "detallestaema@gmail.com", // Change to your verified sender
    subject: "¡Hemos recibido tu pedido!",
    template_id: "d-4be4e9a0dab84f17a3c456cb5e42946a",
    dynamic_template_data: {
      order: "OR-6543",
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      next();
    })
    .catch((error) => {
      console.error(error);
    });
}

async function confirmationOrderEmail(req, res) {
  try {
    const { clientEmail, orderNumber, orderId, clientName, paymentMethod } =
      req.body;
    const msgForClient = {
      to: clientEmail, // Change to your recipient
      from: "detallestaema@gmail.com", // Change to your verified sender
      subject: "¡Hemos recibido tu pedido!",
      template_id: "d-10be1e0a2df04ed99912a794aa534d4a",
      dynamic_template_data: {
        order: orderNumber,
      },
    };

    console.log("msgForClient", msgForClient);

    const payment = {
      card: "Tarjeta",
      cash: "Efectivo contra entrega",
    };

    const msgForAdmin = {
      to: "detallestaema@gmail.com",
      from: "detallestaema@gmail.com",
      subject: "NUEVO PEDIDO",
      template_id: "d-45eb5ccf9892414d8cbb56cc1c33716d",
      dynamic_template_data: {
        name: clientName,
        email: clientEmail,
        order: orderNumber,
        orderId: orderId,
        payment: payment[paymentMethod],
      },
    };

    await sgMail.send(msgForClient);
    await sgMail.send(msgForAdmin);

    res.status(200).json({
      message: `Orden creada con id ${orderId}, numero ${orderNumber}`,
      orderNumber,
    });
  } catch (error) {
    console.log(error);
  }
}

async function orderStatusChangeFunction(
  orderNumber,
  status,
  message,
  clientEmail
) {
  try {
    const templates = {
      pending: "d-6274b5bc06f04638aa40817182169193",
      shipped: "d-ef622bc665dd44e2a0d7f36418d4acb5",
      delivered: "d-81d612eaf7df4b06869068e207d04f66",
      canceled: "d-ff752441fbd6463ab1e0a37e4e5b2464",
    };
    const msg = {
      to: clientEmail,
      from: "detallestaema@gmail.com",
      subject: "Ha cambiado el estado de tu pedido",
      template_id: templates[status],
      dynamic_template_data: {
        order: orderNumber,
        message,
      },
    };

    await sgMail.send(msg);

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendTestEmail,
  confirmationOrderEmail,
  orderStatusChangeFunction
};

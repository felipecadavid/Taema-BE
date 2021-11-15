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
        order: "OR-6543"
    }
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      next()
    })
    .catch((error) => {
      console.error(error);
    });
}


module.exports = {
    sendTestEmail
}
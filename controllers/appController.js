const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

//Send mail from testing account
const signUp = async (req, res) => {
  /** testing account */
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Successfully Register with us.", // plain text body
    html: "<b>Successfully Register with us.</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you should receive an email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("Signup Successfully...!");
};

//Send mail from real gmail account
const getBill = (req, res) => {
    const { userEmail } = req.body;
    let config = {
        service: 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgeb",
            link: 'https://mailgen.js'
        }
    });

    let response = {
        body: {
            name: "Seguna15",
            intro: "Your bill has arrived",
            table: {
                data: [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price: "$10.99" 
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response);

    let message = {
        form: process.env.EMAIL,
        to: userEmail,
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({error});
    });
  //res.status(201).json("Get Bill Success!");
};

const test = (req, res) => {
  return res.send("Hello world");
}

module.exports = {
  signUp,
  getBill,
  test,
};

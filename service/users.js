const { createTransport } = require('nodemailer');

const TEST_MAIL = process.env.TEST_MAIL;
const PASS_MAIL = process.env.PASS_MAIL;

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: PASS_MAIL,
  },
});

async function signupMail(username) {
  const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Usuario registrado',
    html: '<h1 style="color: blue;">Tu usuario fue registrado con <span style="color: green;">éxito</span></h1>',
  };
  try {
    const sendMailNewUser = async () => {
      const info = await transporter.sendMail(mailOptions);
      console.log(info);
    };
    sendMailNewUser();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { signupMail };

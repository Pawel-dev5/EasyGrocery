export default function (req: any, res: any) {
	const nodemailer = require('nodemailer');
	const transporter = nodemailer.createTransport({
		port: 465,
		host: 'smtp.gmail.com',
		secure: 'true',
		auth: {
			user: 'p.nowecki@gmail.com', //Replace with your email address
			pass: '******', // Replace with the password to your email.
		},
	});
	const mailData = {
		from: 'Chat API',
		to: req.body.email,
		subject: `Verify your email`,
		text: req.body.message,
	};
	transporter.sendMail(mailData, (err: any, info: any) => {
		if (err) return res.status(500).json({ message: `an error occurred ${err}` });
		res.status(200).json({ message: info });
	});
}

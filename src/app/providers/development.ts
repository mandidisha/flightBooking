export default {
  appName: 'flight-booking',
  port: process.env.PORT || 8000,
  databaseUrl: 'mongodb://localhost:27017/flight-booking',
  jwtSecretKey: 'process.env.JWT_SECRET_KEY',
  mailServiceApiKey: process.env.MAIL_SERVICE_API_KEY,
  mailService: 'sendgrid',
  mailServiceSender: process.env.MAIL_SERVICE_SENDER,
  apiDocsUsername: 'FlightBooking',
  apiDocsPassword: process.env.PASSWORD,
};

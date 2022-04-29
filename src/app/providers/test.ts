export default {
  appName: 'flight-booking',
  port: process.env.PORT || 8000,
  databaseUrl: 'mongodb://localhost:27017/flight-booking-test',
  jwtSecretKey: 'process.env.JWT_SECRET_KEY',
  mailServiceApiKey: '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',
  mailService: 'sendgrid',
  mailServiceSender: 'mandidisha@gmail.com',
  apiDocsUsername: 'FlightBooking',
  apiDocsPassword: process.env.PASSWORD,
};

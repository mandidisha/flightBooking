export default {
  port: process.env.PORT || 8000,
  databaseUrl: 'mongodb://localhost:27017/flight-booking',
  jwtSecretKey: 'process.env.JWT_SECRET_KEY',
};

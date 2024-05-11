import winston from 'winston';

export default winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'winston.log' }),
  ],
  format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`),
});

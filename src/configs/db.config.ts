import config from './env.config';

import mongoose from 'mongoose';
const { MONGODB_URL } = config;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on('error', (error: unknown) => console.log(error));

module.exports = mongoose;

import mongoose from 'mongoose';
import config from '../src/config/index.js';
import app from './index.js';

let server;

async function main() {
  try {
    await mongoose.connect(`${config.dbUri}`);

    if (mongoose.connect) {
      console.log('Connected to Database');
    }

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();

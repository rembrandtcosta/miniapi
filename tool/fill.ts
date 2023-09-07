import { setUpDb } from "../helpers/util";
import dotenv from 'dotenv';
import { connectToDatabase } from "../services/database.service";

const arg = process.argv.slice(2);

// small cli script util to fill database

dotenv.config();

function printUsage() {
  console.log(`Usage: ts-node fill.ts -n <number of items>`);
}

async function run() {
  await connectToDatabase();
  if (arg.length == 0 || arg.length > 2 || arg[0] !== '-n') {
    printUsage();
  } else {
    try {
      const n: number = parseInt(arg[1], 10);
      await setUpDb(n);
      console.log(`Successfully created ${n} random items`);
      process.exit();
    } catch (error) {
      printUsage();
    }
  }
}

run();

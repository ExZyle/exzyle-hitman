import { Context, ScheduledEvent } from 'aws-lambda';

import https = require('https');
import { URL } from 'url';

interface Contract {
  TARGET: string;
  CHANCE: number;
}

interface TargetEvent extends ScheduledEvent {
  contract?: Contract;
}

/**
 *
 * @param event The event triggering the call.
 * @param context The context the call is running under.
 */
export async function fire(event: TargetEvent, context: Context) {
  return new Promise((resolve, reject) => {
    let contract: Contract;

    if (event.contract) {
      contract = event.contract;
    } else {
      contract = {
        TARGET: process.env['TARGET']!,
        CHANCE: parseFloat(process.env['CHANCE'] ?? '1'), // tslint:disable-line:ban
      };
    }

    console.log('Validating target 🔗');
    try {
      const url = new URL(contract.TARGET!);

      console.log("Rollin' the dice! 🎲...");
      const roll = Math.random();
      if (roll < contract.CHANCE) {
        console.log(`${roll} < ${contract.CHANCE} - let\'s do this! 🤨`);
      } else {
        console.log(`${roll} >= ${contract.CHANCE} - not this time! ☘`);
        resolve('Contract was cancelled by dice roll.');
        return;
      }

      https.get(url.toString(), res => {
        console.log('Acquiring taget 🔭', url.toString());

        res.on('end', () => {
          console.log('Hitman is done! ☠', url.toString());
          resolve(`Hitman is done! ☠ ${url.toString()}`);
        });

        res.on('data', chunk => null);

        res.on('error', error => {
          console.log('Target evaded 🏃‍♂️💨', url.toString(), error);
          reject(error);
        });
      });
    } catch (error) {
      console.error('Invalid target 📛', contract.TARGET, error.message);
    }
  });
}

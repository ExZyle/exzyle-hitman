import { Context, ScheduledEvent } from 'aws-lambda';

import superagent = require('superagent');
import { URL } from 'url';
import UserAgent = require('user-agents');

/**
 * The contract that hitman is to take out.
 *
 */
interface Contract {
  /**
   * The URL of the target to be hit.
   */
  TARGET: string;
  /**
   * A number from 0.0 to 1.0 representing the chance that the target
   * will be hit.
   *
   * 0.0 - Will never hit.
   * 1.0 - Will always hit.
   */
  CHANCE: number;
  /**
   * The agent string to be used in hit. If this is undefined then a random
   * user agent will be chose.
   */
  AGENT?: string;
}

/**
 * Target event used when hitman is invoked.
 */
interface TargetEvent extends ScheduledEvent {
  /**
   * Contract used for this event's hit.
   */
  contract?: Contract;
}

/**
 *
 * @param event The event triggering the call.
 * @param context The context the call is running under.
 */
export async function fire(event: TargetEvent, context: Context) {
  let contract: Contract;

  if (event.contract) {
    contract = event.contract;
  } else {
    contract = {
      TARGET: process.env['TARGET']!,
      CHANCE: parseFloat(process.env['CHANCE'] ?? '1'), // tslint:disable-line:ban
      AGENT: process.env['AGENT'],
    };
  }

  console.log('Validating target 🔗');
  let url;
  try {
    url = new URL(contract.TARGET!);
  } catch (error) {
    console.error('Invalid target 📛', contract.TARGET, error.message);
    throw new Error(`Invalid target 📛 ${contract.TARGET}: ${error.message}`);
  }

  console.log("Rollin' the dice! 🎲...");
  const roll = Math.random();
  if (roll < contract.CHANCE) {
    console.log(`${roll} < ${contract.CHANCE} - let\'s do this! 🤨`);
  } else {
    console.log(`${roll} >= ${contract.CHANCE} - not this time! ☘`);
    return 'Contract was cancelled by dice roll.';
  }

  if (!contract.AGENT) {
    const userAgent = new UserAgent();
    console.log(`Adding mask 🎭 ${userAgent.toString()}`);
    console.log(
      'Altering fingerprint 🕵️‍♀️',
      JSON.stringify(userAgent.data, null, 2)
    );
    contract.AGENT = userAgent.toString();
  }

  console.log('Acquiring taget 🔭', url.toString());
  try {
    const response = await superagent
      .get(url.toString())
      .set('User-Agent', contract.AGENT);
    console.log('Hitman is done! ☠', url.toString());
    return {
      message: `Hitman is done! ☠ ${url.toString()}`,
      response,
    };
  } catch (error) {
    console.log('Target evaded 🏃‍♂️💨', url.toString(), error);
    error.message = `Target evaded 🏃‍♂️💨 ${url.toString()}: ${error.message}`;
    throw error;
  }
}

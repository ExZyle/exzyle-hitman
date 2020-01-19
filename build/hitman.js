"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superagent = require("superagent");
const url_1 = require("url");
const UserAgent = require("user-agents");
/**
 *
 * @param event The event triggering the call.
 * @param context The context the call is running under.
 */
async function fire(event, context) {
    var _a;
    let contract;
    if (event.contract) {
        contract = event.contract;
    }
    else {
        contract = {
            TARGET: process.env['TARGET'],
            CHANCE: parseFloat((_a = process.env['CHANCE'], (_a !== null && _a !== void 0 ? _a : '1'))),
            AGENT: process.env['AGENT'],
        };
    }
    console.log('Validating target 🔗');
    let url;
    try {
        url = new url_1.URL(contract.TARGET);
    }
    catch (error) {
        console.error('Invalid target 📛', contract.TARGET, error.message);
        throw new Error(`Invalid target 📛 ${contract.TARGET}: ${error.message}`);
    }
    console.log("Rollin' the dice! 🎲...");
    const roll = Math.random();
    if (roll < contract.CHANCE) {
        console.log(`${roll} < ${contract.CHANCE} - let\'s do this! 🤨`);
    }
    else {
        console.log(`${roll} >= ${contract.CHANCE} - not this time! ☘`);
        return 'Contract was cancelled by dice roll.';
    }
    if (!contract.AGENT) {
        const userAgent = new UserAgent();
        console.log(`Adding mask 🎭 ${userAgent.toString()}`);
        console.log('Altering fingerprint 🕵️‍♀️', JSON.stringify(userAgent.data, null, 2));
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
    }
    catch (error) {
        console.log('Target evaded 🏃‍♂️💨', url.toString(), error);
        error.message = `Target evaded 🏃‍♂️💨 ${url.toString()}: ${error.message}`;
        throw error;
    }
}
exports.fire = fire;

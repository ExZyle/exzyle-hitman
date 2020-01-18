"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const url_1 = require("url");
/**
 *
 * @param event The event triggering the call.
 * @param context The context the call is running under.
 */
async function fire(event, context) {
    return new Promise((resolve, reject) => {
        var _a;
        let contract;
        if (event.contract) {
            contract = event.contract;
        }
        else {
            contract = {
                TARGET: process.env['TARGET'],
                CHANCE: parseFloat((_a = process.env['CHANCE'], (_a !== null && _a !== void 0 ? _a : '1'))),
            };
        }
        console.log('Validating target 🔗');
        try {
            const url = new url_1.URL(contract.TARGET);
            console.log("Rollin' the dice! 🎲...");
            const roll = Math.random();
            if (roll < contract.CHANCE) {
                console.log(`${roll} < ${contract.CHANCE} - let\'s do this! 🤨`);
            }
            else {
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
        }
        catch (error) {
            console.error('Invalid target 📛', contract.TARGET, error.message);
        }
    });
}
exports.fire = fire;

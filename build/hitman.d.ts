import { Context, ScheduledEvent } from 'aws-lambda';
import superagent = require('superagent');
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
export declare function fire(event: TargetEvent, context: Context): Promise<"Contract was cancelled by dice roll." | {
    message: string;
    response: superagent.Response;
}>;
export {};

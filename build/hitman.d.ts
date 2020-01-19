import { Context, ScheduledEvent } from 'aws-lambda';
import superagent = require('superagent');
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
export declare function fire(event: TargetEvent, context: Context): Promise<"Contract was cancelled by dice roll." | {
    message: string;
    response: superagent.Response;
}>;
export {};

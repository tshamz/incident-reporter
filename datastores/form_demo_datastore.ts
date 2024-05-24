import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Datastores are a Slack-hosted location to store
 * and retrieve data for your app.
 * https://api.slack.com/automation/datastores
 */
const FormDemoDatastore = DefineDatastore({
  name: "form_data",
  primary_key: "object_id",
  attributes: {
    object_id: { type: Schema.types.string },
    user_id: { type: Schema.slack.types.user_id },
    channel_id: { type: Schema.slack.types.channel_id },
    created_at: { type: Schema.slack.types.timestamp },
    current_time: { type: Schema.slack.types.timestamp },
  },
});

export default FormDemoDatastore;

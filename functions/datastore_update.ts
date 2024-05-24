import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const UpdateDatastoreFunctionDefinition = DefineFunction({
  callback_id: "datastore_update",
  title: "Update a datastore",
  description: "Updates a song in a datastore",
  source_file: "functions/datastore_update.ts",
  input_parameters: {
    properties: {
      user_id: { type: Schema.slack.types.user_id },
      channel_id: { type: Schema.slack.types.channel_id },
      created_at: { type: Schema.slack.types.timestamp },
      current_time: { type: Schema.slack.types.timestamp },
    },
    required: ["user_id", "created_at"],
  },
});

export default SlackFunction(
  UpdateDatastoreFunctionDefinition,
  async ({ inputs, client }) => {
    const response = await client.apps.datastore.update({
      datastore: "form_data",
      item: {
        user_id: inputs.user_id,
        channel_id: inputs.channel_id,
        created_at: inputs.created_at,
        current_time: inputs.current_time,
      },
    });

    if (!response.ok) {
      const error = `Failed to update datastore: ${response.error}`;
      return { error };
    } else {
      console.log(`A row updated: ${response.item}`);
      return { outputs: {} };
    }
  },
);

import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const InsertIntoDatastoreFunctionDefinition = DefineFunction({
  callback_id: "datastore_insert",
  title: "Insert into datastore",
  description: "Adds artist and song to a datastore",
  source_file: "functions/datastore_insert.ts",
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
  InsertIntoDatastoreFunctionDefinition,
  // Note the `async`, required since we `await` any `client` call.
  async ({ inputs, client }) => {
    // The below will create a *new* item, since we're creating a new ID:
    const uuid = crypto.randomUUID();
    // Use the client prop to call the SlackAPI
    const response = await client.apps.datastore.put({ // Here's that client property we mentioned that allows us to call the SlackAPI's datastore functions
      datastore: "form_data",
      item: {
        // To update an existing item, pass the `id` returned from a previous put command
        user_id: uuid,
        channel_id: inputs.channel_id,
        created_at: inputs.created_at,
        current_time: inputs.current_time,
      },
    });

    if (!response.ok) {
      const error = `Failed to save a row in datastore: ${response.error}`;
      return { error };
    } else {
      console.log(`A new row saved: ${response.item}`);
      return { outputs: {} };
    }
  },
);

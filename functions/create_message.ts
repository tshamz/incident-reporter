import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const CreateMessage = DefineFunction({
  callback_id: "create_message",
  title: "Create New Incident Message",
  source_file: "functions/create_message.ts",
  input_parameters: {
    required: ["title", "severity", "status", "services_affected", "reported_by", "description", "business_impact", "learnings", "preventive_measures"],
    properties: {
      title: {
        type: Schema.types.string,
      },
      severity: {
        type: Schema.types.string,
      },
      status: {
        type: Schema.types.string,
      },
      services_affected: {
        type: Schema.types.array,
        items: {
          type: Schema.types.string,
        }
      },
      reported_by: {
        type: Schema.types.array,
        items: {
          type: Schema.slack.types.channel_id,
        },
      },
      description: {
        type: Schema.types.string,
      },
      business_impact: {
        type: Schema.types.string,
      },
      learnings: {
        type: Schema.types.string,
      },
      preventive_measures: {
        type: Schema.types.string,
      },
    },
  },
  output_parameters: {
    properties: {
      greeting: {
        type: Schema.types.string,
        description: "Greeting for the recipient",
      },
    },
    required: ["greeting"],
  },
});

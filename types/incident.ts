import { DefineType, Schema } from "deno-slack-sdk/mod.ts";

export const IncidentType = DefineType({
  title: "Incident",
  name: "incident",
  type: Schema.types.object,
  required: ["created_at", "created_by", "title", "severity", "status", "services_affected"],
  properties: {
    created_at: {
      type: Schema.slack.types.timestamp
    },
    created_by: {
      type: Schema.slack.types.user_id,
    },
    incident_message: {
      type: Schema.slack.types.message_ts
    },
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
});

import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

const INCIDENTS_CHANNEL = "C059C139K4M";

const FormDemoWorkflow = DefineWorkflow({
  callback_id: "form_demo_workflow",
  title: "Form Demo Workflow",
  input_parameters: {
    required: ["interactivity"],
    properties: {
      current_time: { type: Schema.slack.types.timestamp },
      user_id: { type: Schema.slack.types.user_id },
      interactivity: { type: Schema.slack.types.interactivity },
    },
  },
});

// Step using the built-in form
const formStep = FormDemoWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Report an Incident",
    // description: "Create a living incident report for a technical issue",
    interactivity: FormDemoWorkflow.inputs.interactivity,
    submit_label: "Submit Report",
    fields: {
      // required: ["title", "severity", "status", "services_affected"],
      required: ["title", "severity"],
      // fields.elements will be converted to Block Kit components under the hood
      // To learn more on Block Kit, visit https://api.slack.com/block-kit
      elements: [
        {
          title: "Title",
          name: "title",
          type: Schema.types.string, // => "plain_text_input"
        },
        {
          title: "Severity",
          name: "severity",
          type: Schema.types.string,
          choices: [
            { value: "p0", title: "🟠 P0 (Critical)" },
            { value: "p1", title: "🔴 P1 (High)" },
            { value: "p2", title: "🟡 P2 (Moderate)" },
            { value: "p3", title: "🟢 P3 (Low)" },
            { value: "p4", title: "🔵 P4 (Minor)" },
            { value: "unknown", title: "⚪️ UNKNOWN" },
          ],
          enum: ["p0", "p1", "p2", "p3", "p4", "unknown"],
        },
        {
          title: "Status",
          name: "status",
          type: Schema.types.string,
          choices: [
            { value: "ongoing", title: "Ongoing" },
            { value: "stable", title: "Stable" },
            { value: "resolved", title: "Resolved" },
            { value: "completed", title: "Completed" },
          ],
          enum: ["ongoing", "stable", "resolved", "completed"],
        },
        {
          title: "Services Affected",
          name: "services_affected",
          type: Schema.types.array, // => "mutli_static_select"
          items: {
            type: Schema.types.string,
            choices: [
              { value: "build", title: "Build" },
              { value: "customizer", title: "Customizer" },
              { value: "monorepo", title: "Monorepo" },
              { value: "platform", title: "Platform" },
              { value: "starter", title: "Starter" },
            ],
            enum: ["build", "customizer", "monorepo", "platform", "starter"],
          },
        },
        {
          title: "Reported by",
          description: "which customer(s) reported the incident?",
          name: "reported_by",
          type: Schema.types.array, // => "multi_channels_select"
          items: {
            type: Schema.slack.types.channel_id,
          },
        },
        {
          title: "Description",
          name: "description",
          type: Schema.types.string, // => "plain_text_input"
          long: true,
        },
        {
          title: "Business Impact",
          name: "business_impact",
          type: Schema.types.string, // => "plain_text_input"
          long: true,
        },
        {
          title: "Learnings",
          name: "learnings",
          type: Schema.types.string, // => "plain_text_input"
          long: true,
        },
        {
          title: "Preventive Measures",
          name: "preventive_measures",
          type: Schema.types.string, // => "plain_text_input"
          long: true,
        },
      ],
    },
  },
);

FormDemoWorkflow.addStep(
  Schema.slack.functions.SendMessage,
  {
    channel_id: INCIDENTS_CHANNEL,
    message: "test",
    blocks: [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "New request"
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*Type:*\nPaid Time Off"
          },
          {
            "type": "mrkdwn",
            "text": "*Created by:*\n<example.com|Fred Enriquez>"
          }
        ]
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": "*When:*\nAug 10 - Aug 13"
          }
        ]
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "<https://example.com|View request>"
        }
      }
    ],
  },
);

export default FormDemoWorkflow;

// {
//   "type": "header",
//   "text": {
//     "type": "plain_text",
//     "text": "Technical Incident Report",
//   },
// },
// {
//   "type": "divider",
// },

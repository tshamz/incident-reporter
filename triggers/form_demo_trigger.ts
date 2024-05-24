import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import workflow from "../workflows/form_demo_workflow.ts";

/**
 * This trigger starts the workflow when an end-user clicks the link.
 * Learn more at https://api.slack.com/future/triggers/link
 */
const trigger: Trigger<typeof workflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Create an incident",
  description:
    "Create and send an announcement to one or more channels in your workspace.",
  workflow: `#/workflows/${workflow.definition.callback_id}`,
  inputs: {
    current_time: { value: "{{event_timestamp}}" },
    user_id: { value: TriggerContextData.Shortcut.user_id },
    interactivity: { value: TriggerContextData.Shortcut.interactivity },
  },
};

// Note that the Trigger object must be default-exported
export default trigger;

import { Manifest } from "deno-slack-sdk/mod.ts";
import FormDemoWorkflow from "./workflows/form_demo_workflow.ts";
import FormDemoDatastore from "./datastores/form_demo_datastore.ts";
import { IncidentType } from './types/incident.ts';

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "Incident Tracker",
  icon: "assets/default_new_app_icon.png",
  outgoingDomains: [],
  workflows: [FormDemoWorkflow],
  datastores: [FormDemoDatastore],
  types: [IncidentType],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});

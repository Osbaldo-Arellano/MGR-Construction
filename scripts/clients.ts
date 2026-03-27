// ============================================================
// Client Registry
// ============================================================
// Add a new entry here for each client deployment.
// Key = the ID you pass to `npm run deploy -- <id>`
// ============================================================

import type { ClientDeployment } from "./types";
import { mgrDeployment } from "../packages/general-contractor/mgr-construction.deploy";

export const clients: Record<string, ClientDeployment> = {
  "mgr-construction": mgrDeployment,

  // Future clients:
  // "flawless-construction": flawlessDeployment,
  // "next-client": nextClientDeployment,
};

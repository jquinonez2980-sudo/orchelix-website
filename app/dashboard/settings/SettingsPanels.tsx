"use client";

import { useState } from "react";
import SettingsForm from "./SettingsForm";
import VersionHistory from "./VersionHistory";

// Thin client wrapper so a successful save immediately refreshes Version
// History instead of leaving the tenant to notice the stale list and click
// Refresh themselves — the two components otherwise don't share any state.
export default function SettingsPanels() {
  const [versionBump, setVersionBump] = useState(0);

  return (
    <div className="space-y-6">
      <SettingsForm onSaved={() => setVersionBump((n) => n + 1)} />
      <VersionHistory reloadSignal={versionBump} />
    </div>
  );
}

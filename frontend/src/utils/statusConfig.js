export const STATUS_META = {
  in_transit: { label: "In Transit", tone: "info" },
  consulting: { label: "Consulting", tone: "success" },
  in_ot: { label: "In OT", tone: "warning" },
  arrived: { label: "Arrived", tone: "success" },
  delayed: { label: "Delayed", tone: "warning" },
};

export function getStatusMeta(status) {
  return STATUS_META[status] || { label: "Unknown", tone: "muted" };
}

export function getEtaLabel(minutes) {
  if (typeof minutes !== "number") {
    return "N/A";
  }
  return `${minutes} min`;
}

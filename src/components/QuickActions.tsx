import { IconCarWrench, IconWrench } from "./Icons";

const actions = [
  { label: "Emergency", icon: IconWrench },
  { label: "Puncture", icon: IconWrench },
  { label: "Battery", icon: IconWrench },
  { label: "Towing", icon: IconCarWrench },
  { label: "Service", icon: IconCarWrench },
] as const;

export function QuickActions() {
  return (
    <div className="chip-row" aria-label="Quick actions">
      {actions.map((a) => {
        const I = a.icon;
        return (
          <button key={a.label} className="chip" type="button">
            <I className="icon muted" />
            <span className="semibold" style={{ fontSize: 13 }}>
              {a.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}


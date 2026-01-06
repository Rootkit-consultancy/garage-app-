import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IconCall, IconChat, IconStar, IconWrench } from "../components/Icons";
import { IconButton, Card } from "../components/UI";
import { mechanics } from "../data/mock";

const steps = ["Requested", "Accepted", "On the way", "Repairing", "Completed"] as const;

export function LiveTracking() {
  const [searchParams] = useSearchParams();
  const mechanicId = searchParams.get("mechanic") ?? "rahul";
  const mechanic = useMemo(
    () => mechanics.find((m) => m.id === mechanicId) ?? mechanics[0],
    [mechanicId],
  );

  const activeIndex = 2;

  return (
    <div className="screen" style={{ padding: 14 }}>
      <div className="map" aria-label="Map">
        <div className="route" aria-hidden="true" />
        <div className="pin user" aria-label="User pin" />
        <div className="pin mech" aria-label="Mechanic pin">
          <IconWrench className="icon" style={{ color: "#fff", width: 14, height: 14 }} />
        </div>
        <div className="marker-chip">12 min</div>

        <div className="top-float">
          <Card className="card-pad shadow">
            <div className="tiny muted" style={{ fontWeight: 900, letterSpacing: 0.6 }}>
              MECHANIC ON THE WAY
            </div>
            <div className="bold" style={{ fontSize: 22, marginTop: 6 }}>
              Arriving in 12 min
            </div>

            <div className="row between mt-12" style={{ marginTop: 12, gap: 10 }}>
              <div className="row gap-10" style={{ alignItems: "center" }}>
                <div className="avatar" aria-label={`${mechanic.name} avatar`} />
                <div className="col gap-6">
                  <div className="bold">{mechanic.name}</div>
                  <div className="small muted">{mechanic.vehicleText}</div>
                  <div className="row gap-6" style={{ alignItems: "center" }}>
                    <IconStar className="icon yellow" />
                    <span className="small semibold">{mechanic.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div className="row gap-10">
                <IconButton ariaLabel="Call">
                  <IconCall className="icon accent" />
                </IconButton>
                <Link to={`/chat?mechanic=${encodeURIComponent(mechanic.id)}`} aria-label="Chat">
                  <span className="icon-btn" role="button" aria-label="Chat">
                    <IconChat className="icon accent" />
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div className="bottom-sheet" aria-label="Bottom sheet">
          <div className="sheet-handle" />

          <div className="stepper" aria-label="Progress stepper">
            {steps.map((s, idx) => (
              <div key={s} className={`step ${idx === activeIndex ? "active" : ""}`}>
                <div className="dot" aria-hidden="true">
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: idx === activeIndex ? "var(--accent)" : "rgba(15,23,42,0.32)",
                      display: "block",
                    }}
                  />
                </div>
                <div className="label">{s}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 small" style={{ marginTop: 12, lineHeight: 1.35 }}>
            <span className="semibold">{mechanic.name.split(" ")[0]}</span> is heading to you.
            Please keep your phone nearby.
          </div>

          <div className="row between mt-12" style={{ marginTop: 12, gap: 12 }}>
            <button className="text-btn" type="button">
              Cancel booking
            </button>
            <button className="outline-btn" type="button">
              Share live location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TitleAppBar } from "../components/AppBar";
import { IconCamera, IconPin, IconPlus } from "../components/Icons";
import { Card } from "../components/UI";
import { mechanics, vehicles } from "../data/mock";

type ServiceTime = "asap" | "schedule";

export function BookingDetails() {
  const [searchParams] = useSearchParams();
  const mechanicId = searchParams.get("mechanic") ?? "sakshi";
  const mechanic = useMemo(
    () => mechanics.find((m) => m.id === mechanicId) ?? mechanics[0],
    [mechanicId],
  );

  const vehicle = vehicles[0];
  const [serviceTime, setServiceTime] = useState<ServiceTime>("asap");
  const [issue, setIssue] = useState("");
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const [slot, setSlot] = useState<string>("10:00–12:00");

  const showSchedule = serviceTime === "schedule";

  return (
    <div className="screen">
      <TitleAppBar title="Booking details" backTo={`/mechanic/${encodeURIComponent(mechanic.id)}`} />

      <div className="mt-12 col gap-12" style={{ paddingBottom: 86 }}>
        <Card className="card-pad">
          <div className="row between">
            <div className="bold">Your vehicle</div>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>
              Change
            </a>
          </div>
          <div className="row gap-10 mt-10" style={{ marginTop: 10, alignItems: "center" }}>
            <div className="icon-btn" aria-label="Brand icon">
              <span className="bold">M</span>
            </div>
            <div className="col">
              <div className="semibold">{vehicle.title}</div>
              <div className="tiny muted">{vehicle.subtitle}</div>
            </div>
          </div>
        </Card>

        <Card className="card-pad">
          <div className="bold">What’s the issue?</div>
          <div className="mt-10" style={{ marginTop: 10 }}>
            <textarea
              className="field"
              placeholder="Describe what’s happening…"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
          </div>
          <div className="row gap-10 mt-10" style={{ marginTop: 10, alignItems: "center" }}>
            <div className="row gap-8" style={{ alignItems: "center" }}>
              <IconPlus className="icon accent" />
              <span className="semibold" style={{ color: "rgba(15,23,42,0.80)" }}>
                Add photos
              </span>
            </div>
            <IconCamera className="icon muted" />
          </div>
        </Card>

        <Card className="card-pad">
          <div className="bold">Service time</div>
          <div className="toggle-row mt-10" style={{ marginTop: 10 }}>
            <button
              className={`toggle ${serviceTime === "asap" ? "active" : ""}`}
              type="button"
              onClick={() => setServiceTime("asap")}
            >
              ASAP (Emergency)
            </button>
            <button
              className={`toggle ${serviceTime === "schedule" ? "active" : ""}`}
              type="button"
              onClick={() => setServiceTime("schedule")}
            >
              Schedule
            </button>
          </div>

          {showSchedule ? (
            <div className="mt-12">
              <div className="row gap-10">
                <button
                  className={`pill sm ${day === "today" ? "primary" : ""}`}
                  type="button"
                  onClick={() => setDay("today")}
                >
                  Today
                </button>
                <button
                  className={`pill sm ${day === "tomorrow" ? "primary" : ""}`}
                  type="button"
                  onClick={() => setDay("tomorrow")}
                >
                  Tomorrow
                </button>
              </div>
              <div className="row gap-10 mt-10" style={{ flexWrap: "wrap", marginTop: 10 }}>
                {["10:00–12:00", "12:00–2:00", "2:00–4:00", "4:00–6:00"].map((s) => (
                  <button
                    key={s}
                    className={`pill sm ${slot === s ? "primary" : ""}`}
                    type="button"
                    onClick={() => setSlot(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="tiny muted mt-10" style={{ marginTop: 10 }}>
                Selected: {day}, {slot}
              </div>
            </div>
          ) : null}
        </Card>

        <Card className="card-pad">
          <div className="row between">
            <div className="bold">Location</div>
            <a className="link" href="#" onClick={(e) => e.preventDefault()}>
              Change
            </a>
          </div>
          <div className="mt-10" style={{ marginTop: 10 }}>
            <div
              className="card"
              style={{
                height: 92,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(47,107,255,0.12), rgba(31,182,255,0.10))",
                border: "1px solid rgba(15,23,42,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
              aria-label="Map thumbnail"
            >
              <div style={{ position: "absolute", left: 14, top: 14 }}>
                <div className="pin user" style={{ position: "static" }} />
              </div>
              <div style={{ position: "absolute", right: 14, bottom: 12 }} className="tiny muted">
                Map preview
              </div>
            </div>
          </div>
          <div className="row gap-10 mt-10" style={{ marginTop: 10, alignItems: "center" }}>
            <IconPin className="icon muted" />
            <div className="small semibold">Kothrud, Pune · Near City Pride</div>
          </div>
        </Card>
      </div>

      <div className="sticky-bottom">
        <div className="bottom-bar" style={{ gap: 14 }}>
          <div className="col">
            <div className="tiny muted">Est. range</div>
            <div className="bold">₹350 – ₹550</div>
          </div>
          <div style={{ flex: 1 }}>
            <Link
              to={`/tracking?mechanic=${encodeURIComponent(mechanic.id)}`}
              style={{ textDecoration: "none" }}
              aria-label="Confirm and proceed"
            >
              <button className="primary-btn" type="button">
                Confirm &amp; proceed
              </button>
            </Link>
          </div>
        </div>
        {issue.trim().length === 0 ? (
          <div className="tiny muted mt-10" style={{ marginTop: 10 }}>
            (Optional) Add details for faster diagnosis.
          </div>
        ) : null}
      </div>
    </div>
  );
}


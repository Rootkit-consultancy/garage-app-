import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { TitleAppBar } from "../components/AppBar";
import { IconClock, IconPin, IconStar } from "../components/Icons";
import { Badge, Card } from "../components/UI";
import { mechanics } from "../data/mock";

type Tab = "overview" | "reviews" | "photos";

export function MechanicProfile() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialId = id ?? searchParams.get("mechanic") ?? "sakshi";

  const mechanic = useMemo(
    () => mechanics.find((m) => m.id === initialId) ?? mechanics[0],
    [initialId],
  );

  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="screen">
      <TitleAppBar title="Mechanic profile" backTo="/" />

      <div className="mt-12">
        <Card className="card-pad shadow-soft">
          <div className="row between gap-14" style={{ alignItems: "center" }}>
            <div className="row gap-12" style={{ alignItems: "center" }}>
              <div className="avatar big" aria-label={`${mechanic.name} photo`} />
              <div className="col gap-6">
                <div className="bold" style={{ fontSize: 18 }}>
                  {mechanic.name}
                </div>
                <div className="row gap-8" style={{ alignItems: "center" }}>
                  <span
                    className="badge"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#fff",
                    }}
                  >
                    <IconStar className="icon yellow" />
                    <span className="bold">{mechanic.rating.toFixed(1)}</span>
                  </span>
                  <span className="small muted">
                    {mechanic.jobs}+ jobs · {mechanic.experienceYears} yrs experience
                  </span>
                </div>
              </div>
            </div>
            <Link
              to={`/chat?mechanic=${encodeURIComponent(mechanic.id)}`}
              className="link"
            >
              Message
            </Link>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <Card className="card-pad">
          <div className="row gap-10" style={{ alignItems: "center" }}>
            <IconPin className="icon muted" />
            <div className="small semibold">Within 5 km of Kothrud</div>
          </div>
          <div className="row gap-10 mt-10" style={{ alignItems: "center", marginTop: 10 }}>
            <IconClock className="icon muted" />
            <div className="small semibold">Usually accepts within 2 min</div>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <div className="segmented" role="tablist" aria-label="Profile tabs">
          <button
            className={tab === "overview" ? "active" : ""}
            onClick={() => setTab("overview")}
            type="button"
            role="tab"
            aria-selected={tab === "overview"}
          >
            Overview
          </button>
          <button
            className={tab === "reviews" ? "active" : ""}
            onClick={() => setTab("reviews")}
            type="button"
            role="tab"
            aria-selected={tab === "reviews"}
          >
            Reviews
          </button>
          <button
            className={tab === "photos" ? "active" : ""}
            onClick={() => setTab("photos")}
            type="button"
            role="tab"
            aria-selected={tab === "photos"}
          >
            Photos
          </button>
        </div>
      </div>

      <div className="mt-12" style={{ paddingBottom: 90 }}>
        {tab === "overview" ? (
          <div className="col gap-12">
            <Card className="card-pad">
              <div className="bold">Services</div>
              <div className="row gap-6 mt-10" style={{ flexWrap: "wrap", marginTop: 10 }}>
                {["Engine repair", "Periodic service", "Puncture", "Pickup & drop"].map(
                  (s) => (
                    <Badge key={s}>{s}</Badge>
                  ),
                )}
              </div>
            </Card>

            <Card className="card-pad">
              <div className="bold">Vehicles</div>
              <div className="row gap-6 mt-10" style={{ flexWrap: "wrap", marginTop: 10 }}>
                {["Maruti", "Honda", "Bajaj", "Hero", "TVS"].map((b) => (
                  <span key={b} className="badge">
                    {b}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="card-pad">
              <div className="bold">About</div>
              <div className="small muted mt-10" style={{ marginTop: 10, lineHeight: 1.35 }}>
                Reliable doorstep assistance for cars and bikes. Transparent pricing, quick
                response, and genuine parts. We’ll diagnose first, then repair only what you
                approve.
              </div>
            </Card>
          </div>
        ) : tab === "reviews" ? (
          <Card className="card-pad">
            <div className="bold">Reviews</div>
            <div className="small muted mt-10" style={{ marginTop: 10 }}>
              Demo screen: add real reviews here.
            </div>
          </Card>
        ) : (
          <Card className="card-pad">
            <div className="bold">Photos</div>
            <div className="small muted mt-10" style={{ marginTop: 10 }}>
              Demo screen: add workshop/job photos here.
            </div>
          </Card>
        )}
      </div>

      <div className="sticky-bottom">
        <div className="bottom-bar">
          <div className="col">
            <div className="tiny muted">Visit charge from</div>
            <div className="bold">₹199</div>
          </div>
          <div style={{ flex: 1 }}>
            <Link
              to={`/booking?mechanic=${encodeURIComponent(mechanic.id)}`}
              style={{ textDecoration: "none" }}
            >
              <button className="primary-btn" type="button">
                Book this mechanic
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


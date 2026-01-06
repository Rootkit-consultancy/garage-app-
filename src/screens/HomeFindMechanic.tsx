import { Link, useNavigate } from "react-router-dom";
import { HomeAppBar } from "../components/AppBar";
import { SearchBar } from "../components/SearchBar";
import { QuickActions } from "../components/QuickActions";
import { Badge, Card, PillButton, SectionTitle } from "../components/UI";
import { IconCarWrench, IconStar } from "../components/Icons";
import { mechanics, user, vehicles } from "../data/mock";

export function HomeFindMechanic() {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <HomeAppBar address={user.address} />

      <div className="mt-12">
        <SearchBar />
      </div>

      <div className="mt-14">
        <QuickActions />
      </div>

      <div className="mt-18">
        <SectionTitle title="My vehicles" />
        <div className="chip-row mt-10" aria-label="My vehicles">
          {vehicles.map((v) => (
            <Card
              key={v.id}
              className="vehicle-card card-pad"
              // keep these card widths “horizontal card” style
            >
              <div className="row between gap-12" style={{ width: 280 }}>
                <div className="row gap-10" style={{ alignItems: "center" }}>
                  <div className="icon-btn" aria-label="Vehicle icon">
                    <IconCarWrench className="icon accent" />
                  </div>
                  <div className="col" style={{ minWidth: 0 }}>
                    <div className="bold" style={{ fontSize: 14 }}>
                      {v.title}
                    </div>
                    <div className="tiny muted">{v.subtitle}</div>
                  </div>
                </div>
                <a className="link" href="#" onClick={(e) => e.preventDefault()}>
                  Edit
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-18">
        <SectionTitle title="Nearby mechanics" />
        <div className="list mt-12">
          {mechanics.map((m) => (
            <Card key={m.id} className="card-pad">
              <div className="mechanic-card">
                <div className="mechanic-photo" aria-label={`${m.name} photo`} />

                <div className="mechanic-mid">
                  <Link
                    to={`/mechanic/${m.id}`}
                    className="mechanic-name"
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    {m.name}
                  </Link>
                  <div className="mechanic-meta mt-6" style={{ marginTop: 6 }}>
                    <span className="stars">
                      <IconStar className="icon yellow" />
                      {m.rating.toFixed(1)}
                    </span>
                    <span>·</span>
                    <span>{m.distanceKm.toFixed(1)} km</span>
                    <span>·</span>
                    <span>{m.etaMin} min</span>
                  </div>
                  <div className="row gap-6 mt-8" style={{ marginTop: 8, flexWrap: "wrap" }}>
                    {m.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="col gap-8" style={{ alignItems: "flex-end" }}>
                  <div className="price">from ₹{m.fromPrice}</div>
                  <PillButton
                    variant="primary"
                    onClick={() => navigate(`/booking?mechanic=${encodeURIComponent(m.id)}`)}
                  >
                    Book
                  </PillButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-22" style={{ paddingBottom: 22 }}>
        <div className="tiny muted">
          Tip: open a mechanic → book → tracking → chat (demo flow).
        </div>
      </div>
    </div>
  );
}


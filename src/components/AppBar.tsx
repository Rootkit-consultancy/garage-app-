import { Link } from "react-router-dom";
import { IconBack, IconCarWrench, IconChevronDown, IconPin } from "./Icons";

export function HomeAppBar({
  address,
}: {
  address: string;
}) {
  return (
    <div className="appbar">
      <div className="row between gap-12">
        <div className="row gap-10">
          <div className="icon-btn" aria-label="Logo">
            <IconCarWrench className="icon accent" />
          </div>
        </div>

        <div className="col" style={{ alignItems: "center", flex: 1 }}>
          <div className="small muted" style={{ fontWeight: 700 }}>
            Your location
          </div>
          <div className="row gap-6" style={{ alignItems: "center" }}>
            <IconPin className="icon muted" />
            <div className="semibold" style={{ fontSize: 13 }}>
              {address}
            </div>
            <IconChevronDown className="icon muted" />
          </div>
        </div>

        <div className="avatar" aria-label="User avatar" />
      </div>
    </div>
  );
}

export function TitleAppBar({
  title,
  backTo = "/",
  right,
}: {
  title: string;
  backTo?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="appbar">
      <div className="row between gap-12">
        <Link to={backTo} className="icon-btn" aria-label="Back">
          <IconBack className="icon" />
        </Link>
        <div className="bold" style={{ fontSize: 15 }}>
          {title}
        </div>
        <div style={{ width: 36, height: 36, display: "flex", alignItems: "center" }}>
          {right ?? null}
        </div>
      </div>
    </div>
  );
}


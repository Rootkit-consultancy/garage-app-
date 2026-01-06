import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TitleAppBar } from "../components/AppBar";
import { IconCall, IconCamera, IconInfo, IconPlus, IconSend } from "../components/Icons";
import { IconButton } from "../components/UI";
import { mechanics } from "../data/mock";

type Msg = {
  id: string;
  from: "user" | "mech";
  text: string;
  time: string;
};

export function InAppChat() {
  const [searchParams] = useSearchParams();
  const mechanicId = searchParams.get("mechanic") ?? "rahul";
  const mechanic = useMemo(
    () => mechanics.find((m) => m.id === mechanicId) ?? mechanics[0],
    [mechanicId],
  );

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m1", from: "mech", text: "Hi! I’m on the way. Can you share your exact landmark?", time: "10:24" },
    { id: "m2", from: "user", text: "Sure — near City Pride, Kothrud. I’ll be outside.", time: "10:25" },
    { id: "m3", from: "mech", text: "Great. Please keep the bike key ready.", time: "10:26" },
  ]);

  function send() {
    const t = draft.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [...prev, { id: `u${prev.length + 1}`, from: "user", text: t, time }]);
    setDraft("");
  }

  return (
    <div className="screen chat-bg" style={{ padding: 0 }}>
      <div style={{ padding: 14 }}>
        <TitleAppBar
          title=""
          backTo={`/tracking?mechanic=${encodeURIComponent(mechanic.id)}`}
          right={
            <Link to="#" onClick={(e) => e.preventDefault()} aria-label="Job details">
              <IconInfo className="icon muted" />
            </Link>
          }
        />
      </div>

      <div style={{ padding: "0 14px 10px" }}>
        <div className="row between">
          <div className="row gap-10" style={{ alignItems: "center" }}>
            <div className="avatar" aria-label={`${mechanic.name} photo`} />
            <div className="col">
              <div className="bold">{mechanic.name}</div>
              <div className="tiny muted">On the way</div>
            </div>
          </div>
          <div className="row gap-10">
            <IconButton ariaLabel="Call">
              <IconCall className="icon accent" />
            </IconButton>
            <IconButton ariaLabel="Info">
              <IconInfo className="icon muted" />
            </IconButton>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 14px 6px" }}>
        <div className="messages" aria-label="Messages">
          {messages.map((m) => (
            <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "user" ? "flex-end" : "flex-start" }}>
              <div className={`bubble ${m.from === "user" ? "user" : "mech"}`}>{m.text}</div>
              <div className="bubble-time">{m.time}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="inputbar" role="group" aria-label="Message input">
        <IconButton ariaLabel="Add attachment">
          <IconPlus className="icon muted" />
        </IconButton>
        <IconButton ariaLabel="Camera">
          <IconCamera className="icon muted" />
        </IconButton>

        <div className="input-pill">
          <input
            placeholder="Type a message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
          />
        </div>

        <button className="send" type="button" aria-label="Send" onClick={send}>
          <IconSend className="icon" />
        </button>
      </div>
    </div>
  );
}


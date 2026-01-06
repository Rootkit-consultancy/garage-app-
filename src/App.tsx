import { Navigate, Route, Routes } from "react-router-dom";
import { HomeFindMechanic } from "./screens/HomeFindMechanic";
import { MechanicProfile } from "./screens/MechanicProfile";
import { BookingDetails } from "./screens/BookingDetails";
import { LiveTracking } from "./screens/LiveTracking";
import { InAppChat } from "./screens/InAppChat";
import { AppShell } from "./components/AppShell";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomeFindMechanic />} />
        <Route path="/mechanic/:id" element={<MechanicProfile />} />
        <Route path="/booking" element={<BookingDetails />} />
        <Route path="/tracking" element={<LiveTracking />} />
        <Route path="/chat" element={<InAppChat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}


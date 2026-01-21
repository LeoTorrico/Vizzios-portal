import { useEffect } from "react";
import { healthService } from "./api/healthService";
import AppRouter from "./routes/AppRouter";

export default function App() {
  return <AppRouter />;
}

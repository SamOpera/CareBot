import Chat from "@/components/Chat"
import { EMERGENCY_NUMBER } from "@/lib/emergency"

export default function Home() {
  return (
    <main className="shell">
      <header className="top">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            +
          </span>
          <div>
            <h1>CareBot</h1>
            <p>Plain-language health guidance, and when to see a doctor</p>
          </div>
        </div>
      </header>

      <p className="notice">
        CareBot gives general information, not a diagnosis. In an emergency call{" "}
        <a href={`tel:${EMERGENCY_NUMBER}`}>{EMERGENCY_NUMBER}</a> or go to the nearest hospital.
      </p>

      <Chat />

      <footer className="foot">
        Built by <a href="https://samsonolakeye.com">Samson Olakeye</a> ·{" "}
        <a href="https://github.com/SamOpera/CareBot">Source code</a>
      </footer>
    </main>
  )
}

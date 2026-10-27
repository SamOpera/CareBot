import Chat from "@/components/Chat"
import { EMERGENCY_NUMBER } from "@/lib/emergency"

export default function Home() {
  return (
    <main className="shell">
      <header className="top">
        <div className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__mark" src="/helbred-emblem.png" width={52} height={52} alt="HELBRED Initiative" />
          <div>
            <span className="brand__org">HELBRED Initiative</span>
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
        A <a href="https://helbredinitiative.org">HELBRED Initiative</a> project for SDG 3, good health and
        well-being · Developed by <a href="https://samsonolakeye.com">Samson Olakeye</a> ·{" "}
        <a href="https://github.com/SamOpera/CareBot">Source code</a>
      </footer>
    </main>
  )
}

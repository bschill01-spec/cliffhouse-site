// The "stop" link at the bottom of a review request we send for a client (Grow plan). One tap
// stops any more review requests from that business. Email scanners open links on their own,
// so nothing changes until the person presses the button.
import StopButton from "./StopButton";

export const metadata = { title: "Stop review requests", robots: { index: false, follow: false } };

export default async function Stop({ params }) {
  const { token } = await params;
  return (
    <main style={{ maxWidth: 520, margin: "0 auto", padding: "72px 20px", fontFamily: "inherit" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Stop review requests</h1>
      <p style={{ marginBottom: 24 }}>Press the button and you won't get any more emails asking for a review. Nothing else changes.</p>
      <StopButton token={token} />
      <p style={{ marginTop: 40, fontSize: 14, opacity: 0.75 }}>
        Cliffhouse Studio sends these requests for the business on its behalf. Questions? Write to hello@cliffhousestudio.ca
      </p>
    </main>
  );
}

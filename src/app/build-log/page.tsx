import { Navbar } from "@/components/Navbar";
import { BuildLog } from "@/components/BuildLog";

export default function BuildLogPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-16">
        <BuildLog />
      </section>
    </main>
  );
}

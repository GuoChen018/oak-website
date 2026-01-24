import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* FAQ Section */}
      <section className="py-16">
        <FAQ />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        <p>Made with love for focused work sessions.</p>
      </footer>
    </main>
  );
}

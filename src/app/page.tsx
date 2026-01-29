import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* FAQ Section */}
      <section id="faq" className="py-16">
        <FAQ />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        <p>
          Made by{" "}
          <a href="#" className="text-gray-700 hover:text-gray-900 underline">
            Guo
          </a>
          . Photo by{" "}
          <a 
            href="https://unsplash.com/@conti_photos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 underline"
          >
            Fabrizio Conti
          </a>
          {" "}on{" "}
          <a 
            href="https://unsplash.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 underline"
          >
            Unsplash
          </a>
          .
        </p>
      </footer>
    </main>
  );
}

import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import Home from "./pages/Home";

// Home loads first; the other pages when they're opened.
const Features = lazy(() => import("./pages/Features"));
const Security = lazy(() => import("./pages/Security"));
const SelfHost = lazy(() => import("./pages/SelfHost"));
const Changelog = lazy(() => import("./pages/Changelog"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** A new page starts at its top (a #section link goes to the section). */
function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      <ScrollTop />
      <Nav />
      {/* The frame: two thin rules down the page, either side of the content. */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-full max-w-[60rem] -translate-x-1/2 border-line border-x md:block" aria-hidden />
      <main>
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-32 font-mono text-dim text-sm">loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/security" element={<Security />} />
            <Route path="/self-host" element={<SelfHost />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

/**
 * STATION8 Public Market — placeholder home
 * P0 scaffold. The real long-scroll composition arrives in P4.
 */
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-16">
      <div className="max-w-2xl text-center space-y-8">
        <p className="mono-caption text-[color:var(--color-sand-stone)]">
          Station 8 · Public Market · La Jolla
        </p>
        <h1
          className="font-[family-name:var(--font-display)] text-[length:var(--text-display-lg)] leading-[0.95] tracking-tight"
          style={{ color: "var(--color-sand-stone)" }}
        >
          Where Global is Local.
        </h1>
        <p className="text-[color:var(--color-may)]/80 text-base max-w-md mx-auto">
          Cuisine from Around the World. Around the Corner.
        </p>
        <p className="mono-caption text-[color:var(--color-rust)] pt-16">
          Scaffold live · P0 foundation · next → design system
        </p>
      </div>
    </main>
  );
}

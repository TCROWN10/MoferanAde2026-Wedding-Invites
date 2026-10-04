import ScrollReveal from "./ScrollReveal";

const PHRASES = [
  { numeral: "I", before: "This is the", key: "day", after: "", tone: "emerald" },
  { numeral: "II", before: "that the", key: "LORD", after: "has made;", tone: "cream" },
  { numeral: "III", before: "we will", key: "rejoice", after: "", tone: "gold" },
  { numeral: "IV", before: "and be", key: "glad", after: "in it.", tone: "emerald" },
] as const;

export default function VerseCards() {
  return (
    <section className="relative z-10 py-12 md:py-16 lg:py-20 px-5 sm:px-6 flex flex-col items-center">
      <blockquote className="w-full max-w-5xl">
        <p className="sr-only">
          This is the day that the LORD has made; we will rejoice and be glad in it.
        </p>
        <div className="verse-cards" aria-hidden>
          {PHRASES.map((phrase, i) => (
            <ScrollReveal key={phrase.numeral} delayMs={i * 110} className="verse-card-slot">
              <div className={`verse-card verse-card--${phrase.tone}`} style={{ animationDelay: `${i * -1.5}s` }}>
                <span className="verse-card-numeral">{phrase.numeral}</span>
                <p className="verse-card-text">
                  <span>{phrase.before}</span>
                  <span className="verse-card-key">{phrase.key}</span>
                  {phrase.after && <span>{phrase.after}</span>}
                </p>
                <span className="verse-card-flourish">✦</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <footer className="verse-cite">
          <span className="verse-cite-line" aria-hidden />
          <cite>Psalm 118:24</cite>
          <span className="verse-cite-line" aria-hidden />
        </footer>
      </blockquote>
    </section>
  );
}

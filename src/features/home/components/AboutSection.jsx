export function AboutSection() {
  return (
    <section className="py-12 lg:py-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-semibold uppercase tracking-widest">
          Who We Are
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3">
          About <span className="text-primary">Neuronix Technologies</span>
        </h2>

        <p className="text-muted-foreground mt-6 text-base leading-relaxed">
          Neuronix Technologies is a forward-thinking IT services and solutions company helping
          businesses transform digitally through innovative software, modern websites, and
          result-driven marketing strategies.
        </p>

        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          We work closely with startups, SMEs, and growing enterprises to deliver customized
          solutions that improve productivity, strengthen online presence, and support long-term
          business growth.
        </p>
      </div>
    </section>
  );
}

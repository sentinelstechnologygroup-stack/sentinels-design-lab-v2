import Link from "next/link";

export default function LegalPage({ eyebrow, title, updated, children }) {
  return (
    <main className="min-h-screen pb-24 pt-32">
      <article className="mx-auto max-w-4xl px-6">
        <span className="eyebrow mb-5">{eyebrow}</span>
        <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mt-10 space-y-9 text-[15px] leading-7 text-muted-foreground [&_a]:text-primary [&_a]:underline [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_strong]:font-semibold [&_strong]:text-foreground">
          {children}
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <Link href="/contact" className="text-sm font-semibold text-primary">Questions about these terms or your data? Contact Sentinels Design Lab.</Link>
        </div>
      </article>
    </main>
  );
}


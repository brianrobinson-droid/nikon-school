interface HeroBannerProps {
  title: string
}

export default function HeroBanner({ title }: HeroBannerProps) {
  return (
    <section className="w-full bg-neutral-900 py-12">
      <div className="container">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      </div>
    </section>
  )
}

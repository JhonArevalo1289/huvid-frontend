import { ArrowRight, CalendarDays, HeartPulse, PawPrint } from 'lucide-react'

const news = [
  {
    title: 'Cómo actuar ante una emergencia animal',
    date: '12 septiembre 2026',
    excerpt: 'Conoce los pasos esenciales para proteger a un animal lesionado mientras llega la ayuda.',
    icon: HeartPulse,
  },
  {
    title: 'Adoptar también transforma tu vida',
    date: '05 septiembre 2026',
    excerpt: 'Descubre qué debes tener en cuenta antes de abrirle las puertas de tu hogar a una mascota.',
    icon: PawPrint,
  },
  {
    title: 'HUVID conecta ayuda local',
    date: '28 agosto 2026',
    excerpt: 'Nuestra red de veterinarias aliadas acerca atención y acompañamiento a más localidades.',
    icon: CalendarDays,
  },
]

export default function BlogNews() {
  return (
    <section className="bg-[#F4F6F5] px-4 py-16" aria-labelledby="news-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Actualidad HUVID</p>
            <h2 id="news-title" className="text-3xl font-bold text-[#1E5B42] md:text-4xl">Noticias y bienestar animal</h2>
          </div>
          <p className="max-w-md text-[#212121]/70">Información práctica para cuidar, proteger y conectar vidas.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {news.map(({ title, date, excerpt, icon: Icon }) => (
            <article key={title} className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#E67E22]/15 text-[#E67E22]">
                <Icon size={22} aria-hidden="true" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#1E5B42]/70">{date}</p>
              <h3 className="mb-3 text-xl font-bold text-[#212121]">{title}</h3>
              <p className="mb-6 flex-1 leading-relaxed text-[#212121]/70">{excerpt}</p>
              <button type="button" className="inline-flex items-center gap-2 self-start font-semibold text-[#1E5B42] hover:text-[#E67E22]">
                Leer más <ArrowRight size={17} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

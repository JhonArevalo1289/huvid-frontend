import { Clock3, Globe, MapPin, Phone } from 'lucide-react'

const clinics = [
	{ name: 'Clínica Veterinaria PetCare', area: 'Chapinero', phone: '+57 300 123 4567', hours: 'Lun-Dom · 7:00 a.m. - 7:00 p.m.', specialties: 'Emergencias · Cirugía' },
	{ name: 'Veterinaria Los Andes', area: 'Usaquén', phone: '+57 301 987 6543', hours: 'Lun-Sáb · 8:00 a.m. - 6:00 p.m.', specialties: 'Medicina general · Vacunación' },
	{ name: 'Centro Vida Feliz', area: 'La Candelaria', phone: '+57 302 555 5555', hours: 'Atención 24/7', specialties: 'Hospitalización · Urgencias' },
	{ name: 'Mascotas Felices', area: 'Suba', phone: '+57 303 777 7777', hours: 'Lun-Sáb · 8:00 a.m. - 6:00 p.m.', specialties: 'Nutrición · Prevención' },
]

export default function AlliedVeterinarians() {
	return (
		<section className="bg-[#F4F6F5] px-4 py-12" aria-labelledby="vets-title">
			<div className="mx-auto max-w-6xl"><div className="mb-10"><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Red de atención</p><h2 id="vets-title" className="text-4xl font-bold text-[#1E5B42]">Veterinarias aliadas</h2><p className="mt-3 max-w-2xl text-[#212121]/70">Clínicas comprometidas con el bienestar animal y conectadas con la comunidad HUVID.</p></div><div className="grid gap-6 md:grid-cols-2">{clinics.map((clinic) => <article key={clinic.name} className="rounded-xl border-l-4 border-[#1E5B42] bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-[#1E5B42]">{clinic.name}</h3><div className="mt-5 space-y-3 text-sm text-[#212121]/80"><p className="flex items-center gap-3"><MapPin size={18} className="text-[#E67E22]" />{clinic.area}, Bogotá D.C.</p><p className="flex items-center gap-3"><Phone size={18} className="text-[#E67E22]" />{clinic.phone}</p><p className="flex items-center gap-3"><Clock3 size={18} className="text-[#E67E22]" />{clinic.hours}</p><p className="flex items-center gap-3"><Globe size={18} className="text-[#E67E22]" />{clinic.specialties}</p></div></article>)}</div></div>
		</section>
	)
}

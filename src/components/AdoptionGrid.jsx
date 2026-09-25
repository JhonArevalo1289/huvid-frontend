import { Heart, MapPin, Activity } from 'lucide-react'

const pets = [
	{ id: 1, nombre: 'Luna', especie: 'Gata', raza: 'Criolla', salud: 'Excelente', ubicacion: 'Chapinero', imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=450&fit=crop' },
	{ id: 2, nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', salud: 'Bueno', ubicacion: 'Usaquén', imagen: 'https://images.unsplash.com/photo-1633722715463-d30628519e4f?w=600&h=450&fit=crop' },
	{ id: 3, nombre: 'Mico', especie: 'Perro', raza: 'Beagle', salud: 'Excelente', ubicacion: 'La Candelaria', imagen: 'https://images.unsplash.com/photo-1587300411515-150663888081?w=600&h=450&fit=crop' },
]

export default function AdoptionGrid() {
	return (
		<section className="bg-white px-4 py-12" aria-labelledby="adoption-title">
			<div className="mx-auto max-w-6xl">
				<div className="mb-10 text-center"><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Encuentra un compañero</p><h2 id="adoption-title" className="text-4xl font-bold text-[#1E5B42]">Mascotas en adopción</h2></div>
				<div className="grid gap-6 md:grid-cols-3">
					{pets.map((pet) => <article key={pet.id} className="overflow-hidden rounded-xl bg-[#F4F6F5] shadow-sm ring-1 ring-black/5"><img src={pet.imagen} alt={`${pet.nombre}, ${pet.especie}`} className="h-52 w-full object-cover" /><div className="p-5"><h3 className="text-2xl font-bold text-[#1E5B42]">{pet.nombre}</h3><p className="mt-1 text-[#212121]/70">{pet.especie} · {pet.raza}</p><div className="mt-4 flex items-center gap-2 text-sm"><Activity size={17} className="text-[#1E5B42]" /> Salud: <strong>{pet.salud}</strong></div><div className="mt-2 flex items-center gap-2 text-sm"><MapPin size={17} className="text-[#E67E22]" /> {pet.ubicacion}</div><button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E67E22] px-4 py-3 font-bold text-white hover:bg-[#D97013]"><Heart size={18} /> Solicitar adopción</button></div></article>)}
				</div>
			</div>
		</section>
	)
}

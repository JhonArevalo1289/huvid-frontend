import { useState } from 'react'
import { Activity, Heart, MapPin, X } from 'lucide-react'

export default function AdoptionGrid({ pets, onAdoptionRequest }) {
	const [selectedPet, setSelectedPet] = useState(null)
	const [notice, setNotice] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const application = Object.fromEntries(formData.entries())
		onAdoptionRequest(selectedPet.id, application)
		setNotice(`Solicitud enviada para ${selectedPet.nombre}. Nos pondremos en contacto contigo.`)
		setSelectedPet(null)
	}

	return (
		<section className="bg-white px-4 py-12" aria-labelledby="adoption-title">
			<div className="mx-auto max-w-6xl">
				<div className="mb-10 text-center"><p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Encuentra un compañero</p><h2 id="adoption-title" className="text-4xl font-bold text-[#1E5B42]">Mascotas en adopción</h2></div>
				{notice && <p className="mb-6 rounded-lg bg-[#1E5B42]/10 px-4 py-3 text-[#1E5B42]" role="status">{notice}</p>}
				<div className="grid gap-6 md:grid-cols-3">
					{pets.map((pet) => <article key={pet.id} className="overflow-hidden rounded-xl bg-[#F4F6F5] shadow-sm ring-1 ring-black/5"><img src={pet.imagen} alt={`${pet.nombre}, ${pet.especie}`} className="h-52 w-full object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-2"><h3 className="text-2xl font-bold text-[#1E5B42]">{pet.nombre}</h3>{pet.estado === 'Solicitado' && <span className="rounded bg-[#1E5B42]/10 px-2 py-1 text-xs font-bold text-[#1E5B42]">Solicitado</span>}</div><p className="mt-1 text-[#212121]/70">{pet.especie} · {pet.raza}</p><div className="mt-4 flex items-center gap-2 text-sm"><Activity size={17} className="text-[#1E5B42]" /> Salud: <strong>{pet.salud}</strong></div><div className="mt-2 flex items-center gap-2 text-sm"><MapPin size={17} className="text-[#E67E22]" /> {pet.ubicacion}</div><button type="button" disabled={pet.estado === 'Solicitado'} onClick={() => { setNotice(''); setSelectedPet(pet) }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E67E22] px-4 py-3 font-bold text-white hover:bg-[#D97013] disabled:cursor-not-allowed disabled:bg-gray-400"><Heart size={18} /> {pet.estado === 'Solicitado' ? 'Solicitud enviada' : 'Solicitar adopción'}</button></div></article>)}
				</div>
			</div>
			{selectedPet && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="adoption-form-title"><div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-2xl"><div className="flex items-center justify-between bg-[#1E5B42] p-5 text-white"><div><p className="text-sm text-white/75">Solicitud para {selectedPet.nombre}</p><h2 id="adoption-form-title" className="text-xl font-bold">Solicitar adopción</h2></div><button type="button" onClick={() => setSelectedPet(null)} className="rounded p-2 hover:bg-white/10" aria-label="Cerrar formulario"><X size={22} /></button></div><form onSubmit={handleSubmit} className="space-y-4 p-5"><label className="block text-sm font-semibold">Nombre<input name="nombre" required autoComplete="name" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label><label className="block text-sm font-semibold">Teléfono<input name="telefono" type="tel" required autoComplete="tel" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label><label className="block text-sm font-semibold">Motivo de adopción<textarea name="motivo" required rows="3" className="mt-1 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label><label className="block text-sm font-semibold">Dirección en Bogotá<input name="direccion" required autoComplete="street-address" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label><div className="flex justify-end gap-3 border-t border-gray-200 pt-4"><button type="button" onClick={() => setSelectedPet(null)} className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-[#212121] hover:bg-gray-100">Cancelar</button><button type="submit" className="rounded-lg bg-[#E67E22] px-4 py-2 font-bold text-white hover:bg-[#D97013]">Enviar solicitud</button></div></form></div></div>}
		</section>
	)
}

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Clock, MapPin } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Events Component - Displays a grid of upcoming school activities.
 * Features a loading skeleton and handles both paginated and non-paginated API responses.
 */
function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_URL}/Event/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        // ✅ gère les données paginées et non-paginées
        const results = Array.isArray(data) ? data : data.results
        setEvents(results)
      })
      .catch((err) => console.error("Erreur lors de la récupération des événements:", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-6 py-16'>

      {/* En-tête */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>Nos Événements</h2>
        <p className='text-gray-500 mt-2'>Restez informé de nos dernières actualités et événements</p>
        <div className='w-16 h-1 bg-indigo-600 rounded-full mx-auto mt-4'></div>
      </div>

      {/* Squelette de chargement (Skeleton) */}
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='animate-pulse bg-white rounded-2xl shadow overflow-hidden'>
              <div className='w-full h-48 bg-gray-200'></div>
              <div className='p-5 flex flex-col gap-3'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-3 bg-gray-200 rounded w-full'></div>
                <div className='h-3 bg-gray-200 rounded w-5/6'></div>
                <div className='h-3 bg-gray-200 rounded w-1/2'></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className='bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100 overflow-hidden group'
            >
              {/* Image */}
              <div className='w-full h-48 overflow-hidden relative'>
                <img
                  src={event.image}
                  alt={event.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
                />
                {/* Badge horaire */}
                <div className='absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1'>
                  <Clock size={11} />
                  {event.time_from}
                </div>
              </div>

              {/* Contenu */}
              <div className='p-5 flex flex-col gap-3'>

                <h3 className='text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition line-clamp-1'>
                  {event.title}
                </h3>

                <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>
                  {event.description}
                </p>

                {/* Horaire */}
                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <Clock size={13} className='text-indigo-400' />
                  <span>{event.time_from} — {event.time_to}</span>
                </div>

                {/* Lieu */}
                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <MapPin size={13} className='text-indigo-400' />
                  <span>{event.location}</span>
                </div>

                <div className='border-t border-gray-100 pt-3 mt-1 flex items-center justify-end'>
                  <span className='text-xs text-indigo-600 font-medium group-hover:underline'>
                    Voir les détails →
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Tout Voir */}
      <div className='text-center mt-10'>
        <button
          onClick={() => navigate('/EventsList')}
          className='bg-indigo-600 hover:text-white transition font-medium text-sm'
        >
          Voir tous les événements →
        </button>
      </div>

    </div>
  )
}

export default Events
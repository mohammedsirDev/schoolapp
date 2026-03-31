import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/Event/?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setEvents(data.results)
        setTotalPages(Math.ceil(data.count / 6))
      })
      .catch((err) => console.error("Erreur lors de la récupération des événements:", err))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className='max-w-7xl mx-auto px-6 py-16'>

      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>Nos Événements</h2>
        <p className='text-gray-500 mt-2'>Restez informé de nos derniers événements</p>
        <div className='w-16 h-1 bg-indigo-600 rounded-full mx-auto mt-4'></div>
      </div>

      {/* Skeleton (Chargement) */}
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
          {events.map((event) => (
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
                <div className='absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1'>
                  <Clock size={11} />
                  {event.time_from}
                </div>
              </div>

              {/* Content */}
              <div className='p-5 flex flex-col gap-3'>

                <h3 className='text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition line-clamp-1'>
                  {event.title}
                </h3>

                <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>
                  {event.description}
                </p>

                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <Clock size={13} className='text-indigo-400' />
                  <span>{event.time_from} — {event.time_to}</span>
                </div>
                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <Clock size={13} className='text-indigo-400' />
                  <span>{event.date} </span>
                </div>

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

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className='flex items-center justify-center gap-3 mt-12'>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className='px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition'
          >
            ← Précédent
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-full text-sm font-medium transition ${
                p === page
                  ? 'bg-indigo-600 text-white'
                  : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className='px-5 py-2 rounded-full border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition'
          >
            Suivant →
          </button>
        </div>
      )}

    </div>
  )
}

export default EventsList
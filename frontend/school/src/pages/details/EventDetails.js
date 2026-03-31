import { Calendar, Clock, MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/Event/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => setEvent(data))
      .catch((err) => console.error("Error fetching event:", err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Chargement de l'événement...</p>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10'>

      {/* Image */}
      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>
        <img src={event.image} alt={event.title} className='w-full h-72 object-cover' />

        {/* Contenu */}
        <div className='p-6 space-y-4'>
          <h1 className="text-3xl font-bold text-[#b04ba2]">{event.title}</h1>
          <h3 className="text-3xl font-bold text-[#b04ba2]">{event.date}</h3>
          <p className="text-gray-600 leading-relaxed">{event.description}</p>
        </div>

        {/* Cartes d'info */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6'>

          <div className='flex items-center gap-3 p-4 bg-violet-50 rounded-lg'>
            <Calendar className='text-indigo-500' />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{event.date}</p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-4 bg-violet-50 rounded-lg'>
            <Clock className='text-indigo-500' />
            <div>
              <p className="text-sm text-gray-500">Horaire</p>
              <p className="font-semibold">{event.time_from} - {event.time_to}</p>
            </div>
          </div>

          <div className='flex items-center gap-3 p-4 bg-violet-50 rounded-lg'>
            <MapPin className='text-indigo-500' />
            <div>
              <p className="text-sm text-gray-500">Lieu</p>
              <p className="font-semibold">{event.location}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default EventDetails
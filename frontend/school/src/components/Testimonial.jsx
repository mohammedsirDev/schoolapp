import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import {API_URL} from '../utils/api'
function Testimonial() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_URL}/Testimonial/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results
        setTestimonials(results)
      })
      .catch((err) => console.error("Error fetching testimonials:", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-6 py-16'>

      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>Ce que disent nos étudiants</h2>
        <p className='text-gray-500 mt-2'>Avis authentiques de notre communauté grandissante</p>
        <div className='w-16 h-1 bg-indigo-600 rounded-full mx-auto mt-4'></div>
      </div>

      {/* Skeleton */}
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='animate-pulse bg-white rounded-2xl shadow p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-12 h-12 rounded-full bg-gray-200'></div>
                <div className='flex flex-col gap-2'>
                  <div className='h-3 bg-gray-200 rounded w-24'></div>
                  <div className='h-3 bg-gray-200 rounded w-32'></div>
                </div>
              </div>
              <div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-4/5 mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-3/5'></div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              onClick={() => navigate(`/testimonials/${testimonial.id}`)}
              className='bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer p-6 flex flex-col gap-4 border border-gray-100'
            >
              {/* Guillemet */}
              <span className='text-5xl text-indigo-200 font-serif leading-none'>"</span>

              {/* Commentaire */}
              <p className='text-gray-600 text-sm leading-relaxed -mt-4 line-clamp-3'>
                {testimonial?.comment}
              </p>

              {/* Étoiles */}
              <div className='flex gap-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < testimonial?.rating ? "gold" : "none"}
                    stroke="gold"
                  />
                ))}
              </div>

              {/* Utilisateur */}
              <div className='border-t border-gray-100 pt-4 flex items-center gap-3'>
                <img
                  className='w-10 h-10 rounded-full object-cover border-2 border-indigo-100'
                  src={testimonial?.user?.image || "/profile.jpg"}
                  alt={testimonial?.user?.name}
                />
                <div>
                  <p className='text-sm font-semibold text-gray-800'>{testimonial?.user?.name}</p>
                  <p className='text-xs text-gray-400'>{testimonial?.user?.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton */}
      <div className='text-center mt-10'>
        <button
          onClick={() => navigate('/testimonial')}
          className='bg-indigo-600 hover:text-white transition font-medium text-sm'
        >
          Partagez votre expérience →
        </button>
      </div>

    </div>
  )
}

export default Testimonial
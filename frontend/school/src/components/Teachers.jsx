import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
/**
 * Teachers Component - Displays a circular profile grid of educators.
 * Uses a hover-effect design and fetches data from the Django Teacher API.
 */
function Teachers() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/Teacher/")
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const results = Array.isArray(data) ? data : data.results
        setTeachers(results)
      })
      .catch((err) => console.error("Error fetching teachers:", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='max-w-7xl mx-auto px-6 py-16'>

      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>Nos Enseignants</h2>
        <p className='text-gray-500 mt-2'>Rencontrez nos éducateurs expérimentés et dévoués</p>
        <div className='w-16 h-1 bg-indigo-600 rounded-full mx-auto mt-4'></div>
      </div>

      {/* Skeleton */}
      {loading ? (
        <div className='flex justify-center gap-8 flex-wrap'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex flex-col items-center gap-3 animate-pulse'>
              <div className='w-40 h-40 rounded-full bg-gray-200'></div>
              <div className='h-4 bg-gray-200 rounded w-24'></div>
              <div className='h-3 bg-gray-200 rounded w-20'></div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-wrap justify-center gap-10'>
          {teachers.slice(0, 6).map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              className='flex flex-col items-center gap-3 cursor-pointer group'
            >
              {/* Circle Image */}
              <div className='w-40 h-40 rounded-full overflow-hidden border-4 border-purple-200 group-hover:border-indigo-500 transition-all shadow-md'>
                <img
                  className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
                  src={teacher?.image}
                  alt={teacher?.name}
                />
              </div>

              {/* Nom */}
              <h2 className='text-[#b04ba2] font-bold text-[15px] text-center group-hover:text-indigo-600 transition'>
                {teacher?.name}
              </h2>

              {/* Matière */}
              <span className='text-xs text-gray-500 bg-purple-50 px-3 py-1 rounded-full text-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition'>
                {teacher?.subject}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Voir tout */}
      <div className='text-center mt-10'>
        <button
          onClick={() => navigate('/TeachersList')}
          className='bg-indigo-600 hover:text-white transition font-medium text-sm'
        >
          Voir tous les enseignants →
        </button>
      </div>

    </div>
  )
}

export default Teachers
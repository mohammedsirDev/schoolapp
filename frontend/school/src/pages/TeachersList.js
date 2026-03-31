import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function TeachersList() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/Teacher/?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setTeachers(data.results)
        setTotalPages(Math.ceil(data.count / 6))
      })
      .catch((err) => console.error("Erreur lors de la récupération des enseignants:", err))
      .finally(() => setLoading(false))
  }, [page])

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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className='animate-pulse bg-white rounded-2xl shadow overflow-hidden p-6'>
              <div className='w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4'></div>
              <div className='h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3'></div>
              <div className='h-3 bg-gray-200 rounded w-full mb-2'></div>
              <div className='h-3 bg-gray-200 rounded w-5/6 mx-auto'></div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              className='bg-white rounded-2xl shadow hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group p-6 flex flex-col items-center text-center'
            >
              {/* Profile Picture Circle */}
              <div className='relative w-32 h-32 mb-4'>
                <div className='w-full h-full rounded-full overflow-hidden border-4 border-indigo-50 shadow-inner bg-gray-50'>
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className='w-full h-full object-cover object-top group-hover:scale-110 transition duration-500'
                  />
                </div>
                <div className='absolute bottom-0 right-2 w-6 h-6 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center'>
                   <BookOpen size={10} className='text-white' />
                </div>
              </div>

              {/* Content */}
              <div className='flex flex-col gap-2 w-full'>
                <h3 className='text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition line-clamp-1'>
                  {teacher.name}
                </h3>

                <div className='inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mx-auto'>
                  {teacher.subject}
                </div>

                <p className='text-sm text-gray-500 leading-relaxed line-clamp-2 mt-2'>
                  {teacher.description}
                </p>

                <div className='border-t border-gray-100 pt-4 mt-4 flex items-center justify-center'>
                  <span className='text-sm text-indigo-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all'>
                    Voir le profil <span>→</span>
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

export default TeachersList
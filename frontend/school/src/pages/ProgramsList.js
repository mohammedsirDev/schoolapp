import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import {Clock, BookOpen, Users } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

function ProgramsList() {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/Program/?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setPrograms(data.results)
        setTotalPages(Math.ceil(data.count / 6))
      })
      .catch((err) => console.error("Error fetching programs:", err))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className='max-w-7xl mx-auto px-6 py-16'>

      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>Our Programs</h2>
        <p className='text-gray-500 mt-2'>Explore our wide range of educational programs</p>
        <div className='w-16 h-1 bg-indigo-600 rounded-full mx-auto mt-4'></div>
      </div>

      {/* Skeleton */}
      {loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className='animate-pulse bg-white rounded-2xl shadow overflow-hidden'>
              <div className='w-full h-48 bg-gray-200'></div>
              <div className='p-5 flex flex-col gap-3'>
                <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                <div className='h-3 bg-gray-200 rounded w-full'></div>
                <div className='h-3 bg-gray-200 rounded w-5/6'></div>
                <div className='flex gap-3 mt-2'>
                  <div className='h-6 bg-gray-200 rounded w-16'></div>
                  <div className='h-6 bg-gray-200 rounded w-16'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {programs.map((program) => (
            <div
              key={program.id}
              onClick={() => navigate(`/programs/${program.id}`)}
              className='bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100 overflow-hidden group'
            >
              {/* Image */}
              <div className='w-full h-48 overflow-hidden relative'>
                <img
                  src={program.image}
                  alt={program.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
                />
                <div className='absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full'>
                  ${program.price}
                </div>
              </div>

              {/* Content */}
              <div className='p-5 flex flex-col gap-3'>
                {program?.teacher && (
                  <div className='flex items-center gap-2'>
                    <img
                      src={program.teacher.image}
                      alt={program.teacher.name}
                      className='w-7 h-7 rounded-full object-cover border-2 border-indigo-100'
                    />
                    <span className='text-xs text-indigo-600 font-medium'>{program.teacher.name}</span>
                  </div>
                )}

                <h3 className='text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition line-clamp-1'>
                  {program.title}
                </h3>

                <p className='text-sm text-gray-500 leading-relaxed line-clamp-2'>
                  {program.description}
                </p>

                <div className='grid grid-cols-2 gap-2 mt-1'>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <Users size={13} className='text-indigo-400' />
                    <span>{program.seats} seats</span>
                  </div>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <BookOpen size={13} className='text-indigo-400' />
                    <span>{program.lessons} lessons</span>
                  </div>
                  <div className='flex items-center gap-1 text-xs text-gray-500'>
                    <Clock size={13} className='text-indigo-400' />
                    <span>{program.hours} hours</span>
                  </div>
                </div>

              <div className='border-t border-gray-100 pt-3 mt-1 flex items-center justify-end'>
                <button type="button" className='text-xs text-indigo-600 font-medium group-hover:underline'>
                  View Details →
                </button>
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
            ← Previous
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
            Next →
          </button>
        </div>
      )}

    </div>
  )
}

export default ProgramsList
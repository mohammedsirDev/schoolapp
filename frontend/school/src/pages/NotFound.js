import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-50'>

      {/* 404 Number */}
      <h1 className='text-[160px] font-black text-indigo-100 leading-none select-none'>
        404
      </h1>

      {/* Message */}
      <div className='text-center mt-4 mb-6'>
        <h2 className='text-3xl font-bold text-gray-800 mb-3'>Page non trouvée</h2>
        <p className='text-gray-500 text-sm max-w-md leading-relaxed'>
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
      </div>

      {/* Divider */}
      <div className='w-16 h-1 bg-indigo-600 rounded-full mx-auto mb-10'></div>

      {/* Buttons */}
      <div className='flex items-center gap-5'>
        <button
          onClick={() => navigate(-1)}
          className='px-8 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 active:scale-95 transition text-sm font-medium'
        >
          ← Retour
        </button>
        <button
          onClick={() => navigate('/')}
          className='px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition text-sm font-medium'
        >
          Accueil
        </button>
      </div>

    </div>
  )
}

export default NotFound
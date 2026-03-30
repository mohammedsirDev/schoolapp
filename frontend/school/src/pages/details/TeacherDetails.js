import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function TeacherDetails() {
  const { id } = useParams()
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/Teacher/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des données")
        return res.json()
      })
      .then((data) => setTeacher(data))
      .catch((err) => console.error("Erreur:", err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      {/* "Chargement de l'enseignant..." covers "Loading Teacher..." */}
      <p className="text-gray-600 animate-pulse">Chargement de l'enseignant...</p>
    </div>
  )

  if (!teacher) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600">Enseignant non trouvé.</p>
    </div>
  )

  return (
    <div className='max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center'> {/* Vertically center elements */}

        {/* ✅ Updated Image Container (Circular and Centered within its column) */}
        <div className='flex justify-center md:justify-end'> {/* Center on small, align right on medium+ */}
          <div className='w-56 h-56 rounded-full overflow-hidden border-4 border-[#b04ba2] shadow-md'>
            <img
              src={teacher?.image}
              alt={teacher?.name}
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        <div className='p-3 flex flex-col gap-2 items-center md:items-start text-center md:text-left'> {/* Center text on small, align left on medium+ */}
          <h2 className='text-3xl font-bold text-[#b04ba2]'>{teacher?.name}</h2>
          {/* Subject labels like "Maths" or "Science" usually come from the DB, 
              but the styling remains consistent */}
          <p className='text-gray-500 font-semibold text-lg'>{teacher?.subject}</p>
          
          {/* If you have a description field, you could add it here */}
          {teacher?.Description && (
            <p className='text-sm text-gray-600 mt-3 leading-relaxed max-w-lg'> {/* Added leading for better readability and a max-width */}
              {teacher.Description}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default TeacherDetails
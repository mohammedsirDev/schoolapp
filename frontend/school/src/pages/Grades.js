import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'

function Grades() {
  const { role, token } = useAuth()
  const navigate = useNavigate()
  const [grades, setGrades] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token && role===null)
       navigate('/login')  // ✅ Redirection si non connecté
  }, [token, navigate])

  useEffect(() => {
    if (token) {
      setLoading(true)
      fetch("http://127.0.0.1:8000/Grade/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGrades(data.results)          
          setLoading(false)
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des notes:", err)
          setLoading(false)
        })
    }
  }, [token])

  const getMarkColor = (mark) => {
    if (mark >= 15) return "bg-green-100 text-green-700"
    if (mark >= 12) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  const getGradeLevelLabel = (mark) => {
    if (mark >= 15) return "Excellent"
    if (mark >= 13) return "Bien"
    if (mark >= 10) return "Passable"
    return "Insuffisant"
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600 animate-pulse">Chargement de vos notes...</p>
    </div>
  )

  return (
    <div className='max-w-7xl mx-auto mt-10 px-4'>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes Notes</h2>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Matière</th>
              <th scope="col" className="px-6 py-3">Note / 20</th>
              <th scope="col" className="px-6 py-3">Appréciation</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? (
              grades.map((grade) => (
                <tr key={grade.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {grade?.subject?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full font-semibold ${getMarkColor(grade?.mark)}`}>
                      {grade?.mark ?? "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {getGradeLevelLabel(grade?.mark)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                  Aucune note disponible pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Grades
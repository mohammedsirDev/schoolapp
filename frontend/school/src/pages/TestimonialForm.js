import React, { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import axios from 'axios'
import Swal from 'sweetalert2'

import {API_URL} from '../utils/api'
// Professional Toast Configuration
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

function TestimonialForm() {
  const { token, role } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!role || !token) navigate('/login')
  }, [role, token,navigate])

  const [form, setForm] = useState({ comment: "", rating: 5, name: "", email: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.comment) {
      return Toast.fire({
        icon: 'warning',
        title: 'Veuillez remplir tous les champs'
      });
    }

    if (!token) {
      return Toast.fire({
        icon: 'error',
        title: 'Vous devez être connecté'
      });
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/Testimonial/`, form, {
        headers: { Authorization: `Token ${token}` }
      })

      Toast.fire({
        icon: 'success',
        title: 'Témoignage envoyé !'
      })

      setForm({ comment: "", rating: 5, name: "", email: "" })
      setTimeout(() => navigate("/"), 2000)
    } catch (error) {
      const data = error.response?.data
      const firstField = data ? Object.keys(data)[0] : null
      const errorMsg = firstField && Array.isArray(data[firstField])
        ? `${firstField}: ${data[firstField][0]}`
        : data?.detail || "Échec de l'envoi"

      Toast.fire({
        icon: 'error',
        title: errorMsg
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      {/* Gauche - Image & Message */}
      <div className='hidden md:flex flex-1 relative bg-indigo-600'>
        <div className='absolute inset-0 bg-indigo-900/60 flex flex-col items-center justify-center text-white p-10'>
          <h1 className='text-4xl font-bold mb-4'>Partagez votre expérience</h1>
          <p className='text-lg text-indigo-200 text-center'>
            Vos retours nous aident à grandir et à améliorer notre communauté.
          </p>
        </div>
      </div>

      {/* Droite - Formulaire */}
      <div className='flex-1 flex items-center justify-center bg-gray-50 p-8'>
        <div className='w-full max-w-md'>

          {/* Logo */}
          <div className='text-center mb-8'>
            <span className='text-3xl font-bold text-indigo-600'>🎓 SchoolApp</span>
            <p className='text-gray-500 mt-2 text-sm'>Nous aimerions avoir votre avis</p>
          </div>

          <div className='bg-white shadow-lg rounded-2xl p-8'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Nom</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Entrez votre nom"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Commentaire</label>
                <textarea
                  name="comment"
                  placeholder="Partagez votre expérience avec nous..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  rows={4}
                />
              </div>

              {/* Note par étoiles */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Note</label>
                <div className='flex gap-2'>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <Star
                      key={val}
                      onClick={() => setForm({ ...form, rating: val })}
                      size={28}
                      fill={val <= form.rating ? "gold" : "none"}
                      stroke="gold"
                      className="cursor-pointer transition hover:scale-110"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-medium mt-2"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le témoignage'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialForm
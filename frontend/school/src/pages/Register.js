import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../auth/AuthContext'
import Swal from 'sweetalert2'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

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

function Register() {
  const { role, token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "", first_name: "", last_name: "", email: "", password: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (role || token) navigate('/')
  }, [role, token, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.username || !form.first_name || !form.last_name || !form.email || !form.password) {
      return Toast.fire({
        icon: 'warning',
        title: 'Veuillez remplir tous les champs.'
      })
    }

    if (form.password.length < 6) {
      return Toast.fire({
        icon: 'warning',
        title: 'Mot de passe trop court (min. 6).'
      })
    }

    setLoading(true)
    try {
      await axios.post(`${API_URL}/users/`, form)
      
      await Toast.fire({
        icon: 'success', 
        title: 'Compte créé !',
        text: 'Votre inscription a été effectuée avec succès.',
        confirmButtonColor: '#4f46e5',
      })
      navigate('/login')
    } catch (error) {
      const data = error.response?.data
      const errorMessage = data ? Object.values(data).flat()[0] : "Une erreur s'est produite."
      
      Toast.fire({ 
        icon: 'error', 
        title: errorMessage 
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
          <h1 className='text-4xl font-bold mb-4'>Rejoignez-nous !</h1>
          <p className='text-lg text-indigo-200 text-center'>Créez votre compte et commencez votre parcours d'apprentissage dès aujourd'hui.</p>
        </div>
      </div>

      {/* Droite - Formulaire */}
      <div className='flex-1 flex items-center justify-center bg-gray-50 p-8'>
        <div className='w-full max-w-md'>

          {/* Logo */}
          <div className='text-center mb-8'>
            <span className='text-3xl font-bold text-indigo-600'>🎓 SchoolApp</span>
            <p className='text-gray-500 mt-2 text-sm'>Créez votre compte gratuit</p>
          </div>

          <div className='bg-white shadow-lg rounded-2xl p-8'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Nom d'utilisateur</label>
                <input type="text" name="username" placeholder="Choisissez un nom d'utilisateur" value={form.username} onChange={handleChange} 
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"  />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Prénom</label>
                <input type="text" name="first_name" placeholder="Votre prénom" value={form.first_name} onChange={handleChange} 
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"  />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Nom</label>
                <input type="text" name="last_name" placeholder="Votre nom de famille" value={form.last_name} onChange={handleChange} 
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"  />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Email</label>
                <input type="email" name="email" placeholder="votre@email.com" value={form.email} onChange={handleChange} 
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"  />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Mot de passe</label>
                <input type="password" name="password" placeholder="Min. 6 caractères" value={form.password} onChange={handleChange} minLength="6"
                  className="border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"  />
              </div>

              <button type="submit" disabled={loading}
                className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-medium mt-2">
                {loading ? 'Inscription en cours...' : 'Créer un compte'}
              </button>

            </form>

            <p className='text-center text-sm text-gray-500 mt-6'>
              Vous avez déjà un compte ?{' '}
              <a href='/login' className='text-indigo-600 font-medium hover:underline'>Se connecter</a>
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Register
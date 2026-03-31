import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuth } from '../auth/AuthContext'

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

function Login() {
  const navigate = useNavigate()
  const { role, token, login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (role || token) navigate('/')
  }, [role, token, navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${API_URL}/auth/`, form)
      const { data: profileData } = await axios.get(`${API_URL}/profile/`, {
        headers: { Authorization: `Token ${data.token}` }
      })
      const userRole = profileData.results[0]?.role
      console.log(profileData);
      
      login(data.token, userRole)
      
      Toast.fire({ 
        icon: 'success', 
        title: 'Connexion réussie !', 
        timer: 2000, 
        showConfirmButton: false 
      })
      
      setTimeout(() => navigate("/"), 2000)
    } catch (error) {
      Toast.fire({ 
        icon: 'error', 
        title: 'Erreur', 
        text: 'Nom d\'utilisateur ou mot de passe incorrect' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      {/* Gauche - Image & Message d'accueil */}
      <div className='hidden md:flex flex-1 relative bg-indigo-600'>
        <div className='absolute inset-0 bg-indigo-900/60 flex flex-col items-center justify-center text-white p-10'>
          <h1 className='text-4xl font-bold mb-4'>Ravi de vous revoir !</h1>
          <p className='text-lg text-indigo-200 text-center'>
            Connectez-vous pour accéder à votre tableau de bord, vos notes et vos programmes.
          </p>
        </div>
      </div>

      {/* Droite - Formulaire */}
      <div className='flex-1 flex items-center justify-center bg-gray-50 p-8'>
        <div className='w-full max-w-md'>

          {/* Logo */}
          <div className='text-center mb-8'>
            <span className='text-3xl font-bold text-indigo-600'>🎓 SchoolApp</span>
            <p className='text-gray-500 mt-2 text-sm'>Connectez-vous à votre compte</p>
          </div>

          <div className='bg-white shadow-lg rounded-2xl p-8'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

              {/* Nom d'utilisateur */}
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Email</label>
                <input
                  type='text'
                  name='username'
                  placeholder="Entrez votre nom Email"
                  value={form.username}
                  onChange={handleChange}
                  className='border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                />
              </div>

              {/* Mot de passe */}
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium text-gray-700'>Mot de passe</label>
                <input
                  type='password'
                  name='password'
                  placeholder='Entrez votre mot de passe'
                  value={form.password}
                  onChange={handleChange}
                  className='border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition'
                />
              </div>

              {/* Bouton de connexion */}
              <button
                type='submit'
                disabled={loading}
                className='bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 font-medium mt-2'
              >
                {loading ? 'Connexion en cours...' : 'Se connecter'}
              </button>

            </form>

            {/* Lien d'inscription */}
            <p className='text-center text-sm text-gray-500 mt-6'>
              Vous n'avez pas de compte ?{' '}
              <a href='/register' className='text-indigo-600 font-medium hover:underline'>
                S'inscrire
              </a>
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
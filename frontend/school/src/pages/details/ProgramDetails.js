import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DollarSign, User, BookOpen, Clock, MessageSquare, LogIn } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../../auth/AuthContext'
import Swal from 'sweetalert2'

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

function ProgramDetails() {
  const { id } = useParams()
  const { token } = useAuth()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/Program/${id}/`)
      .then((res) => res.json())
      .then((data) => setProgram(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddReview = async (e) => {
    e.preventDefault()

    // ✅ Check if all fields are filled
    if (!name.trim() || !email.trim() || !newComment.trim()) {
      return Toast.fire({
        icon: 'warning',
        title: 'Veuillez remplir tous les champs'
      });
    }

    setSubmitting(true)

    try {
      await axios.post("http://127.0.0.1:8000/Review/", {
        comment: newComment,
        name,
        email,
        program: id
      }, {
        headers: { Authorization: `Token ${token}` }
      })
      
      // ✅ Success Toast
      Toast.fire({
        icon: 'success',
        title: 'Avis soumis avec succès !'
      });

      setNewComment("")
      setName("")
      setEmail("")
      
      const updated = await fetch(`http://127.0.0.1:8000/Program/${id}/`).then(res => res.json())
      setProgram(updated)
      
    } catch (error) {
      const data = error.response?.data
      const errorMsg = data ? Object.values(data).flat()[0] : "Échec de la soumission"
      
      // ✅ Error Toast
      Toast.fire({
        icon: 'error',
        title: errorMsg
      });
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  )

  if (!program) return (
    <div className="flex justify-center items-center min-h-screen text-center p-6">
      <div>
        <p className="text-2xl font-bold text-red-500 mb-2">404</p>
        <p className="text-gray-600">Programme introuvable ou lien expiré.</p>
        <Link to="/programs" className="mt-4 inline-block text-indigo-600 hover:underline">Retourner aux programmes</Link>
      </div>
    </div>
  )

  return (
    <div className='max-w-5xl mx-auto p-4 md:p-6 mt-10 mb-20'>
      <div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100'>
        
        {/* Image Section */}
        <div className="relative">
          <img src={program.image} alt={program.title} className='w-full h-80 object-cover' />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold text-indigo-600 shadow">
            {program.price} DH
          </div>
        </div>

        {/* Content Section */}
        <div className='p-8 space-y-6'>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#b04ba2]">{program.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{program.description}</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 pb-8'>
          {[
            { icon: <DollarSign className='text-emerald-500'/>, label: "Prix", value: `${program.price} DH`, bg: "bg-emerald-50" },
            { icon: <User className='text-blue-500'/>, label: "Places", value: program.seats, bg: "bg-blue-50" },
            { icon: <BookOpen className='text-amber-500'/>, label: "Leçons", value: program.lessons, bg: "bg-amber-50" },
            { icon: <Clock className='text-purple-500'/>, label: "Heures", value: `${program.hours}h`, bg: "bg-purple-50" }
          ].map((stat, index) => (
            <div key={index} className={`flex items-center gap-3 p-4 ${stat.bg} rounded-xl`}>
              {stat.icon}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Section */}
        {program?.teacher && (
          <div className='mx-8 mb-8 p-6 bg-gray-50 rounded-2xl flex flex-col md:flex-row items-center gap-6 border border-gray-200'>
            {program.teacher.image && (
              <img
                className='w-24 h-24 object-cover rounded-full ring-4 ring-white shadow-lg'
                src={program.teacher.image}
                alt={program.teacher.name}
              />
            )}
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-indigo-500 uppercase">Votre Enseignant</p>
              <h2 className="text-xl font-bold text-gray-800">{program.teacher.name}</h2>
              <p className="text-indigo-600 font-medium mb-2">{program.teacher.subject}</p>
              <p className="text-sm text-gray-600 italic">"{program.teacher.Description}"</p>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className='mt-12'>
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="text-gray-400" />
          <h3 className='text-2xl font-bold text-gray-800 font-serif'>Avis des étudiants</h3>
        </div>

        {program?.reviews && program.reviews.length > 0 ? (
          <div className='grid gap-4 mb-8'>
            {program.reviews.slice(-3).reverse().map((review) => (
              <div key={review.id} className='p-6 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition'>
                <p className='text-gray-700 italic mb-3 text-lg'>"{review?.comment}"</p>
                <div className="flex items-center justify-between border-t pt-3">
                  <p className='font-bold text-sm text-indigo-600'>@ {review?.user?.name || review.name}</p>
                  <p className='text-xs text-gray-400'> 
                    {new Date(review?.reated_at || Date.now()).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 mb-8">
            <p className="text-gray-500">Aucun avis pour le moment. Soyez le premier !</p>
          </div>
        )}
      </div>

      {/* Add Review Section */}
      <div className='mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
        <h3 className='mb-6 text-2xl font-bold text-gray-800'>Partagez votre avis</h3>
        
        {token ? (
          <form onSubmit={handleAddReview} className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-gray-100 p-4 rounded-xl focus:border-indigo-500 focus:outline-none transition"
              />
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-100 p-4 rounded-xl focus:border-indigo-500 focus:outline-none transition"
              />
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Que pensez-vous de ce cours ?'
              className="border-2 border-gray-100 p-4 rounded-xl focus:border-indigo-500 focus:outline-none transition h-32"
            />
            <button
              disabled={submitting}
              type='submit'
              className='bg-[#b04ba2] text-white py-4 rounded-xl hover:bg-[#923d86] transition-all font-bold text-lg shadow-lg disabled:opacity-50'
            >
              {submitting ? "Envoi en cours..." : "Publier mon avis"}
            </button>
          </form>
        ) : (
          <div className="bg-indigo-50 border-2 border-indigo-100 p-8 rounded-2xl text-center group">
            <div className="inline-flex p-4 bg-white rounded-full mb-4 shadow-sm group-hover:scale-110 transition">
              <LogIn className="text-indigo-600" size={32} />
            </div>
            <p className="text-indigo-900 font-semibold text-lg mb-4">
              Vous avez suivi ce cours ? Connectez-vous pour laisser votre avis !
            </p>
            <Link 
              to="/login" 
              className="inline-block bg-[#b04ba2] text-white px-8 py-3 rounded-xl hover:bg-[#923d86] transition-all font-bold shadow-md"
            >
              Se connecter
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgramDetails
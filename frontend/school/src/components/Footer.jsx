import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">

      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-white">🎓 SchoolApp</span>
          <p className="text-sm leading-relaxed">
            L'excellence en éducation — accompagner les élèves et les enseignants avec des outils modernes et une communauté en pleine croissance.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-400 transition text-xs">f</a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-400 transition text-xs">in</a>
            <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-400 transition text-xs">tw</a>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">Liens Rapides</h4>
          <a href="/" className="text-sm hover:text-indigo-400 transition">Accueil</a>
          <a href="/TeachersList" className="text-sm hover:text-indigo-400 transition">Enseignants</a>
          <a href="/ProgramsList" className="text-sm hover:text-indigo-400 transition">Programmes</a>
          <a href="/EventsList" className="text-sm hover:text-indigo-400 transition">Événements</a>
        </div>

        {/* Compte */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">Mon Compte</h4>
          <a href="/login" className="text-sm hover:text-indigo-400 transition">Connexion</a>
          <a href="/register" className="text-sm hover:text-indigo-400 transition">Inscription</a>
          <a href="/grades" className="text-sm hover:text-indigo-400 transition">Mes Notes</a>
          <a href="/testimonial" className="text-sm hover:text-indigo-400 transition">Témoignages</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-1">Contact</h4>
          <p className="text-sm">📍 123 Rue de l'École, Rabat, Maroc</p>
          <p className="text-sm">📞 +212 600 000 000</p>
          <p className="text-sm">✉️ contact@schoolapp.com</p>
          <p className="text-sm">🕒 Lun - Ven, 8h - 17h</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SchoolApp. Tous droits réservés. Fait avec ❤️ pour l'éducation.
      </div>

    </footer>
  )
}

export default Footer
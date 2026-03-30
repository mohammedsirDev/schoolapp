import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { role, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  }

  // Define Strong Blue & White Styles
  // btnPrimary: Solid Blue with White Text
  const btnPrimary = "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-95 transition-all border-2 border-indigo-600";
  
  // btnOutline: White Background with Blue Text and Border
  const btnOutline = "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 active:scale-95 transition-all";
  
  // btnSecondary: Keeping your accent color for "Mes Notes"
  const btnSecondary = "bg-[#C45B7D] text-white hover:bg-[#a34a68] shadow-md active:scale-95 transition-all border-2 border-[#C45B7D]";

  return (
    <div className="text-sm text-white w-full font-sans">
      {/* Top Bar */}
      <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
        <p>📚 L'excellence en éducation — Rejoignez notre communauté !</p>
      </div>

      <nav className="relative h-[75px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 shadow-sm z-50">
        
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <span className="text-2xl font-black tracking-tight text-indigo-600">🎓 SchoolApp</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8 font-semibold text-gray-700">
          <li><Link to="/" className="hover:text-indigo-600 transition">Accueil</Link></li>
          <li><Link to="/TeachersList" className="hover:text-indigo-600 transition">Enseignants</Link></li>
          <li><Link to="/ProgramsList" className="hover:text-indigo-600 transition">Programmes</Link></li>
          <li><Link to="/eventsList" className="hover:text-indigo-600 transition">Événements</Link></li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!role ? (
            <>
              <Link to="/login" className={`px-7 py-2 rounded-full font-bold ${btnOutline}`}>
                Connexion
              </Link>
              <Link to="/register" className={`px-7 py-2 rounded-full font-bold ${btnPrimary}`}>
                Inscription
              </Link>
            </>
          ) : (
            <>
              {role === "student" && (
                <button
                  onClick={() => navigate("/grades")}
                  className={`px-7 py-2 rounded-full font-bold ${btnSecondary}`}
                >
                  Mes Notes
                </button>
              )}
              <button
                onClick={logout}
                className={`px-7 py-2 rounded-full font-bold ${btnOutline}`}
              >
                Déconnexion
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-indigo-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-[75px] left-0 w-full bg-white shadow-2xl p-8 md:hidden flex flex-col space-y-6 border-t border-gray-100">
            <ul className="flex flex-col space-y-5 font-bold text-xl text-gray-800">
              <li><Link onClick={() => setIsOpen(false)} to="/">Accueil</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/TeachersList">Enseignants</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/ProgramsList">Programmes</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/EventsList">Événements</Link></li>
            </ul>
            
            <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
              {!role ? (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className={`text-center py-3 rounded-full font-bold ${btnOutline}`}>
                    Connexion
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className={`text-center py-3 rounded-full font-bold ${btnPrimary}`}>
                    Inscription
                  </Link>
                </>
              ) : (
                <>
                  {role === "student" && (
                    <button
                      onClick={() => { navigate("/grades"); setIsOpen(false); }}
                      className={`py-3 rounded-full font-bold ${btnSecondary}`}
                    >
                      Mes Notes
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`py-3 rounded-full font-bold ${btnOutline}`}
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar;
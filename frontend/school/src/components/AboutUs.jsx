import React from 'react'

function AboutUs() {
  return (
    <div className='max-w-7xl mx-auto p-5 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10'>
      
      {/* Image */}
      <div className='flex justify-center'>
        <img className='rounded-lg shadow-md object-cover' src='/aboutus.jpg' alt="À propos de nous" />
      </div>

      {/* Contenu Texte */}
      <div className='flex justify-center flex-col items-start'>
        <h3 className='text-indigo-600 font-bold uppercase tracking-wider'>À Propos de Nous</h3>
        
        <h1 className='mt-3 text-3xl font-bold text-gray-800 leading-tight'>
          Nous apprenons intelligemment pour bâtir un avenir brillant pour vos enfants
        </h1>
        
        <p className='text-gray-500 mt-5 leading-relaxed'>
          Dans notre école, nous croyons que chaque enfant possède un potentiel infini qui ne demande qu'à s'épanouir. 
          À travers des programmes créatifs, des activités stimulantes et des enseignants dévoués, nous cultivons 
          la curiosité et la confiance à chaque étape de leur parcours.
        </p>

        <p className='text-gray-500 mt-3 leading-relaxed'>
          Notre mission est d'inspirer les jeunes esprits, de forger des valeurs solides et de fournir un environnement 
          sûr et joyeux où l'apprentissage ressemble à un jeu et où chaque enfant se sent spécial.
        </p>
      </div>

    </div>
  )
}

export default AboutUs
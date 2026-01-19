'use client';

import React, { useState } from 'react';
import { Mail, Download, Linkedin, Database, Terminal, Server, Cpu, Layers, BarChart3, LayoutDashboard, FolderKanban, X, Calculator, Package } from 'lucide-react';

export default function Portfolio() {
  // État pour gérer l'image ouverte en grand (Lightbox)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      
      {/* --- MODAL / LIGHTBOX (Zoom Image) --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Zoom projet" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique sur l'image
          />
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-mono">
                TC
            </div>
            <span className="hidden sm:block">Tanguy Carpentier</span>
            </div>
            <div className="flex gap-3">
                <a 
                href="https://www.linkedin.com/in/tanguy-carpentier-7587222a4/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Mon profil LinkedIn"
                >
                <Linkedin size={20} />
                </a>
                <a 
                href="mailto:carpentiertanguy@gmail.com" 
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all text-sm font-medium shadow-lg shadow-slate-900/20"
                >
                Me contacter <Mail size={16} />
                </a>
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
        {/* --- BLOCK 1: HERO (Intro) --- */}
        <div className="md:col-span-8 bg-white rounded-3xl p-8 md:p-12 flex flex-col justify-center border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-6 border border-indigo-100">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              Objectif : Master MIAGE
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
              Futur Consultant <br/>
              <span className="text-indigo-600">Business Intelligence</span>.
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl leading-relaxed mb-8">
              Habitué à travailler dans le commerce, j'ai le sens du contact. Doté d'une grande capacité d'adaptation, je sais me montrer proactif et sérieux dans la réalisation de mes missions.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30 flex items-center gap-2">
                Mes projets Data <BarChart3 size={18} />
              </a>
              <a href="/cv.pdf" className="px-6 py-3 rounded-xl font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition flex items-center gap-2">
                Mon CV <Download size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* --- BLOCK 2: PHOTO / PROFILE --- */}
        <div className="md:col-span-4 bg-slate-900 rounded-3xl relative overflow-hidden flex flex-col items-center justify-end min-h-[400px] group border border-slate-800 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-slate-900"></div>
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
          
          <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
             <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full text-right">
               21 ans
             </span>
             <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full text-right">
               Amiens, FR
             </span>
          </div>
          
          {/* PHOTO */}
          {/* <img src="/moi.jpg" alt="Tanguy" className="w-full h-full object-cover object-top z-10 opacity-90 group-hover:opacity-100 transition-opacity" /> */}
          
          <div className="w-48 h-48 bg-slate-700 rounded-full flex items-center justify-center text-slate-400 z-10 mb-12 border-4 border-slate-800 shadow-2xl">
            <span className="text-sm font-mono">Photo.jpg</span>
          </div>

          <div className="absolute bottom-6 left-6 z-20">
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-1">Actuel</p>
            <p className="text-white font-medium flex items-center gap-2">
                <Cpu size={16} className="text-indigo-400"/> Étudiant BUT Info
            </p>
          </div>
        </div>

        {/* --- BLOCK 3: EXPERIENCE --- */}
        <div className="md:col-span-7 bg-slate-800 text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-32 bg-indigo-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <h2 className="text-3xl font-bold">Expérience</h2>
            <div className="p-2 bg-slate-700 rounded-lg text-indigo-300">
               <Layers size={24} />
            </div>
          </div>

          <div className="space-y-8 relative z-10">
            {/* Expérience 1: Reboot */}
            <div className="relative pl-6 border-l-2 border-indigo-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-xl font-bold">Développeur Web</h3>
                <span className="text-xs font-mono py-1 px-2 rounded bg-indigo-500/20 text-indigo-300">Jan 2025 - Mar 2025</span>
              </div>
              <p className="text-slate-300 font-medium mb-2">Reboot-Services • Stage</p>
              <ul className="text-sm text-slate-400 leading-relaxed list-disc list-inside space-y-1">
                <li>Refonte complète du site web</li>
                <li>Développement d'un CMS sur mesure</li>
                <li>Optimisation du cycle de vie de la donnée</li>
              </ul>
            </div>
            
            {/* Expérience 2: Leroy Merlin */}
            <div className="relative pl-6 border-l-2 border-slate-600 hover:border-indigo-500/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-xl font-bold">Employé Logistique</h3>
                <span className="text-xs font-mono py-1 px-2 rounded bg-slate-700 text-slate-400">Août 2024 - Présent • 13h/sem</span>
              </div>
              <p className="text-slate-300 font-medium mb-2">Leroy Merlin</p>
              <ul className="text-sm text-slate-400 leading-relaxed list-disc list-inside space-y-1">
                 <li>Préparation de commande & Délivrance aux clients</li>
                 <li>Mise en rayon</li>
                 <li>Cariste (Utilisation de gerbeur et Fenwick)</li>
              </ul>
            </div>

            {/* Expérience 3: Brico Dépôt */}
            <div className="relative pl-6 border-l-2 border-slate-600 hover:border-indigo-500/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h3 className="text-xl font-bold">Vendeur Conseil</h3>
                <span className="text-xs font-mono py-1 px-2 rounded bg-slate-700 text-slate-400">Nov 2022 - Août 2024</span>
              </div>
              <p className="text-slate-300 font-medium mb-2">Brico Dépôt</p>
              <ul className="text-sm text-slate-400 leading-relaxed list-disc list-inside space-y-1">
                 <li>Conseil technique aux clients</li>
                 <li>Mise en rayon</li>
                 <li>Gestion du Service Après-Vente (SAV)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- BLOCK 4: EDUCATION --- */}
        <div className="md:col-span-5 bg-white rounded-3xl p-8 md:p-10 text-slate-900 flex flex-col shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Formation</h2>
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
               <Server size={24} />
            </div>
          </div>

          <div className="space-y-8">
            <div className="group">
              <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase mb-1 block">2023 — 2026</span>
              <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-indigo-600 transition-colors">BUT Informatique</h3>
              <p className="text-slate-500 text-sm mb-2">IUT Amiens UPJV</p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium border border-slate-200">Base de Données</span>
                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium border border-slate-200">SQL / NoSQL</span>
                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium border border-slate-200">Algo</span>
              </div>
            </div>

            <hr className="border-slate-100"/>

            <div className="group">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1 block">2021</span>
              <h3 className="text-lg font-bold leading-tight mb-1">Baccalauréat Général</h3>
              <p className="text-slate-500 text-sm">Lycée Madeleine Michelis</p>
              <p className="text-xs text-slate-400 mt-1">Mention Bien • Section Européenne</p>
            </div>
          </div>
        </div>

        {/* --- BLOCK : PROJECTS (Avec Galerie & Lightbox) --- */}
        <div id="projects" className="md:col-span-12 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm mt-2">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <LayoutDashboard className="text-indigo-600" /> Projets Récents
                </h3>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                
                {/* Colonne Gauche : Infos Projet */}
                <div className="group bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 transition-all h-full">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 text-indigo-600">
                            <FolderKanban size={24} />
                        </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Suite Achat-Revente & BI</h4>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        Développement d'une suite d'outils complète pour un ami dans l'achat-revente. 
                        Les données présentées ici sont fictives pour préserver la confidentialité.
                    </p>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                        L'analyse des KPIs a permis d'identifier qu'une seule marque concentrait la majorité des profits, 
                        permettant de <strong>recentrer toute la stratégie</strong> sur celle-ci.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 p-2 bg-white rounded border border-slate-100 shadow-sm">
                            <BarChart3 size={16} className="text-emerald-500" />
                            <span>Dashboard Ventes & Rentabilité par marque</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 p-2 bg-white rounded border border-slate-100 shadow-sm">
                            <Package size={16} className="text-blue-500" />
                            <span>Outil de Gestion d'Inventaire & Stock</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-700 p-2 bg-white rounded border border-slate-100 shadow-sm">
                            <Calculator size={16} className="text-orange-500" />
                            <span>Calculateur Charges URSSAF & Impôts</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">Fullstack</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">SQL Analysis</span>
                        <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600">Aide à la décision</span>
                    </div>
                </div>

                {/* Colonne Droite : GALERIE D'IMAGES (Cliquables) */}
                <div className="flex flex-col gap-3">
                    {/* Image Principale (dash1) */}
                    <div 
                        className="rounded-xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer relative"
                        onClick={() => setSelectedImage('/dash1.png')}
                    >
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white font-bold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm transition-opacity">Agrandir</span>
                         </div>
                         <img 
                            src="/dash1.png" 
                            alt="Vue globale dashboard" 
                            className="w-full h-auto object-cover" 
                         />
                    </div>

                    {/* Grille des 3 petites images */}
                    <div className="grid grid-cols-3 gap-3">
                        {['/dash2.png', '/dash3.png', '/dash4.png'].map((src, index) => (
                            <div 
                                key={index}
                                className="rounded-xl overflow-hidden border border-slate-200 shadow-sm group aspect-video cursor-pointer relative"
                                onClick={() => setSelectedImage(src)}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                <img 
                                    src={src} 
                                    alt={`Détail dashboard ${index + 1}`} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        {/* --- BLOCK 5: SKILLS --- */}
        <div className="md:col-span-12 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mt-2">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Database className="text-indigo-600" /> Compétences Data & Développement
            </h3>
            
            <div className="grid md:grid-cols-2 gap-12">
            <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Data Management</h4>
                <div className="flex flex-wrap gap-2">
                    {['SQL (Oracle/MySQL)', 'PL/SQL', 'NoSQL (MongoDB)', 'Modélisation (MCD/MLD)', 'Power BI (Notions)'].map(s => (
                        <span key={s} className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-bold text-indigo-700 cursor-default">{s}</span>
                    ))}
                </div>
            </div>
            
            <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Développement & Outils</h4>
                <div className="flex flex-wrap gap-2">
                    {['Python (Data)', 'C / C++', 'Java', 'Web (HTML/CSS/JS)', 'Git', 'Linux', 'Méthode Agile'].map(s => (
                        <span key={s} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 cursor-default">{s}</span>
                    ))}
                </div>
            </div>
            </div>
        </div>

      </main>

      <footer className="max-w-7xl mx-auto px-6 mt-16 pb-8 text-center text-slate-400 text-sm">
        <p>© 2026 Tanguy Carpentier • Candidature Master MIAGE</p>
      </footer>
    </div>
  );
}
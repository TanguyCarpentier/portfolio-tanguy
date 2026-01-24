'use client';

import React, { useState } from 'react';
import { Trophy, Activity, AlertCircle, Loader2, PlayCircle, Clock } from 'lucide-react';

interface GamePrediction {
  home_team: string;
  away_team: string;
  win_prob_home: number;
  winner: string;
}

export default function NbaPredictor() {
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<GamePrediction[] | null>(null);
  const [error, setError] = useState('');

  // TON URL API
  const API_URL = "https://nba-api-ew2n.onrender.com/predict"; 

  const runPredictions = async () => {
    setLoading(true);
    setError('');
    setPredictions(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Erreur");
      const data = await res.json();
      
      if (data.message) {
        setError(data.message);
      } else if (data.games) {
        setPredictions(data.games);
      }
    } catch (err) {
      setError("Le serveur redémarre. Réessaie dans quelques secondes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-10 shadow-2xl relative overflow-hidden group">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-indigo-500" /> NBA AI Predictor
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Modèle XGBoost • Historique 3 ans • Live Data
          </p>
        </div>

        <div className="flex flex-col items-end">
            <button
            onClick={runPredictions}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                loading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 hover:shadow-indigo-500/50'
            }`}
            >
            {loading ? <Loader2 className="animate-spin" /> : <PlayCircle />}
            {loading ? 'Démarrage Serveur...' : 'Lancer les Prédictions'}
            </button>
            
            {/* Message d'info sur le délai */}
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                <Clock size={12} />
                <span>Premier lancement : ~1 min (Temps de réveil du serveur)</span>
            </div>
        </div>
      </div>

      {/* Zone de contenu */}
      <div className="relative z-10 min-h-[200px] flex flex-col items-center justify-center bg-slate-950/50 rounded-2xl border border-slate-800 p-4">
        
        {/* État initial */}
        {!loading && !predictions && !error && (
          <div className="text-center text-slate-500">
            <Trophy size={48} className="mx-auto mb-3 opacity-20" />
            <p>Clique sur le bouton pour récupérer les matchs du jour et lancer l'algorithme.</p>
          </div>
        )}

        {/* Loading State avec explication */}
        {loading && (
             <div className="text-center text-indigo-400 animate-pulse">
                <p>Connexion à l'API Python...</p>
                <p className="text-xs text-slate-500 mt-2">Le serveur sort de veille, merci de patienter.</p>
             </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="text-red-400 flex items-center gap-2 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {/* Résultats */}
        {predictions && (
          <div className="w-full grid gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Matchup</span>
                <span>Confiance IA</span>
            </div>
            
            {predictions.map((game, idx) => {
              const prob = game.win_prob_home > 0.5 ? game.win_prob_home : 1 - game.win_prob_home;
              const isHighConf = prob > 0.65;
              
              return (
                <div key={idx} className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
                  
                  {/* Équipes */}
                  <div className="flex items-center gap-4">
                    <div className={`text-lg font-bold ${game.winner === game.home_team ? 'text-white' : 'text-slate-500'}`}>
                      {game.home_team}
                    </div>
                    <span className="text-slate-600 text-sm">vs</span>
                    <div className={`text-lg font-bold ${game.winner === game.away_team ? 'text-white' : 'text-slate-500'}`}>
                      {game.away_team}
                    </div>
                  </div>

                  {/* Barre de proba */}
                  <div className="text-right">
                    <div className={`text-xl font-mono font-bold ${isHighConf ? 'text-emerald-400' : 'text-indigo-400'}`}>
                      {(prob * 100).toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">
                       Victoire {game.winner}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Footer technique */}
      <div className="mt-4 flex gap-4 text-[10px] text-slate-600 font-mono">
         <span>BACKEND: FastAPI (Python)</span>
         <span>MODEL: XGBoost (Calibrated)</span>
         <span>DATA: NBA_API</span>
      </div>
    </div>
  );
}
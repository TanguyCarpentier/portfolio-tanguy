'use client';

import React, { useState } from 'react';
import { Target, AlertTriangle, Activity, Loader2, List, Search, Clock, PlayCircle } from 'lucide-react';

export default function TennisSniper() {
  const [activeTab, setActiveTab] = useState<'scan' | 'sniper'>('scan');
  
  // --- STATE SNIPER ---
  const [formData, setFormData] = useState({
    p1_name: '', p2_name: '', odds1: '', odds2: '', surface: 'Hard'
  });
  const [sniperResult, setSniperResult] = useState<any>(null);
  const [loadingSniper, setLoadingSniper] = useState(false);

  // --- STATE SCAN ---
  const [scanResults, setScanResults] = useState<any[] | null>(null);
  const [loadingScan, setLoadingScan] = useState(false);
  
  const [error, setError] = useState('');

  // TON URL API
  const API_URL_BASE = "https://tennis-api-b8vv.onrender.com"; 

  // --- HANDLERS ---
  const handleScan = async () => {
    setLoadingScan(true); setError(''); setScanResults(null);
    try {
      const res = await fetch(`${API_URL_BASE}/scan`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.error) setError(data.error);
      else setScanResults(data.matches || []);
    } catch { setError("Le serveur démarre (~1 min). Réessaie !"); } 
    finally { setLoadingScan(false); }
  };

  const handleSniper = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSniper(true); setError(''); setSniperResult(null);
    try {
      const res = await fetch(`${API_URL_BASE}/sniper`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          p1_name: formData.p1_name, p2_name: formData.p2_name,
          odds1: parseFloat(formData.odds1), odds2: parseFloat(formData.odds2),
          surface: formData.surface
        })
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setSniperResult(data);
    } catch { setError("Le serveur démarre (~1 min). Réessaie !"); }
    finally { setLoadingSniper(false); }
  };

  return (
    <div className="w-full bg-slate-900 rounded-3xl border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col h-full">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-10"></div>

      {/* HEADER */}
      <div className="relative z-10 mb-6">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
            <Target className="text-emerald-500" size={28} />
            <div>
                <h3 className="text-2xl font-bold text-white">Tennis AI Upset Detector</h3>
                <p className="text-slate-400 text-xs">Scan Automatique & Analyse Manuelle</p>
            </div>
            </div>
             {/* Message d'info sur le délai */}
             <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                <Clock size={12} />
                <span>Premier lancement : ~1 min (Serveur)</span>
            </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mt-6 p-1 bg-slate-800 rounded-lg w-fit">
            <button 
                onClick={() => setActiveTab('scan')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'scan' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
                <List size={16} /> Auto Scan
            </button>
            <button 
                onClick={() => setActiveTab('sniper')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'sniper' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
                <Search size={16} /> Sniper Mode
            </button>
        </div>
      </div>

      <div className="relative z-10 flex-1">
        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-xs flex items-center gap-2"><AlertTriangle size={14}/> {error}</div>}

       {/* --- VIEW: SCAN --- */}
        {activeTab === 'scan' && (
            <div className="space-y-4">
                <p className="text-slate-400 text-sm leading-relaxed">
                    Ce module scanne l'API des bookmakers pour les matchs d'aujourd'hui (ATP) et identifie automatiquement les opportunités où mon modèle détecte une incohérence.
                </p>
                
                {!scanResults && !loadingScan && (
                    <button onClick={handleScan} className="w-full py-8 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all group">
                        <PlayCircle size={40} className="mb-2 group-hover:scale-110 transition-transform" />
                        <span className="font-bold">Lancer le Scan du Marché</span>
                    </button>
                )}

                {loadingScan && (
                    <div className="text-center py-8 text-emerald-400 animate-pulse">
                        <Loader2 className="animate-spin mx-auto mb-2" size={32} />
                        Scan en cours des cotes mondiales...
                    </div>
                )}

                {scanResults && (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {scanResults.length === 0 ? (
                            <div className="text-center py-8 px-4 border border-slate-700/50 rounded-xl bg-slate-800/30 flex flex-col items-center">
                                <p className="text-slate-400 font-medium mb-1">📉 R.A.S. — Le marché est efficient.</p>
                                <p className="text-xs text-slate-500 max-w-[250px]">
                                    Aucune "Value" mathématique détectée aujourd'hui (ou aucun match ATP au programme). Les bookmakers sont cohérents avec le modèle.
                                </p>
                            </div>
                        ) : (
                            scanResults.map((m, i) => (
                                <div key={i} className="bg-slate-800/50 border border-slate-700 p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <div className="text-white text-sm font-bold">{m.p1} <span className="text-slate-500 font-normal">vs</span> {m.p2}</div>
                                        <div className="text-xs text-slate-400 mt-1">Cotes: {m.odds1} - {m.odds2}</div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${m.type === 'UPSET_ALERT' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                                        {m.type === 'UPSET_ALERT' ? 'Upset' : 'Value'}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        )}
        {/* --- VIEW: SNIPER --- */}
        {activeTab === 'sniper' && (
            <div className="animation-fade-in">
                 <form onSubmit={handleSniper} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-bold uppercase">Joueur 1 & Cote</label>
                            <input type="text" placeholder="Djokovic" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-xs focus:border-emerald-500 outline-none" value={formData.p1_name} onChange={e => setFormData({...formData, p1_name: e.target.value})} />
                            <input type="number" step="0.01" placeholder="1.50" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-xs focus:border-emerald-500 outline-none" value={formData.odds1} onChange={e => setFormData({...formData, odds1: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-bold uppercase">Joueur 2 & Cote</label>
                            <input type="text" placeholder="Sinner" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-xs focus:border-emerald-500 outline-none" value={formData.p2_name} onChange={e => setFormData({...formData, p2_name: e.target.value})} />
                            <input type="number" step="0.01" placeholder="2.80" required className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-white text-xs focus:border-emerald-500 outline-none" value={formData.odds2} onChange={e => setFormData({...formData, odds2: e.target.value})} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <select className="bg-slate-800 border border-slate-700 rounded px-4 text-white text-xs outline-none" value={formData.surface} onChange={e => setFormData({...formData, surface: e.target.value})}>
                            <option value="Hard">Dur</option><option value="Clay">Terre</option><option value="Grass">Gazon</option>
                        </select>
                        <button type="submit" disabled={loadingSniper} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded transition flex items-center justify-center gap-2 text-sm">
                            {loadingSniper ? <Loader2 className="animate-spin" size={16} /> : <Activity size={16} />} Analyser
                        </button>
                    </div>
                </form>

                {sniperResult && (
                    <div className="mt-4 p-4 rounded-xl border bg-slate-800 border-slate-700 animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center mb-2">
                             <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${sniperResult.result_type === 'PASS' ? 'bg-slate-600 text-slate-300' : 'bg-emerald-500 text-white'}`}>
                                 {sniperResult.result_type === 'UPSET_ALERT' ? '🚨 UPSET' : sniperResult.result_type === 'VALUE' ? '💎 VALUE' : '💤 NO BET'}
                             </span>
                             <span className="text-white font-mono font-bold">{(sniperResult.prob_p1 * 100).toFixed(1)}%</span>
                        </div>
                        <p className="text-slate-300 text-xs">{sniperResult.message}</p>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
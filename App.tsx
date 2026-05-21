/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Info, Zap, Globe, Factory, HeartPulse, 
  Lightbulb, AlertTriangle, ArrowUpRight, ArrowDownLeft,
  Search, SlidersHorizontal, Layers, ChevronRight
} from 'lucide-react';
import { getFullElementsList, ElementData } from './data/elements';

const CATEGORY_COLORS: Record<string, string> = {
  'metal-alcalino': '#f43f5e',
  'metal-alcalino-terroso': '#f59e0b',
  'metal-de-transicao': '#8b5cf6',
  'metal-pos-transicao': '#10b981',
  'semimetal': '#06b6d4',
  'ametal': '#3b82f6',
  'halogênio': '#ec4899',
  'gas-nobre': '#a855f7',
  'lantanideo': '#fbbf24',
  'actinideo': '#fb7185',
};

const CATEGORY_LABELS: Record<string, string> = {
  'metal-alcalino': 'Metais Alcalinos',
  'metal-alcalino-terroso': 'Alcalinos-Terrosos',
  'metal-de-transicao': 'Metais de Transição',
  'metal-pos-transicao': 'Metais Pós-Transição',
  'semimetal': 'Semimetais',
  'ametal': 'Ametais',
  'halogênio': 'Halogênios',
  'gas-nobre': 'Gases Nobres',
  'lantanideo': 'Lantanídeos',
  'actinideo': 'Actinídeos',
};

// Bohr Atom Visualization Component
const BohrAtom = ({ electrons, color }: { electrons: number; color: string }) => {
  // Simple shell distribution logic for visualization
  const getShells = (count: number) => {
    const limits = [2, 8, 18, 32, 32, 18, 8];
    const shells: number[] = [];
    let remaining = count;
    for (const limit of limits) {
      if (remaining <= 0) break;
      const take = Math.min(remaining, limit);
      shells.push(take);
      remaining -= take;
    }
    return shells;
  };

  const shellCounts = getShells(electrons);

  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
      {/* Nucleus */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-4 h-4 md:w-6 md:h-6 rounded-full z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        style={{ backgroundColor: color }}
      />
      
      {/* Shells */}
      {shellCounts.map((count, shellIdx) => {
        const radiusBase = window.innerWidth < 768 ? 20 : 30;
        const radiusStep = window.innerWidth < 768 ? 12 : 20;
        const radius = radiusBase + shellIdx * radiusStep;
        return (
          <div key={shellIdx} className="absolute inset-0 flex items-center justify-center">
            {/* Orbit Path */}
            <div 
              className="absolute border border-zinc-700/30 rounded-full"
              style={{ width: radius * 2, height: radius * 2 }}
            />
            {/* Electrons */}
            {Array.from({ length: count }).map((_, eIdx) => {
              const angle = (eIdx / count) * 2 * Math.PI;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={eIdx}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 10 + shellIdx * 5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full z-20"
                  style={{ 
                    backgroundColor: color,
                    left: `calc(50% + ${x}px - 2px)`,
                    top: `calc(50% + ${y}px - 2px)`,
                    boxShadow: `0 0 6px ${color}`
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const elements = useMemo(() => getFullElementsList(), []);

  const filteredElements = useMemo(() => {
    if (!searchQuery) return elements;
    const lowerQuery = searchQuery.toLowerCase();
    return elements.filter(e => 
      e.name.toLowerCase().includes(lowerQuery) || 
      e.symbol.toLowerCase().includes(lowerQuery) ||
      e.number.toString() === lowerQuery
    );
  }, [elements, searchQuery]);

  const handleElementClick = useCallback((element: ElementData) => {
    setSelectedElement(element);
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold tracking-tighter text-zinc-100 uppercase">
            Tabela Periódica <span className="font-light text-zinc-500">dos Elementos</span>
          </h1>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-[10px] text-zinc-400 font-medium">
            {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
              <div key={cat} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] }}></span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex flex-col items-end">
            <div className="arrow-label mb-1">Eletronegatividade ↗</div>
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-zinc-700 to-rose-500"></div>
          </div>
          
          <div className="relative group w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-white transition-colors" />
            <input 
              type="text"
              placeholder="Buscar elemento..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-500 transition-all font-mono"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto relative px-4 md:px-6">
        {/* Mobile Hint */}
        <div className="flex md:hidden items-center justify-center gap-2 text-[10px] text-zinc-500 mb-6 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800 animate-pulse">
           Deslize horizontalmente para ver toda a tabela <ChevronRight className="w-3 h-3" />
        </div>
        
        {/* Periodic Table Grid */}
        <div className="overflow-x-auto pb-10 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          <div className="grid-periodic min-w-[1240px]">
            {/* Group Labels */}
            {Array.from({ length: 18 }, (_, i) => (
              <div 
                key={`group-${i + 1}`} 
                style={{ gridColumn: i + 2, gridRow: 1 }}
                className="flex items-center justify-center text-[10px] font-mono text-zinc-600"
              >
                {i + 1}
              </div>
            ))}

            {/* Period Labels */}
            {Array.from({ length: 7 }, (_, i) => (
              <div 
                key={`period-${i + 1}`} 
                style={{ gridColumn: 1, gridRow: i + 2 }}
                className="flex items-center justify-center text-[10px] font-mono text-zinc-600"
              >
                {i + 1}
              </div>
            ))}

            {/* Element Cells */}
            {elements.map((element) => {
              const isSearching = searchQuery !== '';
              const isMatch = filteredElements.includes(element);
              const opacity = isSearching && !isMatch ? 0.15 : 1;
              const color = CATEGORY_COLORS[element.category];

              return (
                <motion.button
                  key={element.number}
                  id={`element-${element.number}`}
                  onClick={() => handleElementClick(element)}
                  onHoverStart={() => setHoveredElement(element.number)}
                  onHoverEnd={() => setHoveredElement(null)}
                  style={{ 
                    gridColumn: element.x + 1, 
                    gridRow: element.y + 1,
                    opacity
                  }}
                  className={`el-card cat-${element.category} ${hoveredElement === element.number ? 'bg-white/5 opacity-100 scale-110 z-50 shadow-xl' : ''}`}
                >
                  <span className="absolute top-1 left-1.5 text-[9px] font-mono text-zinc-500">{element.number}</span>
                  <div className="flex-1 flex flex-col items-center justify-center mt-1">
                    <span className="text-base font-bold tracking-tight" style={{ color }}>{element.symbol}</span>
                    <span className="text-[7px] uppercase font-semibold text-zinc-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{element.name}</span>
                  </div>
                  <span className="text-[7px] text-zinc-600 self-center font-mono mt-auto">{element.mass.toFixed(2)}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Atomic Radius Trend (Fixed bottom) */}
        <div className="absolute bottom-0 left-6 flex flex-col items-start pointer-events-none">
          <div className="h-[1px] w-48 bg-gradient-to-l from-transparent via-zinc-700 to-blue-500 mb-1"></div>
          <div className="arrow-label">Raio Atômico ↙</div>
        </div>
      </main>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedElement && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedElement(null)}
              className="fixed inset-0 z-[1000] modal-blur"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="fixed inset-x-0 bottom-0 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[650px] bg-[#121212] border-t md:border border-zinc-800 rounded-t-3xl md:rounded-3xl z-[1001] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              <button 
                onClick={() => setSelectedElement(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-500 hover:text-white transition-colors z-[1002] p-2 bg-zinc-900/50 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 h-full overflow-y-auto md:overflow-hidden">
                {/* Left Panel: Identity */}
                <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col bg-zinc-900/30 shrink-0">
                  <div className="flex items-center gap-6 md:block">
                    <div 
                      className="w-20 h-24 md:w-24 md:h-28 border-2 rounded-xl flex flex-col items-center justify-center mb-0 md:mb-8 relative group shrink-0"
                      style={{ borderColor: CATEGORY_COLORS[selectedElement.category], background: `${CATEGORY_COLORS[selectedElement.category]}10` }}
                    >
                      <span className="absolute top-2 left-3 text-[10px] md:text-xs font-mono opacity-50" style={{ color: CATEGORY_COLORS[selectedElement.category] }}>{selectedElement.number}</span>
                      <span className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ color: CATEGORY_COLORS[selectedElement.category] }}>{selectedElement.symbol}</span>
                      <span className="absolute bottom-2 text-[8px] md:text-[9px] font-mono opacity-40">{selectedElement.mass}</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-1 text-zinc-100">{selectedElement.name}</h2>
                      <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest" style={{ color: CATEGORY_COLORS[selectedElement.category] }}>
                        {CATEGORY_LABELS[selectedElement.category]}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-6 py-8">
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Família / Grupo</p>
                      <p className="text-sm text-zinc-200">{selectedElement.group}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Período</p>
                      <p className="text-sm text-zinc-200">{selectedElement.period}º Período</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Estado físico</p>
                      <p className="text-sm text-zinc-200">
                        {selectedElement.phase === 'solid' ? 'Sólido' : selectedElement.phase === 'liquid' ? 'Líquido' : 'Gasoso'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-auto">
                    <div className="p-4 bg-zinc-800/20 rounded-xl border border-zinc-800 space-y-3">
                      <div className="flex justify-between items-center text-[10px] md:text-xs">
                        <span className="text-zinc-500 uppercase font-bold tracking-tighter">Z (Prótons)</span>
                        <span className="text-zinc-200">{selectedElement.number}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] md:text-xs">
                        <span className="text-zinc-500 uppercase font-bold tracking-tighter">Massa Atômica</span>
                        <span className="text-zinc-200 font-mono">{selectedElement.mass.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Data */}
                <div className="col-span-1 md:col-span-2 p-8 md:p-10 overflow-y-auto custom-scrollbar space-y-10">
                  <section>
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                      <div className="flex-1 w-full order-2 lg:order-1">
                        <h3 className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
                           <Zap className="w-3 h-3" /> Propriedades e Estrutura
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Configuração Eletrônica</p>
                            <p className="font-mono text-zinc-200 text-sm break-all">{selectedElement.config}</p>
                          </div>
                          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Eletronegatividade</p>
                            <p className="font-mono text-zinc-200 text-sm">
                              {selectedElement.electronegativity ?? 'N/A'}
                              <span className="text-[8px] text-zinc-600 block mt-1">Escala de Pauling</span>
                            </p>
                          </div>
                          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Elétrons de Valência</p>
                            <p className="font-mono text-zinc-200 text-sm">{selectedElement.valence_electrons}</p>
                          </div>
                          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Distribuição p/ Camadas</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {(() => {
                                const limits = [2, 8, 18, 32, 32, 18, 8];
                                const labels = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
                                let remaining = selectedElement.number;
                                const results = [];
                                for (let i = 0; i < limits.length; i++) {
                                  if (remaining <= 0) break;
                                  const take = Math.min(remaining, limits[i]);
                                  results.push(
                                    <div key={labels[i]} className="flex flex-col items-center bg-zinc-800/40 px-2 py-1 rounded border border-zinc-700/50">
                                      <span className="text-[8px] font-bold text-zinc-500">{labels[i]}</span>
                                      <span className="text-[9px] font-mono text-zinc-200">{take}</span>
                                    </div>
                                  );
                                  remaining -= take;
                                }
                                return results;
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-auto flex flex-col items-center justify-center p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 order-1 lg:order-2 shrink-0 min-w-[240px]">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold mb-4 text-center">Modelo de Bohr</p>
                        <BohrAtom 
                          electrons={selectedElement.number} 
                          color={CATEGORY_COLORS[selectedElement.category]} 
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-4 border-b border-zinc-800 pb-2 flex items-center gap-2">
                      <Info className="w-3 h-3" /> Foco no Vestibular
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Resumo Didático</p>
                        <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-zinc-800 pl-4">
                          {selectedElement.occurrence}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Aplicações Reais</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedElement.applications.map(app => (
                            <span key={app} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-300">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold">Curiosidades de Prova</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedElement.curiosities.map((item, idx) => (
                            <li key={idx} className="flex gap-2 text-xs text-zinc-400">
                              <span className="font-bold flex-shrink-0" style={{ color: CATEGORY_COLORS[selectedElement.category] }}>•</span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl border flex flex-col gap-2" style={{ backgroundColor: `${CATEGORY_COLORS[selectedElement.category]}08`, borderColor: `${CATEGORY_COLORS[selectedElement.category]}15` }}>
                      <p className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: CATEGORY_COLORS[selectedElement.category] }}>Papel Biológico</p>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {selectedElement.biology}
                      </p>
                    </div>
                    
                    {selectedElement.toxicity && (
                      <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-rose-500 font-bold uppercase">Atenção (Toxicidade)</p>
                          <p className="text-[10px] md:text-xs text-zinc-400 leading-tight">Cuidado em questões de Química Ambiental: este elemento é nocivo e requer atenção aos seus efeitos no ecossistema.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              
              {/* Decorative Background Icon */}
              <div 
                className="absolute -bottom-24 -right-12 text-[20rem] font-bold pointer-events-none select-none opacity-[0.03]"
                style={{ color: CATEGORY_COLORS[selectedElement.category] }}
              >
                {selectedElement.symbol}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components for clean code
function SectionTitle({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="text-blue-400">{icon}</div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">{title}</h3>
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-6 gap-y-3">{children}</div>;
}

function InfoItem({ label, value, color, className = "" }: { label: string, value: any, color?: string, className?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] text-white/30 uppercase font-bold tracking-wider">{label}</span>
      <span className={`text-sm font-medium ${className}`} style={{ color }}>{value}</span>
    </div>
  );
}

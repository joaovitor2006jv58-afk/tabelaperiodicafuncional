export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: string;
  group: number | string;
  period: number;
  phase: 'solid' | 'liquid' | 'gas' | 'unknown';
  config: string;
  valency_shells: number[];
  valence_electrons: number;
  spin: 'up' | 'down';
  radius: number | null;
  electronegativity: number | null;
  ionization: number | null;
  oxidation: number[];
  reactivity: 'Alta' | 'Média' | 'Baixa' | 'Nobre';
  bonding: 'Metálica' | 'Covalente' | 'Iônica' | 'Gás Nobre';
  occurrence: string;
  producers: string[];
  applications: string[];
  biology: string;
  toxicity: boolean;
  curiosities: string[];
  x: number;
  y: number;
}

const ELEMENT_INFO: Record<number, { s: string, n: string, m: number, cat: string, c?: string }> = {
  1: { s: "H", n: "Hidrogênio", m: 1.008, cat: "ametal", c: "1s¹" },
  2: { s: "He", n: "Hélio", m: 4.0026, cat: "gas-nobre", c: "1s²" },
  3: { s: "Li", n: "Lítio", m: 6.94, cat: "metal-alcalino", c: "1s² 2s¹" },
  4: { s: "Be", n: "Berílio", m: 9.0122, cat: "metal-alcalino-terroso", c: "1s² 2s²" },
  5: { s: "B", n: "Boro", m: 10.81, cat: "semimetal", c: "1s² 2s² 2p¹" },
  6: { s: "C", n: "Carbono", m: 12.011, cat: "ametal", c: "1s² 2s² 2p²" },
  7: { s: "N", n: "Nitrogênio", m: 14.007, cat: "ametal", c: "1s² 2s² 2p³" },
  8: { s: "O", n: "Oxigênio", m: 15.999, cat: "ametal", c: "1s² 2s² 2p⁴" },
  9: { s: "F", n: "Flúor", m: 18.998, cat: "halogênio", c: "1s² 2s² 2p⁵" },
  10: { s: "Ne", n: "Neônio", m: 20.180, cat: "gas-nobre", c: "1s² 2s² 2p⁶" },
  11: { s: "Na", n: "Sódio", m: 22.990, cat: "metal-alcalino", c: "[Ne] 3s¹" },
  12: { s: "Mg", n: "Magnésio", m: 24.305, cat: "metal-alcalino-terroso", c: "[Ne] 3s²" },
  13: { s: "Al", n: "Alumínio", m: 26.982, cat: "metal-pos-transicao", c: "[Ne] 3s² 3p¹" },
  14: { s: "Si", n: "Silício", m: 28.085, cat: "semimetal", c: "[Ne] 3s² 3p²" },
  15: { s: "P", n: "Fósforo", m: 30.974, cat: "ametal", c: "[Ne] 3s² 3p³" },
  16: { s: "S", n: "Enxofre", m: 32.06, cat: "ametal", c: "[Ne] 3s² 3p⁴" },
  17: { s: "Cl", n: "Cloro", m: 35.45, cat: "halogênio", c: "[Ne] 3s² 3p⁵" },
  18: { s: "Ar", n: "Argônio", m: 39.948, cat: "gas-nobre", c: "[Ne] 3s² 3p⁶" },
  19: { s: "K", n: "Potássio", m: 39.098, cat: "metal-alcalino", c: "[Ar] 4s¹" },
  20: { s: "Ca", n: "Cálcio", m: 40.078, cat: "metal-alcalino-terroso", c: "[Ar] 4s²" },
  21: { s: "Sc", n: "Escândio", m: 44.956, cat: "metal-de-transicao" },
  22: { s: "Ti", n: "Titânio", m: 47.867, cat: "metal-de-transicao" },
  23: { s: "V", n: "Vanádio", m: 50.942, cat: "metal-de-transicao" },
  24: { s: "Cr", n: "Cromo", m: 51.996, cat: "metal-de-transicao" },
  25: { s: "Mn", n: "Manganês", m: 54.938, cat: "metal-de-transicao" },
  26: { s: "Fe", n: "Ferro", m: 55.845, cat: "metal-de-transicao", c: "[Ar] 3d⁶ 4s²" },
  27: { s: "Co", n: "Cobalto", m: 58.933, cat: "metal-de-transicao" },
  28: { s: "Ni", n: "Níquel", m: 58.693, cat: "metal-de-transicao" },
  29: { s: "Cu", n: "Cobre", m: 63.546, cat: "metal-de-transicao", c: "[Ar] 3d¹⁰ 4s¹" },
  30: { s: "Zn", n: "Zinco", m: 65.38, cat: "metal-de-transicao", c: "[Ar] 3d¹⁰ 4s²" },
  31: { s: "Ga", n: "Gálio", m: 69.723, cat: "metal-pos-transicao" },
  32: { s: "Ge", n: "Germânio", m: 72.63, cat: "semimetal" },
  33: { s: "As", n: "Arsênio", m: 74.922, cat: "semimetal" },
  34: { s: "Se", n: "Selênio", m: 78.971, cat: "ametal" },
  35: { s: "Br", n: "Bromo", m: 79.904, cat: "halogênio" },
  36: { s: "Kr", n: "Criptônio", m: 83.798, cat: "gas-nobre" },
  37: { s: "Rb", n: "Rubídio", m: 85.468, cat: "metal-alcalino" },
  38: { s: "Sr", n: "Estrôncio", m: 87.62, cat: "metal-alcalino-terroso" },
  39: { s: "Y", n: "Ítrio", m: 88.906, cat: "metal-de-transicao" },
  40: { s: "Zr", n: "Zircônio", m: 91.224, cat: "metal-de-transicao" },
  41: { s: "Nb", n: "Nióbio", m: 92.906, cat: "metal-de-transicao" },
  42: { s: "Mo", n: "Molibdênio", m: 95.95, cat: "metal-de-transicao" },
  43: { s: "Tc", n: "Tecnécio", m: 98, cat: "metal-de-transicao" },
  44: { s: "Ru", n: "Rutênio", m: 101.07, cat: "metal-de-transicao" },
  45: { s: "Rh", n: "Ródio", m: 102.91, cat: "metal-de-transicao" },
  46: { s: "Pd", n: "Paládio", m: 106.42, cat: "metal-de-transicao" },
  47: { s: "Ag", n: "Prata", m: 107.87, cat: "metal-de-transicao", c: "[Kr] 4d¹⁰ 5s¹" },
  48: { s: "Cd", n: "Cádmio", m: 112.41, cat: "metal-de-transicao" },
  49: { s: "In", n: "Índio", m: 114.82, cat: "metal-pos-transicao" },
  50: { s: "Sn", n: "Estanho", m: 118.71, cat: "metal-pos-transicao" },
  51: { s: "Sb", n: "Antimônio", m: 121.76, cat: "semimetal" },
  52: { s: "Te", n: "Telúrio", m: 127.6, cat: "semimetal" },
  53: { s: "I", n: "Iodo", m: 126.9, cat: "halogênio" },
  54: { s: "Xe", n: "Xenônio", m: 131.29, cat: "gas-nobre" },
  55: { s: "Cs", n: "Césio", m: 132.91, cat: "metal-alcalino" },
  56: { s: "Ba", n: "Bário", m: 137.33, cat: "metal-alcalino-terroso" },
  57: { s: "La", n: "Lantânio", m: 138.91, cat: "lantanideo" },
  58: { s: "Ce", n: "Cério", m: 140.12, cat: "lantanideo" },
  59: { s: "Pr", n: "Praseodímio", m: 140.91, cat: "lantanideo" },
  60: { s: "Nd", n: "Neodímio", m: 144.24, cat: "lantanideo" },
  61: { s: "Pm", n: "Promécio", m: 145, cat: "lantanideo" },
  62: { s: "Sm", n: "Samário", m: 150.36, cat: "lantanideo" },
  63: { s: "Eu", n: "Európio", m: 151.96, cat: "lantanideo" },
  64: { s: "Gd", n: "Gadolínio", m: 157.25, cat: "lantanideo" },
  65: { s: "Tb", n: "Térbio", m: 158.93, cat: "lantanideo" },
  66: { s: "Dy", n: "Disprósio", m: 162.5, cat: "lantanideo" },
  67: { s: "Ho", n: "Hólmio", m: 164.93, cat: "lantanideo" },
  68: { s: "Er", n: "Érbio", m: 167.26, cat: "lantanideo" },
  69: { s: "Tm", n: "Túlio", m: 168.93, cat: "lantanideo" },
  70: { s: "Yb", n: "Itérbio", m: 173.05, cat: "lantanideo" },
  71: { s: "Lu", n: "Lutécio", m: 174.97, cat: "lantanideo" },
  72: { s: "Hf", n: "Háfnio", m: 178.49, cat: "metal-de-transicao" },
  73: { s: "Ta", n: "Tântalo", m: 180.95, cat: "metal-de-transicao" },
  74: { s: "W", n: "Tungstênio", m: 183.84, cat: "metal-de-transicao" },
  75: { s: "Re", n: "Rênio", m: 186.21, cat: "metal-de-transicao" },
  76: { s: "Os", n: "Ósmio", m: 190.23, cat: "metal-de-transicao" },
  77: { s: "Ir", n: "Irídio", m: 192.22, cat: "metal-de-transicao" },
  78: { s: "Pt", n: "Platina", m: 195.08, cat: "metal-de-transicao" },
  79: { s: "Au", n: "Ouro", m: 196.97, cat: "metal-de-transicao", c: "[Xe] 4f¹⁴ 5d¹⁰ 6s¹" },
  80: { s: "Hg", n: "Mercúrio", m: 200.59, cat: "metal-de-transicao", c: "[Xe] 4f¹⁴ 5d¹⁰ 6s²" },
  81: { s: "Tl", n: "Tálio", m: 204.38, cat: "metal-pos-transicao" },
  82: { s: "Pb", n: "Chumbo", m: 207.2, cat: "metal-pos-transicao", c: "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²" },
  83: { s: "Bi", n: "Bismuto", m: 208.98, cat: "metal-pos-transicao" },
  84: { s: "Po", n: "Polônio", m: 209, cat: "metal-pos-transicao" },
  85: { s: "At", n: "Astato", m: 210, cat: "halogênio" },
  86: { s: "Rn", n: "Radônio", m: 222, cat: "gas-nobre" },
  87: { s: "Fr", n: "Frâncio", m: 223, cat: "metal-alcalino" },
  88: { s: "Ra", n: "Rádio", m: 226, cat: "metal-alcalino-terroso" },
  89: { s: "Ac", n: "Actínio", m: 227, cat: "actinideo" },
  90: { s: "Th", n: "Tório", m: 232.04, cat: "actinideo" },
  91: { s: "Pa", n: "Protactínio", m: 231.04, cat: "actinideo" },
  92: { s: "U", n: "Urânio", m: 238.03, cat: "actinideo", c: "[Rn] 5f³ 6d¹ 7s²" },
  93: { s: "Np", n: "Netúnio", m: 237, cat: "actinideo" },
  94: { s: "Pu", n: "Plutônio", m: 244, cat: "actinideo" },
  95: { s: "Am", n: "Amerício", m: 243, cat: "actinideo" },
  96: { s: "Cm", n: "Cúrio", m: 247, cat: "actinideo" },
  97: { s: "Bk", n: "Berquélio", m: 247, cat: "actinideo" },
  98: { s: "Cf", n: "Califórnio", m: 251, cat: "actinideo" },
  99: { s: "Es", n: "Enstênio", m: 252, cat: "actinideo" },
  100: { s: "Fm", n: "Férmio", m: 257, cat: "actinideo" },
  101: { s: "Md", n: "Mendelévio", m: 258, cat: "actinideo" },
  102: { s: "No", n: "Nobélio", m: 259, cat: "actinideo" },
  103: { s: "Lr", n: "Laurêncio", m: 262, cat: "actinideo" },
  104: { s: "Rf", n: "Rutherfórdio", m: 267, cat: "metal-de-transicao" },
  105: { s: "Db", n: "Dúbnio", m: 270, cat: "metal-de-transicao" },
  106: { s: "Sg", n: "Seabórgio", m: 271, cat: "metal-de-transicao" },
  107: { s: "Bh", n: "Bóhrio", m: 270, cat: "metal-de-transicao" },
  108: { s: "Hs", n: "Hássio", m: 277, cat: "metal-de-transicao" },
  109: { s: "Mt", n: "Meitnério", m: 276, cat: "metal-de-transicao" },
  110: { s: "Ds", n: "Darmstádio", m: 281, cat: "metal-de-transicao" },
  111: { s: "Rg", n: "Roentgênio", m: 280, cat: "metal-de-transicao" },
  112: { s: "Cn", n: "Copernício", m: 285, cat: "metal-de-transicao" },
  113: { s: "Nh", n: "Nihônio", m: 284, cat: "metal-pos-transicao" },
  114: { s: "Fl", n: "Fleróvio", m: 289, cat: "metal-pos-transicao" },
  115: { s: "Mc", n: "Moscóvio", m: 288, cat: "metal-pos-transicao" },
  116: { s: "Lv", n: "Livermório", m: 293, cat: "metal-pos-transicao" },
  117: { s: "Ts", n: "Tennesso", m: 294, cat: "halogênio" },
  118: { s: "Og", n: "Oganésson", m: 294, cat: "gas-nobre" },
};

const DYNAMIC_INFO: Record<number, Partial<ElementData>> = {
  1: { 
    occurrence: "Abundante no universo (estrelas) e na água.", 
    applications: ["Combustível de foguetes", "Amônia"],
    biology: "Componente do DNA e proteínas.",
    curiosities: ["Não tem família oficial.", "Isótopos: Prótio, Deutério e Trítio."] 
  },
  6: { 
    occurrence: "Base da vida, grafite e diamante.", 
    applications: ["Combustíveis", "Fibras de carbono"],
    biology: "Espinha dorsal de moléculas orgânicas.",
    curiosities: ["Fenômeno da alotropia.", "C-14 usado para datação."] 
  },
  8: { 
    occurrence: "Ar (21%) e crosta terrestre (silicatos).", 
    applications: ["Respiração", "Indústria do aço"],
    biology: "Aceitante final de elétrons na respiração.",
    curiosities: ["O3 protege contra UV.", "Líquido é paramagnético."] 
  },
  11: { 
    occurrence: "Sal de cozinha (NaCl).", 
    applications: ["Sabão", "Iluminação amarela"],
    biology: "Impulsos nervosos (Bomba Na/K).",
    curiosities: ["Reage violentamente com água.", "Metal mole que flutua."] 
  },
  26: { 
    occurrence: "Hematita e Magnetita.", 
    applications: ["Aço", "Construção"],
    biology: "Transporte de O2 (Hemoglobina).",
    curiosities: ["Elemento mais estável nuclearmente.", "Dá cor ao solo de Marte."] 
  }
};

const ELECTRONEGATIVITY: Record<number, number> = {
  1: 2.20, 3: 0.98, 4: 1.57, 5: 2.04, 6: 2.55, 7: 3.04, 8: 3.44, 9: 3.98,
  11: 0.93, 12: 1.31, 13: 1.61, 14: 1.90, 15: 2.19, 16: 2.58, 17: 3.16,
  19: 0.82, 20: 1.00, 21: 1.36, 22: 1.54, 23: 1.63, 24: 1.66, 25: 1.55, 26: 1.83,
  27: 1.88, 28: 1.91, 29: 1.90, 30: 1.65, 31: 1.81, 32: 2.01, 33: 2.18, 34: 2.55, 35: 2.96,
  37: 0.82, 38: 0.95, 39: 1.22, 40: 1.33, 41: 1.6, 42: 2.16, 43: 1.9, 44: 2.2, 45: 2.28,
  46: 2.20, 47: 1.93, 48: 1.69, 49: 1.78, 50: 1.96, 51: 2.05, 52: 2.1, 53: 2.66,
  55: 0.79, 56: 0.89, 72: 1.3, 73: 1.5, 74: 2.36, 75: 1.9, 76: 2.2, 77: 2.2, 78: 2.28,
  79: 2.54, 80: 2.00, 81: 1.62, 82: 2.33, 83: 2.02, 84: 2.0, 85: 2.2, 87: 0.7, 88: 0.9,
  92: 1.38
};

const getLinusPaulingConfig = (n: number): string => {
  const sequence = [
    { n: "1s", m: 2 }, { n: "2s", m: 2 }, { n: "2p", m: 6 },
    { n: "3s", m: 2 }, { n: "3p", m: 6 }, { n: "4s", m: 2 },
    { n: "3d", m: 10 }, { n: "4p", m: 6 }, { n: "5s", m: 2 },
    { n: "4d", m: 10 }, { n: "5p", m: 6 }, { n: "6s", m: 2 },
    { n: "4f", m: 14 }, { n: "5d", m: 10 }, { n: "6p", m: 6 },
    { n: "7s", m: 2 }, { n: "5f", m: 14 }, { n: "6d", m: 10 },
    { n: "7p", m: 6 }
  ];

  let remaining = n;
  const config: string[] = [];

  for (const sub of sequence) {
    if (remaining <= 0) break;
    const electrons = Math.min(remaining, sub.m);
    config.push(`${sub.n}${toSuperscript(electrons)}`);
    remaining -= electrons;
  }

  return config.join(" ");
};

const toSuperscript = (n: number): string => {
  const supers = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
  return n.toString().split("").map(c => supers[parseInt(c)]).join("");
};

export const getFullElementsList = (): ElementData[] => {
  const list: ElementData[] = [];

  const getPosition = (n: number) => {
    if (n === 1) return { x: 1, y: 1 };
    if (n === 2) return { x: 18, y: 1 };
    if (n >= 3 && n <= 4) return { x: n - 2, y: 2 };
    if (n >= 5 && n <= 10) return { x: n + 8, y: 2 };
    if (n >= 11 && n <= 12) return { x: n - 10, y: 3 };
    if (n >= 13 && n <= 18) return { x: n, y: 3 };
    if (n >= 19 && n <= 36) return { x: n - 18, y: 4 };
    if (n >= 37 && n <= 54) return { x: n - 36, y: 5 };
    if (n >= 55 && n <= 56) return { x: n - 54, y: 6 };
    // Lanthanides (57-71)
    if (n >= 57 && n <= 71) return { x: n - 54, y: 9 };
    if (n >= 72 && n <= 86) return { x: n - 68, y: 6 };
    if (n >= 87 && n <= 88) return { x: n - 86, y: 7 };
    // Actinides (89-103)
    if (n >= 89 && n <= 103) return { x: n - 86, y: 10 };
    if (n >= 104 && n <= 118) return { x: n - 100, y: 7 };
    return { x: 1, y: 1 };
  };

  for (let i = 1; i <= 118; i++) {
    const info = ELEMENT_INFO[i];
    const dyn = DYNAMIC_INFO[i] || {};
    const pos = getPosition(i);
    
    list.push({
      number: i,
      symbol: info?.s || `?`,
      name: info?.n || `Elemento ${i}`,
      mass: info?.m || 0,
      category: info?.cat || "metal-pos-transicao",
      group: pos.y < 9 ? pos.x : "L/A",
      period: pos.y < 8 ? pos.y : (pos.y === 9 ? 6 : 7),
      phase: i === 80 || i === 35 ? 'liquid' : (i === 1 || i === 2 || i === 7 || i === 8 || i === 9 || i === 10 || i === 17 || i === 18 || i === 36 || i === 54 || i === 86 || i === 118) ? 'gas' : 'solid',
      config: info?.c || getLinusPaulingConfig(i),
      valency_shells: [i],
      valence_electrons: 1,
      spin: "up",
      radius: 100,
      electronegativity: ELECTRONEGATIVITY[i] || null,
      ionization: 500,
      oxidation: [1],
      reactivity: "Média",
      bonding: "Metálica",
      occurrence: dyn.occurrence || "Encontrado em minerais diversos.",
      producers: ["China", "Brasil", "EUA"],
      applications: dyn.applications || ["Indústria metalúrgica"],
      biology: dyn.biology || "Sem função biológica conhecida.",
      toxicity: i === 80 || i === 82 || i === 92,
      curiosities: dyn.curiosities || ["Elemento estudado em química geral.", "Importante para vestibular."],
      x: pos.x,
      y: pos.y,
      ...dyn
    });
  }

  return list;
};

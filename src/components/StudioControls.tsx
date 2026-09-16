import React from 'react';
import { Sparkles, RotateCcw, Compass, Check, ChevronRight } from 'lucide-react';

export interface StudioConfig {
  gender: 'women' | 'men';
  outfitIndex: number; // 0 to 3
  shoeIndex: number;   // 0 to 2
  hairIndex: number;   // 0 to 2
  color: 'black' | 'ivory' | 'emerald' | 'camel';
}

interface StudioControlsProps {
  config: StudioConfig;
  onChangeConfig: (newConfig: Partial<StudioConfig>) => void;
  rotationDeg: number;
  onSetRotation: (deg: number) => void;
  onResetView: () => void;
}

export const StudioControls: React.FC<StudioControlsProps> = ({
  config,
  onChangeConfig,
  rotationDeg,
  onSetRotation,
  onResetView
}) => {
  // Outfits configuration for both genders
  const outfitsData = {
    women: [
      { id: 'w-01', name: 'Castleford Storm Trench', desc: 'Water-repellent gabardine with horn buttons', pieces: 'Gabardine Trench • Silk Trousers' },
      { id: 'w-02', name: 'Double-Faced Cashmere Blazer', desc: 'Hand-finished unlined tailoring from Biella', pieces: 'Cashmere Blazer • Pleated Flannel' },
      { id: 'w-03', name: 'Architectural Wool Cape', desc: 'Structured drape in heavyweight Yorkshire wool', pieces: 'Melton Cape • Slim Trouser' },
      { id: 'w-04', name: 'Fluid Silk Evening Silhouette', desc: 'Bias-cut mulberry silk with liquid drape', pieces: 'Silk Gown • Vermeil Cuff' }
    ],
    men: [
      { id: 'm-01', name: 'Savile Row Structured Overcoat', desc: 'Peaked lapels cut from northern English wool', pieces: 'Wool Coat • Como Flannel' },
      { id: 'm-02', name: 'Tuscan Merino Field Jacket', desc: 'Four-pocket utilitarian tailoring with horn closures', pieces: 'Field Jacket • Raw Denim' },
      { id: 'm-03', name: 'Double-Breasted Cashmere Suit', desc: 'Full canvas construction with natural shoulder', pieces: 'Cashmere Suit • Sea Island Shirt' },
      { id: 'm-04', name: 'Midnight Mohair Tuxedo', desc: 'Silk grosgrain lapels with satin side braid', pieces: 'Mohair Tuxedo • Patent Oxford' }
    ]
  };

  const shoesData = {
    women: [
      { id: 's-01', name: 'Florentine Chelsea Boot', type: 'Vachetta Calfskin' },
      { id: 's-02', name: 'Sloane Goodyear Loafer', type: 'Polished Boxcalf' },
      { id: 's-03', name: 'Sculptural Nappa Mule', type: 'Hand-Molded Heel' }
    ],
    men: [
      { id: 's-01', name: 'Plain Toe Oxford Derby', type: 'Full Goodyear Welt' },
      { id: 's-02', name: 'Sloane Penny Loafer', type: 'Burnished Calfskin' },
      { id: 's-03', name: 'Artisan Nappa Sneaker', type: 'Margom Cupsole' }
    ]
  };

  const hairData = {
    women: [
      { id: 'h-01', name: 'Architectural Chignon', style: 'Sleek Low Knot' },
      { id: 'h-02', name: 'Atelier Natural Waves', style: 'Soft Shoulder Drape' },
      { id: 'h-03', name: 'Modern Minimal Bob', style: 'Blunt Parisian Cut' }
    ],
    men: [
      { id: 'h-01', name: 'Clean Tapered Fade', style: 'Classic Side Sweep' },
      { id: 'h-02', name: 'Textured Pompadour', style: 'Natural Atelier Flow' },
      { id: 'h-03', name: 'Minimalist Crop', style: 'Short Architectural' }
    ]
  };

  const colorPalette = [
    { id: 'black', label: 'Obsidian', hex: '#111311', border: '#2B332E' },
    { id: 'ivory', label: 'Champagne Ivory', hex: '#EBE5D8', border: '#D4AF37' },
    { id: 'emerald', label: 'Forest Emerald', hex: '#0B291A', border: '#1D5A3A' },
    { id: 'camel', label: 'Desert Camel', hex: '#9E7748', border: '#B88F5B' }
  ] as const;

  const currentOutfits = outfitsData[config.gender];
  const currentShoes = shoesData[config.gender];
  const currentHair = hairData[config.gender];

  // Camera preset inspection angles
  const anglePresets = [
    { label: 'Front', deg: 0 },
    { label: '3/4 Front', deg: 45 },
    { label: 'Profile', deg: 90 },
    { label: '3/4 Back', deg: 135 },
    { label: 'Back', deg: 180 }
  ];

  return (
    <div className="w-full flex flex-col gap-5 text-left select-none font-sans">
      {/* 1. GENDER / DISCIPLINE TOGGLE */}
      <div className="flex items-center justify-between border-b border-[#163826] pb-3.5">
        <div className="flex items-center gap-1.5 text-[10px] font-mono-luxury tracking-[0.2em] uppercase text-[#D4AF37]">
          <Sparkles size={11} />
          <span>VELORA Atelier Studio</span>
        </div>

        <div className="flex items-center bg-[#07150E] border border-[#173D29] p-0.5 rounded-xs">
          <button
            type="button"
            onClick={() => onChangeConfig({ gender: 'women', outfitIndex: 0 })}
            className={`px-3 py-1 text-[10.5px] font-mono-luxury uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              config.gender === 'women'
                ? 'bg-[#153D2A] text-[#E5C583] border border-[#D4AF37]/50 font-semibold'
                : 'text-[#7E998B] hover:text-white'
            }`}
          >
            Womenswear
          </button>
          <button
            type="button"
            onClick={() => onChangeConfig({ gender: 'men', outfitIndex: 0 })}
            className={`px-3 py-1 text-[10.5px] font-mono-luxury uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              config.gender === 'men'
                ? 'bg-[#153D2A] text-[#E5C583] border border-[#D4AF37]/50 font-semibold'
                : 'text-[#7E998B] hover:text-white'
            }`}
          >
            Menswear
          </button>
        </div>
      </div>

      {/* 2. OUTFIT SELECTION (01 / 04) */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono-luxury uppercase tracking-[0.16em] text-[#8AA395] mb-2">
          <span>Outfit Selection</span>
          <span className="text-[#D4AF37] font-semibold">
            0{config.outfitIndex + 1} / 04
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {currentOutfits.map((outfit, idx) => (
            <button
              key={outfit.id}
              type="button"
              onClick={() => onChangeConfig({ outfitIndex: idx })}
              className={`p-2.5 text-left border rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                config.outfitIndex === idx
                  ? 'bg-[#102E20] border-[#D4AF37] text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                  : 'bg-[#07160F]/80 border-[#143323] text-[#9DB4A7] hover:border-[#D4AF37]/40 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono-luxury text-[#D4AF37]">
                  LOOK 0{idx + 1}
                </span>
                {config.outfitIndex === idx && (
                  <Check size={11} className="text-[#E5C583]" />
                )}
              </div>
              <h5 className="font-editorial text-[13px] text-white font-normal mt-1 leading-tight line-clamp-1">
                {outfit.name}
              </h5>
              <span className="text-[10px] text-[#7E998B] mt-0.5 line-clamp-1">
                {outfit.pieces}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. COLOR PALETTE */}
      <div>
        <div className="flex items-center justify-between text-[11px] font-mono-luxury uppercase tracking-[0.16em] text-[#8AA395] mb-2">
          <span>Palette & Textile Tint</span>
          <span className="text-[#FAF9F5] capitalize text-[10.5px]">
            {colorPalette.find(c => c.id === config.color)?.label}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {colorPalette.map(col => (
            <button
              key={col.id}
              type="button"
              onClick={() => onChangeConfig({ color: col.id })}
              className={`group flex items-center gap-2 px-2.5 py-1.5 border rounded-xs transition-all cursor-pointer ${
                config.color === col.id
                  ? 'bg-[#102E20] border-[#D4AF37] text-[#FAF9F5]'
                  : 'bg-[#07160F] border-[#143323] text-[#7E998B] hover:border-[#D4AF37]/40 hover:text-white'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/50 shrink-0 shadow-xs"
                style={{ backgroundColor: col.hex }}
              />
              <span className="text-[10.5px] font-mono-luxury uppercase tracking-wider">
                {col.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. FOOTWEAR & HAIR ATELIER (2 Columns) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* Footwear Selector (01 / 03) */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono-luxury uppercase tracking-[0.14em] text-[#8AA395] mb-1.5">
            <span>Shoes</span>
            <span className="text-[#D4AF37]">0{config.shoeIndex + 1} / 03</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {currentShoes.map((shoe, idx) => (
              <button
                key={shoe.id}
                type="button"
                onClick={() => onChangeConfig({ shoeIndex: idx })}
                className={`px-2.5 py-1.5 text-left border rounded-xs text-[11px] transition-all cursor-pointer flex items-center justify-between ${
                  config.shoeIndex === idx
                    ? 'bg-[#102E20] border-[#D4AF37] text-white font-medium'
                    : 'bg-[#07160F] border-[#143323] text-[#8AA395] hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                <span className="truncate">{shoe.name}</span>
                {config.shoeIndex === idx && <Check size={10} className="text-[#E5C583] shrink-0 ml-1" />}
              </button>
            ))}
          </div>
        </div>

        {/* Hairstyle Selector (01 / 03) */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono-luxury uppercase tracking-[0.14em] text-[#8AA395] mb-1.5">
            <span>Hair</span>
            <span className="text-[#D4AF37]">0{config.hairIndex + 1} / 03</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {currentHair.map((h, idx) => (
              <button
                key={h.id}
                type="button"
                onClick={() => onChangeConfig({ hairIndex: idx })}
                className={`px-2.5 py-1.5 text-left border rounded-xs text-[11px] transition-all cursor-pointer flex items-center justify-between ${
                  config.hairIndex === idx
                    ? 'bg-[#102E20] border-[#D4AF37] text-white font-medium'
                    : 'bg-[#07160F] border-[#143323] text-[#8AA395] hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                <span className="truncate">{h.name}</span>
                {config.hairIndex === idx && <Check size={10} className="text-[#E5C583] shrink-0 ml-1" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. CAMERA & INSPECTION ANGLE CONTROLS */}
      <div className="pt-2 border-t border-[#143323]">
        <div className="flex items-center justify-between text-[10.5px] font-mono-luxury uppercase tracking-[0.14em] text-[#8AA395] mb-2">
          <span className="flex items-center gap-1.5">
            <Compass size={11} className="text-[#D4AF37]" />
            <span>Inspection Orbit Angle</span>
          </span>
          <span className="text-[#E5C583] font-semibold">
            {Math.round(rotationDeg)}°
          </span>
        </div>

        {/* Quick Angle Presets */}
        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {anglePresets.map(preset => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onSetRotation(preset.deg)}
              className={`py-1 text-center border rounded-xs text-[9.5px] font-mono-luxury uppercase transition-all cursor-pointer ${
                Math.abs(rotationDeg - preset.deg) < 15
                  ? 'bg-[#153D2A] border-[#D4AF37] text-[#E5C583] font-semibold'
                  : 'bg-[#07150E] border-[#143323] text-[#7E998B] hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Reset View Button */}
        <button
          type="button"
          onClick={onResetView}
          className="w-full py-2 bg-[#07160F] hover:bg-[#0F281C] text-[#9DB4A7] hover:text-[#FAF9F5] border border-[#143323] hover:border-[#D4AF37]/40 text-[10.5px] font-mono-luxury uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw size={11} />
          <span>Reset to Frontal Center View</span>
        </button>
      </div>
    </div>
  );
};

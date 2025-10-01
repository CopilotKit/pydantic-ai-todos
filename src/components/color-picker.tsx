"use client";

import { useState } from "react";

interface ColorPickerProps {
  themeColor: string;
  onColorChange?: (color: string) => void;
}

export function ColorPicker({ themeColor, onColorChange }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(themeColor);

  const presetColors = [
    { name: "Indigo", color: "#6366f1" },
    { name: "Purple", color: "#a855f7" },
    { name: "Pink", color: "#ec4899" },
    { name: "Rose", color: "#f43f5e" },
    { name: "Orange", color: "#f97316" },
    { name: "Amber", color: "#f59e0b" },
    { name: "Emerald", color: "#10b981" },
    { name: "Teal", color: "#14b8a6" },
    { name: "Cyan", color: "#06b6d4" },
    { name: "Sky", color: "#0ea5e9" },
    { name: "Blue", color: "#3b82f6" },
    { name: "Violet", color: "#8b5cf6" },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const applyColor = () => {
    onColorChange?.(selectedColor);
  };

  return (
    <div 
      style={{ backgroundColor: themeColor }} 
      className="backdrop-blur-sm rounded-xl p-6 mt-4 mb-4 max-w-md w-full border border-white/20 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">🎨 Theme Color Picker</h3>
      </div>

      {/* Color preview */}
      <div className="mb-6">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/70">Selected Color</span>
            <span className="text-sm font-mono text-white">{selectedColor}</span>
          </div>
          <div 
            style={{ backgroundColor: selectedColor }}
            className="w-full h-20 rounded-lg shadow-lg transition-all duration-300 border-2 border-white/30"
          />
        </div>
      </div>

      {/* Preset colors grid */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white/80 mb-3">Preset Colors</h4>
        <div className="grid grid-cols-4 gap-3">
          {presetColors.map((preset) => (
            <button
              key={preset.color}
              onClick={() => handleColorSelect(preset.color)}
              className={`group relative aspect-square rounded-lg transition-all duration-200 hover:scale-110 ${
                selectedColor === preset.color ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-105' : ''
              }`}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
            >
              {selectedColor === preset.color && (
                <svg className="w-6 h-6 text-white absolute inset-0 m-auto drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white/60 whitespace-nowrap">{preset.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom color input */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white/80 mb-3">Custom Color</h4>
        <div className="flex gap-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorSelect(e.target.value)}
            className="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/30 bg-transparent"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => handleColorSelect(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Apply button */}
      <button
        onClick={applyColor}
        className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
      >
        Apply Theme Color
      </button>
    </div>
  );
}


"use client";

import { useState } from "react";

interface CalculatorProps {
  themeColor: string;
}

export function Calculator({ themeColor }: CalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+": return prev + current;
      case "-": return prev - current;
      case "×": return prev * current;
      case "÷": return prev / current;
      default: return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const Button = ({ children, onClick, className = "", span = false }: { children: React.ReactNode; onClick: () => void; className?: string; span?: boolean }) => (
    <button
      onClick={onClick}
      className={`
        ${span ? 'col-span-2' : ''}
        h-14 rounded-lg font-semibold text-lg transition-all
        active:scale-95 shadow-lg hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div 
      style={{ backgroundColor: themeColor }} 
      className="backdrop-blur-sm rounded-xl p-6 mt-4 mb-4 max-w-sm w-full border border-white/20 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">🔢 Calculator</h3>
      </div>

      {/* Display */}
      <div className="bg-black/30 rounded-lg p-6 mb-4 backdrop-blur-sm">
        <div className="text-right">
          {operation && (
            <div className="text-white/50 text-sm mb-1">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-white text-4xl font-bold tabular-nums overflow-x-auto">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        <Button onClick={handleClear} className="bg-red-500/30 hover:bg-red-500/40 text-white">
          C
        </Button>
        <Button onClick={() => handleOperation("÷")} className="bg-white/20 hover:bg-white/30 text-white">
          ÷
        </Button>
        <Button onClick={() => handleOperation("×")} className="bg-white/20 hover:bg-white/30 text-white">
          ×
        </Button>
        <Button onClick={() => handleOperation("-")} className="bg-white/20 hover:bg-white/30 text-white">
          −
        </Button>

        <Button onClick={() => handleNumber("7")} className="bg-white/10 hover:bg-white/20 text-white">
          7
        </Button>
        <Button onClick={() => handleNumber("8")} className="bg-white/10 hover:bg-white/20 text-white">
          8
        </Button>
        <Button onClick={() => handleNumber("9")} className="bg-white/10 hover:bg-white/20 text-white">
          9
        </Button>
        <Button onClick={() => handleOperation("+")} className="bg-white/20 hover:bg-white/30 text-white row-span-2 h-auto">
          +
        </Button>

        <Button onClick={() => handleNumber("4")} className="bg-white/10 hover:bg-white/20 text-white">
          4
        </Button>
        <Button onClick={() => handleNumber("5")} className="bg-white/10 hover:bg-white/20 text-white">
          5
        </Button>
        <Button onClick={() => handleNumber("6")} className="bg-white/10 hover:bg-white/20 text-white">
          6
        </Button>

        <Button onClick={() => handleNumber("1")} className="bg-white/10 hover:bg-white/20 text-white">
          1
        </Button>
        <Button onClick={() => handleNumber("2")} className="bg-white/10 hover:bg-white/20 text-white">
          2
        </Button>
        <Button onClick={() => handleNumber("3")} className="bg-white/10 hover:bg-white/20 text-white">
          3
        </Button>
        <Button onClick={handleEquals} className="bg-green-500/30 hover:bg-green-500/40 text-white row-span-2 h-auto">
          =
        </Button>

        <Button onClick={() => handleNumber("0")} span className="bg-white/10 hover:bg-white/20 text-white">
          0
        </Button>
        <Button onClick={handleDecimal} className="bg-white/10 hover:bg-white/20 text-white">
          .
        </Button>
      </div>
    </div>
  );
}


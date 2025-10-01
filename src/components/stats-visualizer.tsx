interface StatsVisualizerProps {
  themeColor: string;
  todos: { status: string }[];
}

export function StatsVisualizer({ themeColor, todos }: StatsVisualizerProps) {
  const todoCount = todos.filter(t => t.status === 'todo').length;
  const inProgressCount = todos.filter(t => t.status === 'in-progress').length;
  const doneCount = todos.filter(t => t.status === 'done').length;
  const total = todos.length;
  
  const todoPercent = total > 0 ? (todoCount / total) * 100 : 0;
  const inProgressPercent = total > 0 ? (inProgressCount / total) * 100 : 0;
  const donePercent = total > 0 ? (doneCount / total) * 100 : 0;

  const CircularProgress = ({ percent, color, label, count }: { percent: number; color: string; label: string; count: number }) => {
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (percent / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg className="transform -rotate-90 w-28 h-28">
            <circle
              cx="56"
              cy="56"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r="40"
              stroke={color}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-xs text-white/60">{Math.round(percent)}%</div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm font-medium text-white/80">{label}</div>
      </div>
    );
  };

  return (
    <div 
      style={{ backgroundColor: themeColor }} 
      className="backdrop-blur-sm rounded-xl p-6 mt-4 mb-4 max-w-2xl w-full border border-white/20 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white">📊 Task Statistics</h3>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <CircularProgress 
          percent={todoPercent} 
          color="#ef4444" 
          label="To Do" 
          count={todoCount}
        />
        <CircularProgress 
          percent={inProgressPercent} 
          color="#f59e0b" 
          label="In Progress" 
          count={inProgressCount}
        />
        <CircularProgress 
          percent={donePercent} 
          color="#10b981" 
          label="Complete" 
          count={doneCount}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-white mb-1">{total}</div>
          <div className="text-sm text-white/70">Total Tasks</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-green-300 mb-1">{donePercent.toFixed(0)}%</div>
          <div className="text-sm text-white/70">Completion Rate</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-yellow-300 mb-1">{todoCount + inProgressCount}</div>
          <div className="text-sm text-white/70">Remaining</div>
        </div>
      </div>
    </div>
  );
}


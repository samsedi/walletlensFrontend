import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface RiskDonutProps {
  score?: number;
  level?: string;
}

export function RiskDonut({ score = 12, level = "Low Risk" }: RiskDonutProps) {
  // calculate stroke offset based on score (0-100)
  // Max offset (0 score) = 250
  // Min offset (100 score) = 0
  const dashOffset = 250 - (250 * score) / 100;
  
  let strokeColor = "#4ADE80"; // Green
  if (score >= 30) strokeColor = "#FBBF24"; // Yellow
  if (score >= 70) strokeColor = "#EF4444"; // Red

  // Calculate dynamic legend percentages that sum up to the score
  const behaviorPct = Math.floor(score * 0.4);
  const contactsPct = Math.floor(score * 0.3);
  const historyPct = score - behaviorPct - contactsPct;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border border-gray-200 rounded-[1.5rem] p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <div className="absolute -top-6 -right-6 pointer-events-none opacity-[0.06] dark:opacity-[0.1] rotate-12">
        {score < 30 ? (
          <ShieldCheck className="w-40 h-40 text-green-600 dark:text-green-400" />
        ) : score >= 70 ? (
          <ShieldAlert className="w-40 h-40 text-red-600 dark:text-red-400" />
        ) : (
          <Shield className="w-40 h-40 text-yellow-600 dark:text-yellow-400" />
        )}
      </div>

      <div className="mb-6 relative z-10">
        <h3 className="font-semibold text-lg text-auralis-dark">Risk Score</h3>
        <p className="text-xs text-auralis-text-muted mt-1">Based on GoPlus Flags</p>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative py-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full max-w-[200px] aspect-square"
        >
          <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
            {/* Inactive Segments */}
            <circle cx="50" cy="50" fill="none" r="40" stroke="#E5E7EB" strokeDasharray="4 6" strokeWidth="8"></circle>
            {/* Active Segments */}
            <motion.circle 
              cx="50" 
              cy="50" 
              fill="none" 
              r="40" 
              stroke={strokeColor} 
              strokeDasharray="4 6" 
              strokeWidth="8"
              initial={{ strokeDashoffset: 250 }}
              animate={{ strokeDashoffset: dashOffset }} 
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: "250 250" }}
            ></motion.circle>
            {/* Marker Triangle */}
            <motion.polygon 
              fill={strokeColor} 
              points="50,2 47,8 53,8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            ></motion.polygon>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
            <span className="text-4xl font-bold text-auralis-dark">{score}<span className="text-xl text-gray-400">/100</span></span>
            <span className="text-[11px] text-auralis-text-muted font-medium mt-1 uppercase tracking-wider">{level}</span>
          </div>
        </motion.div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-between w-full mt-6 text-[10px] text-auralis-text-muted font-medium uppercase tracking-wider">
        <span>Behavior {behaviorPct}%</span>
        <span>Contacts {contactsPct}%</span>
        <span>History {historyPct}%</span>
      </div>
    </motion.div>
  );
}

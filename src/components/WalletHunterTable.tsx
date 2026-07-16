import { motion } from 'motion/react';

export function WalletHunterTable() {
  return (
    <div className="bg-white dark:bg-white rounded-[1.5rem] shadow-sm border border-gray-200 flex flex-col overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-gray-100">
        <h3 className="font-bold text-gray-900">Recent Discoveries</h3>
        <div className="flex gap-2 text-[13px] font-medium">
          <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg shadow-sm">All Discoveries</button>
          <button className="text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors">Severe Threats</button>
          <button className="text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors">Behavioral Anomalies</button>
          <button className="text-gray-500 hover:text-gray-900 px-3 py-1.5 transition-colors">Benign</button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 flex items-center gap-3">
                <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm bg-transparent"></div>
                ENTITY / ADDRESS
              </th>
              <th className="px-6 py-4">THREAT CLASS</th>
              <th className="px-6 py-4">SCORE</th>
              <th className="px-6 py-4">DETECTION VECTOR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              {
                icon: "BL",
                iconColor: "text-red-500 bg-red-50",
                address: "0x71C...3d2E",
                hop: "1 Hop Away",
                threatClass: "SEVERE RISK",
                threatColor: "text-red-600 bg-red-100",
                score: "98",
                vector: "OFAC / Tornado Cash"
              },
              {
                icon: "FL",
                iconColor: "text-yellow-600 bg-yellow-50",
                address: "0x4aB...92F1",
                hop: "2 Hops Away",
                threatClass: "ELEVATED",
                threatColor: "text-yellow-600 bg-yellow-100",
                score: "62",
                vector: "Chainabuse / Phishing"
              },
              {
                icon: "CL",
                iconColor: "text-green-600 bg-green-50",
                address: "0xbc2...a901",
                hop: "Direct",
                threatClass: "BENIGN",
                threatColor: "text-green-700 bg-green-100",
                score: "04",
                vector: "Binance Hot Wallet"
              },
              {
                icon: "BL",
                iconColor: "text-red-500 bg-red-50",
                address: "0x3f5...d41c",
                hop: "3 Hops Away",
                threatClass: "SEVERE RISK",
                threatColor: "text-red-600 bg-red-100",
                score: "89",
                vector: "Internal DB"
              }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] ${row.iconColor}`}>
                      {row.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 font-mono text-[13px]">{row.address}</div>
                      <div className="text-[11px] text-gray-500">{row.hop}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${row.threatColor}`}>
                    {row.threatClass}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-10 h-10">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle className="stroke-gray-100" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                      <motion.circle 
                        initial={{ strokeDasharray: "0, 100" }}
                        whileInView={{ strokeDasharray: `${row.score}, 100` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={parseInt(row.score) > 80 ? 'stroke-red-500' : parseInt(row.score) > 50 ? 'stroke-yellow-500' : 'stroke-green-500'} 
                        cx="18" cy="18" fill="none" r="16" strokeWidth="3"
                        strokeLinecap="round"
                      ></motion.circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="font-bold text-gray-900 text-[11px] leading-none">{row.score}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-[13px] font-medium">
                  {row.vector}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

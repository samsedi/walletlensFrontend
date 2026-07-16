import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export function PlaceholderPage({ title, icon: Icon, description }: PlaceholderPageProps) {
  return (
    <main className="flex-1 w-full max-w-[1600px] mx-auto p-6 lg:p-8 mt-2 pb-12 flex flex-col items-center justify-center min-h-[60vh] transition-colors">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center max-w-md"
      >
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-6 transition-colors">
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
          {description}
        </p>
        <button className="mt-8 bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
          Explore Features
        </button>
      </motion.div>
    </main>
  );
}

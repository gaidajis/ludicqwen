import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TierCategory, FilterState } from '../types';

interface SidebarProps {
  activeTier: TierCategory | null;
  activeFilter: FilterState;
  editMode: boolean;
  onTierClick: (tier: TierCategory | null) => void;
  onFilterChange: (type: 'modality' | 'budget', value: string) => void;
  onToggleEditMode: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const tiers: { id: TierCategory; label: string }[] = [
  { id: 'tier-1-alive', label: '01 BODY ALIVE' },
  { id: 'tier-2-stable', label: '02 BODY STABLE' },
  { id: 'tier-3-sustained', label: '03 BODY SUSTAINED' },
  { id: 'tier-4-secure', label: '04 ENVIRONMENT SECURE' },
  { id: 'tier-5-pleasure', label: '05 BODY & PLEASURE' },
  { id: 'tier-6-social', label: '06 SOCIAL & EMOTIONAL' },
  { id: 'tier-7-agency', label: '07 STATUS & AGENCY' },
  { id: 'tier-8-mind', label: '08 MIND STIMULATED' },
  { id: 'tier-9-senses', label: '09 SENSES & EXCITEMENT' },
  { id: 'tier-10-meaning', label: '10 SELF & MEANING' },
];

const modalityOptions = ['all', 'product', 'experience', 'location'];
const budgetOptions = ['all', 'budget', 'mid', 'luxury'];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTier,
  activeFilter,
  editMode,
  onTierClick,
  onFilterChange,
  onToggleEditMode,
  isOpen,
  onClose,
}) => {
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="font-serif text-xl tracking-wide mb-1">LUCID</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">The hierarchy of what matters.</p>
      </div>

      <div className="border-t border-border-light dark:border-border" />

      {/* Tier Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-4">
          {tiers.map((tier) => (
            <li key={tier.id}>
              <button
                onClick={() => {
                  onTierClick(tier.id);
                  onClose();
                }}
                className={`w-full text-left px-3 py-2 text-sm font-mono transition-colors ${
                  activeTier === tier.id
                    ? 'border-l-2 border-white dark:border-white font-bold pl-2 bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tier.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border-light dark:border-border" />

      {/* Filters */}
      <div className="p-4 space-y-4">
        {/* Modality Filter */}
        <div>
          <p className="text-xs font-mono uppercase text-gray-500 mb-2">Modality</p>
          <div className="flex flex-wrap gap-2">
            {modalityOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onFilterChange('modality', opt)}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors ${
                  activeFilter.modality === opt
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Filter */}
        <div>
          <p className="text-xs font-mono uppercase text-gray-500 mb-2">Budget</p>
          <div className="flex flex-wrap gap-2">
            {budgetOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onFilterChange('budget', opt)}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-colors ${
                  activeFilter.budget === opt
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border-light dark:border-border" />

      {/* Edit Mode Toggle */}
      <div className="p-4">
        <button
          onClick={onToggleEditMode}
          className={`w-full py-3 text-sm font-medium rounded-md transition-colors ${
            editMode
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200'
          }`}
        >
          {editMode ? 'EXIT EDIT MODE' : 'ENTER EDIT MODE'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[280px] h-screen fixed left-0 top-0 bg-white dark:bg-background border-r border-border-light dark:border-border overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-background border-b border-border-light dark:border-border px-4 py-3 flex items-center justify-between">
        <h1 className="font-serif text-lg tracking-wide">LUCID</h1>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-background lg:hidden shadow-xl"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

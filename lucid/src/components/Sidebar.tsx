import { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';
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

// PIN loaded from environment variable at build time — never hardcoded in source
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN as string;

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
  const [pinPromptOpen, setPinPromptOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleEditModeClick = () => {
    if (editMode) {
      onToggleEditMode();
    } else {
      setPinPromptOpen(true);
      setPinInput('');
      setPinError(false);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ADMIN_PIN && pinInput === ADMIN_PIN) {
      setPinPromptOpen(false);
      setPinInput('');
      setPinError(false);
      onToggleEditMode();
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

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
          onClick={handleEditModeClick}
          className={`w-full py-3 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2 ${
            editMode
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {!editMode && <Lock className="w-3.5 h-3.5" />}
          {editMode ? 'EXIT EDIT MODE' : 'ADMIN'}
        </button>
      </div>

      {/* PIN Prompt */}
      <AnimatePresence>
        {pinPromptOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setPinPromptOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-card rounded-xl shadow-2xl p-6 w-80 mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-primary-light dark:text-text-primary">Admin Access</h3>
                  <p className="text-xs text-gray-500">Enter PIN to edit content</p>
                </div>
              </div>
              <form onSubmit={handlePinSubmit}>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                  placeholder="Enter PIN"
                  autoFocus
                  className={`w-full px-3 py-2.5 text-sm rounded-lg border ${
                    pinError
                      ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  } text-text-primary-light dark:text-text-primary focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white mb-1`}
                />
                {pinError && (
                  <p className="text-xs text-red-500 mb-3">Incorrect PIN. Try again.</p>
                )}
                {!pinError && <div className="mb-3" />}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPinPromptOpen(false)}
                    className="flex-1 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-sm rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-[280px] h-screen fixed left-0 top-0 bg-white dark:bg-background border-r border-border-light dark:border-border overflow-hidden">
        {sidebarContent}
      </aside>
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

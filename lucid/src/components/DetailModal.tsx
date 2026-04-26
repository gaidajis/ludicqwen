import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { LucidItem } from '../types';
import { ScoreBar } from './ScoreBar';

interface DetailModalProps {
  item: LucidItem | null;
  onClose: () => void;
}

const tierLabels: Record<string, string> = {
  'tier-1-alive': 'TIER 1 — BODY ALIVE',
  'tier-2-stable': 'TIER 2 — BODY STABLE',
  'tier-3-sustained': 'TIER 3 — BODY SUSTAINED',
  'tier-4-secure': 'TIER 4 — ENVIRONMENT SECURE',
  'tier-5-pleasure': 'TIER 5 — BODY & PLEASURE',
  'tier-6-social': 'TIER 6 — SOCIAL & EMOTIONAL',
  'tier-7-agency': 'TIER 7 — STATUS & AGENCY',
  'tier-8-mind': 'TIER 8 — MIND STIMULATED',
  'tier-9-senses': 'TIER 9 — SENSES & EXCITEMENT',
  'tier-10-meaning': 'TIER 10 — SELF & MEANING',
};

const scoreLabel = (score: number) => {
  if (score >= 9) return 'Exceptional';
  if (score >= 7) return 'Strong';
  if (score >= 5) return 'Moderate';
  return 'Low';
};

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const isOpen = !!item;

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!item) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="detail-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          key="detail-panel"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white dark:bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          {item.imageUrl && (
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 overflow-hidden rounded-t-xl">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-wide bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded">
                {tierLabels[item.category]}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
                {item.modality}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wide border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 px-2 py-1 rounded ml-auto">
                {item.context.budget}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary mb-2">
              {item.title}
            </h2>

            {/* Overall Score */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl font-mono font-bold text-text-primary-light dark:text-text-primary">
                {item.overallScore.toFixed(1)}
              </span>
              <div>
                <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary">{scoreLabel(item.overallScore)}</p>
                <p className="text-xs text-gray-500">Overall Score</p>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="mb-5">
              <ScoreBar
                efficacy={item.scores.efficacy}
                buildQuality={item.scores.buildQuality}
                consensus={item.scores.consensus}
                overallScore={item.overallScore}
              />
            </div>

            {/* Score detail grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Efficacy', value: item.scores.efficacy },
                { label: 'Build Quality', value: item.scores.buildQuality },
                { label: 'Consensus', value: item.scores.consensus },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-mono font-bold text-text-primary-light dark:text-text-primary">{value.toFixed(1)}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-800 mb-5" />

            {/* Justification */}
            <div className="mb-5">
              <h3 className="text-xs font-mono uppercase tracking-wide text-gray-500 mb-2">Justification</h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted leading-relaxed">
                {item.justification}
              </p>
            </div>

            {/* Context */}
            {item.context && (
              <div className="mb-5">
                <h3 className="text-xs font-mono uppercase tracking-wide text-gray-500 mb-3">Context</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(item.context).filter(([k]) => k !== 'budget').map(([key, value]) => (
                    <div key={key} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 capitalize mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-sm font-medium text-text-primary-light dark:text-text-primary capitalize">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source Tags */}
            {item.sourceTypes?.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wide text-gray-500 mb-2">Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {item.sourceTypes.map((source, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, ImageOff } from 'lucide-react';
import type { LucidItem } from '../types';
import { ScoreBar } from './ScoreBar';

interface DataCardProps {
  item: LucidItem;
  editMode: boolean;
  onEdit: (item: LucidItem) => void;
  onDelete: (item: LucidItem) => void;
  onView: (item: LucidItem) => void;
}

const tierLabels: Record<string, string> = {
  'tier-1-alive': 'TIER 1',
  'tier-2-stable': 'TIER 2',
  'tier-3-sustained': 'TIER 3',
  'tier-4-secure': 'TIER 4',
  'tier-5-pleasure': 'TIER 5',
  'tier-6-social': 'TIER 6',
  'tier-7-agency': 'TIER 7',
  'tier-8-mind': 'TIER 8',
  'tier-9-senses': 'TIER 9',
  'tier-10-meaning': 'TIER 10',
};

export const DataCard: React.FC<DataCardProps> = ({ item, editMode, onEdit, onDelete, onView }) => {
  const [imageError, setImageError] = useState(false);

  // Reset image error when item changes (e.g. after filter)
  useEffect(() => {
    setImageError(false);
  }, [item.id, item.imageUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card-light dark:bg-card border border-border-light dark:border-border rounded-lg overflow-hidden hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-shadow cursor-pointer"
      onClick={() => !editMode && onView(item)}
    >
      {/* Edit/Delete Controls - Only visible in edit mode */}
      {editMode && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(item); }}
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label="Edit item"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item); }}
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-sm"
            aria-label="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image Header - 16:9 aspect ratio */}
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {!imageError && item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1A1A1A]">
            <ImageOff className="w-8 h-8 text-[#555555]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Metadata Row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-wide bg-black text-white px-2 py-1 rounded">
            {tierLabels[item.category]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {item.modality}
          </span>
          <span className="font-mono text-[10px] text-gray-400 dark:text-gray-500 ml-auto">
            {item.context.budget.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base text-text-primary-light dark:text-text-primary mb-3 line-clamp-2">
          {item.title}
        </h3>

        {/* Score Bar */}
        <div className="mb-3">
          <ScoreBar item={item} />
        </div>

        {/* Justification */}
        <p className="text-sm text-text-muted-light dark:text-text-muted line-clamp-3 mb-3">
          {item.justification}
        </p>

        {/* Source Tags */}
        <div className="flex flex-wrap gap-2">
          {item.sourceTypes.map((source, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

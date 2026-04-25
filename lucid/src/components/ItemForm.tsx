import { useState } from 'react';
import type { LucidItem, TierCategory, Modality, Budget } from '../types';

interface ItemFormProps {
  initialData?: Partial<LucidItem>;
  onSubmit: (data: Omit<LucidItem, 'id'>) => void;
}

const tierOptions: { value: TierCategory; label: string }[] = [
  { value: 'tier-1-alive', label: 'Tier 1 - Body Alive' },
  { value: 'tier-2-stable', label: 'Tier 2 - Body Stable' },
  { value: 'tier-3-sustained', label: 'Tier 3 - Body Sustained' },
  { value: 'tier-4-secure', label: 'Tier 4 - Environment Secure' },
  { value: 'tier-5-pleasure', label: 'Tier 5 - Body & Pleasure' },
  { value: 'tier-6-social', label: 'Tier 6 - Social & Emotional' },
  { value: 'tier-7-agency', label: 'Tier 7 - Status & Agency' },
  { value: 'tier-8-mind', label: 'Tier 8 - Mind Stimulated' },
  { value: 'tier-9-senses', label: 'Tier 9 - Senses & Excitement' },
  { value: 'tier-10-meaning', label: 'Tier 10 - Self & Meaning' },
];

const modalityOptions: { value: Modality; label: string }[] = [
  { value: 'product', label: 'Product' },
  { value: 'experience', label: 'Experience' },
  { value: 'location', label: 'Location' },
];

const budgetOptions: { value: Budget; label: string }[] = [
  { value: 'budget', label: 'Budget' },
  { value: 'mid', label: 'Mid' },
  { value: 'luxury', label: 'Luxury' },
];

export const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'tier-1-alive' as TierCategory,
    modality: initialData?.modality || 'product' as Modality,
    imageUrl: initialData?.imageUrl || '',
    efficacy: initialData?.scores?.efficacy || 0,
    buildQuality: initialData?.scores?.buildQuality || 0,
    consensus: initialData?.scores?.consensus || 0,
    justification: initialData?.justification || '',
    sourceType1: initialData?.sourceTypes?.[0] || '',
    sourceType2: initialData?.sourceTypes?.[1] || '',
    budget: initialData?.context?.budget || 'mid' as Budget,
    intent: initialData?.context?.intent || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const overallScore = Math.round((formData.efficacy + formData.buildQuality + formData.consensus) / 3);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.modality) {
      newErrors.modality = 'Modality is required';
    }
    if (formData.imageUrl && !formData.imageUrl.startsWith('https://')) {
      newErrors.imageUrl = 'Must be a valid https:// URL';
    }
    if (formData.efficacy < 0 || formData.efficacy > 100) {
      newErrors.efficacy = 'Must be between 0 and 100';
    }
    if (formData.buildQuality < 0 || formData.buildQuality > 100) {
      newErrors.buildQuality = 'Must be between 0 and 100';
    }
    if (formData.consensus < 0 || formData.consensus > 100) {
      newErrors.consensus = 'Must be between 0 and 100';
    }
    if (!formData.justification.trim()) {
      newErrors.justification = 'Justification is required';
    }
    if (formData.justification.length > 280) {
      newErrors.justification = 'Maximum 280 characters';
    }
    if (!formData.sourceType1.trim()) {
      newErrors.sourceType1 = 'Source Type 1 is required';
    }
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    }
    if (!formData.intent.trim()) {
      newErrors.intent = 'Intent is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        title: formData.title,
        category: formData.category,
        modality: formData.modality,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
        rank: 0,
        scores: {
          efficacy: formData.efficacy,
          buildQuality: formData.buildQuality,
          consensus: formData.consensus,
        },
        overallScore,
        justification: formData.justification,
        sourceTypes: [formData.sourceType1, formData.sourceType2].filter(Boolean),
        context: {
          budget: formData.budget,
          intent: formData.intent,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as TierCategory })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          >
            {tierOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Modality *</label>
          <select
            value={formData.modality}
            onChange={(e) => setFormData({ ...formData, modality: e.target.value as Modality })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          >
            {modalityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="text"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://..."
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
        />
        {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Efficacy (0-100) *</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.efficacy}
            onChange={(e) => setFormData({ ...formData, efficacy: Number(e.target.value) })}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.efficacy ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.efficacy && <p className="text-red-500 text-xs mt-1">{errors.efficacy}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Build Quality (0-100) *</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.buildQuality}
            onChange={(e) => setFormData({ ...formData, buildQuality: Number(e.target.value) })}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.buildQuality ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.buildQuality && <p className="text-red-500 text-xs mt-1">{errors.buildQuality}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Consensus (0-100) *</label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.consensus}
            onChange={(e) => setFormData({ ...formData, consensus: Number(e.target.value) })}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.consensus ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.consensus && <p className="text-red-500 text-xs mt-1">{errors.consensus}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Overall Score (auto-calculated)</label>
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md font-mono font-bold">
          {overallScore}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Justification * (max 280 chars)</label>
        <textarea
          value={formData.justification}
          onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
          rows={3}
          maxLength={280}
          className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.justification ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
        />
        <p className="text-xs text-gray-500 mt-1">{formData.justification.length}/280</p>
        {errors.justification && <p className="text-red-500 text-xs mt-1">{errors.justification}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Source Type 1 *</label>
          <input
            type="text"
            value={formData.sourceType1}
            onChange={(e) => setFormData({ ...formData, sourceType1: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.sourceType1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.sourceType1 && <p className="text-red-500 text-xs mt-1">{errors.sourceType1}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Source Type 2</label>
          <input
            type="text"
            value={formData.sourceType2}
            onChange={(e) => setFormData({ ...formData, sourceType2: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Budget *</label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value as Budget })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Intent *</label>
          <input
            type="text"
            value={formData.intent}
            onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
            placeholder="e.g. survival, recovery, mastery"
            className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 ${errors.intent ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          />
          {errors.intent && <p className="text-red-500 text-xs mt-1">{errors.intent}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-11 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
      >
        Save Item
      </button>
    </form>
  );
};

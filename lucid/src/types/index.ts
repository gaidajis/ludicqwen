export type Modality = 'product' | 'experience' | 'location';
export type Budget = 'budget' | 'mid' | 'luxury';
export type TierCategory = 
  | 'tier-1-alive'
  | 'tier-2-stable'
  | 'tier-3-sustained'
  | 'tier-4-secure'
  | 'tier-5-pleasure'
  | 'tier-6-social'
  | 'tier-7-agency'
  | 'tier-8-mind'
  | 'tier-9-senses'
  | 'tier-10-meaning';

export interface LucidItem {
  id: string;
  title: string;
  category: TierCategory;
  modality: Modality;
  imageUrl: string;
  rank: number;
  // Different metrics based on modality
  scores: {
    efficacy?: number;        // For products
    buildQuality?: number;    // For products
    consensus?: number;       // For products
    impact?: number;          // For experiences
    transformation?: number;  // For experiences
    uniqueness?: number;      // For experiences & locations
    beauty?: number;          // For locations
    accessibility?: number;   // For locations
    safety?: number;          // For locations
  };
  overallScore: number;
  justification: string;
  sourceTypes: string[];
  context: {
    budget: Budget;
    intent: string;
  };
  affiliateLink?: string;     // Optional affiliate marketing link
}

export interface FilterState {
  modality: 'all' | Modality;
  budget: 'all' | Budget;
}

export interface LucidStore {
  items: LucidItem[];
  editMode: boolean;
  activeFilter: FilterState;
  activeTier: TierCategory | null;
  addItem: (item: Omit<LucidItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<LucidItem>) => void;
  deleteItem: (id: string) => void;
  toggleEditMode: () => void;
  setFilter: (type: 'modality' | 'budget', value: string) => void;
  setActiveTier: (tier: TierCategory | null) => void;
}

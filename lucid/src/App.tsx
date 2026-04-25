import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLucidStore } from './store/useLucidStore';
import { IntroScreen } from './components/IntroScreen';
import { Sidebar } from './components/Sidebar';
import { TierSection } from './components/TierSection';
import { DataCard } from './components/DataCard';
import { Modal } from './components/Modal';
import { ItemForm } from './components/ItemForm';
import { ConfirmDelete } from './components/ConfirmDelete';
import type { LucidItem, TierCategory } from './types';

const tierIds: TierCategory[] = [
  'tier-1-alive',
  'tier-2-stable',
  'tier-3-sustained',
  'tier-4-secure',
  'tier-5-pleasure',
  'tier-6-social',
  'tier-7-agency',
  'tier-8-mind',
  'tier-9-senses',
  'tier-10-meaning',
];

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LucidItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LucidItem | null>(null);

  const {
    items,
    editMode,
    activeFilter,
    activeTier,
    addItem,
    updateItem,
    deleteItem,
    toggleEditMode,
    setFilter,
    setActiveTier,
  } = useLucidStore();

  // Filter items
  const filteredItems = items.filter((item: LucidItem) => {
    if (activeFilter.modality !== 'all' && item.modality !== activeFilter.modality) {
      return false;
    }
    if (activeFilter.budget !== 'all' && item.context.budget !== activeFilter.budget) {
      return false;
    }
    return true;
  });

  // Group items by tier
  const itemsByTier = tierIds.reduce((acc, tierId) => {
    acc[tierId] = filteredItems.filter((item: LucidItem) => item.category === tierId);
    return acc;
  }, {} as Record<TierCategory, LucidItem[]>);

  const handleAddItem = (data: Omit<LucidItem, 'id'>) => {
    addItem(data);
    setAddModalOpen(false);
  };

  const handleEditItem = (data: Omit<LucidItem, 'id'>) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
      setEditModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      deleteItem(deletingItem.id);
      setDeleteModalOpen(false);
      setDeletingItem(null);
    }
  };

  const scrollToTier = (tierId: TierCategory | null) => {
    setActiveTier(tierId);
    if (tierId) {
      const element = document.getElementById(tierId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Sidebar
        activeTier={activeTier}
        activeFilter={activeFilter}
        editMode={editMode}
        onTierClick={scrollToTier}
        onFilterChange={setFilter}
        onToggleEditMode={toggleEditMode}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Edit Mode Banner */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-30 bg-[#1A1A1A] text-amber-400 text-sm font-mono flex items-center justify-center lg:pl-[280px]"
          >
            EDIT MODE ACTIVE — Changes apply immediately.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`lg:pl-[280px] ${editMode ? 'pt-10' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
          {tierIds.map((tierId) => (
            <div key={tierId} className="mb-16 last:mb-0">
              <TierSection tierId={tierId}>
                {itemsByTier[tierId].map((item) => (
                  <DataCard
                    key={item.id}
                    item={item}
                    editMode={editMode}
                    onEdit={(i) => {
                      setEditingItem(i);
                      setEditModalOpen(true);
                    }}
                    onDelete={(i) => {
                      setDeletingItem(i);
                      setDeleteModalOpen(true);
                    }}
                  />
                ))}
              </TierSection>
            </div>
          ))}
        </div>
      </main>

      {/* Add Button - Only visible in edit mode */}
      <AnimatePresence>
        {editMode && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setAddModalOpen(true)}
            className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full bg-white dark:bg-white text-black shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-30"
            aria-label="Add new item"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Item"
      >
        <ItemForm
          onSubmit={handleAddItem}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
        }}
        title="Edit Item"
      >
        {editingItem && (
          <ItemForm
            initialData={editingItem}
            onSubmit={handleEditItem}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalOpen && deletingItem && (
          <ConfirmDelete
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setDeletingItem(null);
            }}
            onConfirm={handleDeleteConfirm}
            itemTitle={deletingItem.title}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

import { motion } from 'framer-motion';

const tierManifestos: Record<string, string> = {
  'tier-1-alive': "The non-negotiables. What stands between the body and extinction.",
  'tier-2-stable': "Stabilization within hours. Water, shelter, and the basics of wound management.",
  'tier-3-sustained': "Sustenance over days. Nutrition, sleep architecture, and physical recovery systems.",
  'tier-4-secure': "Environmental fortification. Safety infrastructure, stable housing, grid resilience.",
  'tier-5-pleasure': "Sensory restoration. Touch, comfort protocols, and deliberate pleasure engineering.",
  'tier-6-social': "Relational infrastructure. Belonging mechanisms, emotional safety, secure communication channels.",
  'tier-7-agency': "Autonomy architecture. Mastery development, financial sovereignty, decision-making power.",
  'tier-8-mind': "Cognitive expansion. Discovery frameworks, deep learning systems, paradigm shift catalysts.",
  'tier-9-senses': "Awe procurement. Uncharted coordinates, pristine audio, peak sensory input vectors.",
  'tier-10-meaning': "The longest game. Purpose construction, legacy design, highest-impact contribution.",
};

const tierNames: Record<string, string> = {
  'tier-1-alive': 'Body Alive',
  'tier-2-stable': 'Body Stable',
  'tier-3-sustained': 'Body Sustained',
  'tier-4-secure': 'Environment Secure',
  'tier-5-pleasure': 'Body & Pleasure',
  'tier-6-social': 'Social & Emotional',
  'tier-7-agency': 'Status & Agency',
  'tier-8-mind': 'Mind Stimulated',
  'tier-9-senses': 'Senses & Excitement',
  'tier-10-meaning': 'Self & Meaning',
};

const tierTimeframes: Record<string, string> = {
  'tier-1-alive': 'Minutes',
  'tier-2-stable': 'Hours',
  'tier-3-sustained': 'Days',
  'tier-4-secure': 'Weeks',
  'tier-5-pleasure': 'Weeks–Months',
  'tier-6-social': 'Months',
  'tier-7-agency': 'Months–Years',
  'tier-8-mind': 'Ongoing',
  'tier-9-senses': 'Ongoing',
  'tier-10-meaning': 'Years',
};

interface TierSectionProps {
  tierId: string;
  children: React.ReactNode;
}

export const TierSection: React.FC<TierSectionProps> = ({ tierId, children }) => {
  const tierNum = tierId.split('-')[1];
  const paddedNum = tierNum.padStart(2, '0');
  const name = tierNames[tierId];
  const timeframe = tierTimeframes[tierId];
  const manifesto = tierManifestos[tierId];

  return (
    <section id={tierId} className="scroll-mt-24">
      <div className="mb-8 pb-4 border-b border-border-light dark:border-border">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="font-mono text-sm text-gray-400">{timeframe}</span>
          <h2 className="text-2xl font-bold font-serif text-text-primary-light dark:text-text-primary">
            <span className="text-gray-400 mr-2">{paddedNum}</span>
            {name}
          </h2>
        </div>
        <p className="text-text-muted-light dark:text-text-muted italic">
          {manifesto}
        </p>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.04 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {children}
      </motion.div>
    </section>
  );
};

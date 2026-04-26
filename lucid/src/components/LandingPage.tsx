import { motion } from 'framer-motion';
import { ArrowRight, Shield, Heart, Brain, Users, Mountain, Star, Zap, Globe, Target, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const tierInfo = [
  {
    tier: '01',
    name: 'BODY ALIVE',
    timeframe: 'Minutes',
    description: 'The non-negotiables. What stands between the body and extinction.',
    icon: Heart,
    color: 'from-red-500 to-red-700',
  },
  {
    tier: '02',
    name: 'BODY STABLE',
    timeframe: 'Hours',
    description: 'Stabilization within hours. Water, shelter, and the basics of wound management.',
    icon: Shield,
    color: 'from-orange-500 to-orange-700',
  },
  {
    tier: '03',
    name: 'BODY SUSTAINED',
    timeframe: 'Days',
    description: 'Sustenance over days. Nutrition, sleep architecture, and physical recovery systems.',
    icon: Target,
    color: 'from-amber-500 to-amber-700',
  },
  {
    tier: '04',
    name: 'ENVIRONMENT SECURE',
    timeframe: 'Weeks',
    description: 'Environmental fortification. Safety infrastructure, stable housing, grid resilience.',
    icon: Shield,
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    tier: '05',
    name: 'BODY & PLEASURE',
    timeframe: 'Weeks–Months',
    description: 'Sensory restoration. Touch, comfort protocols, and deliberate pleasure engineering.',
    icon: Star,
    color: 'from-green-500 to-green-700',
  },
  {
    tier: '06',
    name: 'SOCIAL & EMOTIONAL',
    timeframe: 'Months',
    description: 'Relational infrastructure. Belonging mechanisms, emotional safety, secure communication channels.',
    icon: Users,
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    tier: '07',
    name: 'STATUS & AGENCY',
    timeframe: 'Months–Years',
    description: 'Autonomy architecture. Mastery development, financial sovereignty, decision-making power.',
    icon: Zap,
    color: 'from-teal-500 to-teal-700',
  },
  {
    tier: '08',
    name: 'MIND STIMULATED',
    timeframe: 'Ongoing',
    description: 'Cognitive expansion. Discovery frameworks, deep learning systems, paradigm shift catalysts.',
    icon: Brain,
    color: 'from-blue-500 to-blue-700',
  },
  {
    tier: '09',
    name: 'SENSES & EXCITEMENT',
    timeframe: 'Ongoing',
    description: 'Awe procurement. Uncharted coordinates, pristine audio, peak sensory input vectors.',
    icon: Mountain,
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    tier: '10',
    name: 'SELF & MEANING',
    timeframe: 'Years',
    description: 'The longest game. Purpose construction, legacy design, highest-impact contribution.',
    icon: Globe,
    color: 'from-purple-500 to-purple-700',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15; // Very subtle volume
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto relative">
      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700 transition-all"
        aria-label={isMuted ? 'Enable ambient sound' : 'Disable ambient sound'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-400" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] tracking-wider mb-6">
            LUCID
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-mono text-lg md:text-xl text-gray-400 uppercase tracking-wide mb-12"
          >
            Cut the noise. Keep what's essential.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
          >
            A curated hierarchy of what truly matters—from survival essentials to self-actualization. 
            Every product, experience, and location rigorously scored for maximum impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-gray-500 text-sm font-mono"
          >
            Scroll down to explore the hierarchy
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl mb-12 text-center"
          >
            The Logic
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 p-6 rounded-lg border border-gray-800"
            >
              <h3 className="font-mono text-sm uppercase tracking-wider text-gray-400 mb-3">
                Maslow Meets Data
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We adapted Maslow's hierarchy into 10 actionable tiers, each with specific timeframes and measurable outcomes. 
                Bottom tiers must be secured before upper tiers provide value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 p-6 rounded-lg border border-gray-800"
            >
              <h3 className="font-mono text-sm uppercase tracking-wider text-gray-400 mb-3">
                Three Modalities
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Products:</strong> Physical tools scored on efficacy, build quality, and expert consensus.<br/>
                <strong className="text-white">Experiences:</strong> Transformative activities measured by impact and uniqueness.<br/>
                <strong className="text-white">Locations:</strong> Destinations evaluated for beauty, accessibility, and safety.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 p-6 rounded-lg border border-gray-800"
            >
              <h3 className="font-mono text-sm uppercase tracking-wider text-gray-400 mb-3">
                Rigorous Scoring
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Every item is scored 0-100 across three modality-specific metrics. 
                Only items scoring 80+ make the cut. No filler. No compromises.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-400 italic max-w-2xl mx-auto">
              "You can't optimize your life if you're dead. Start at Tier 1. Build upward."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tiers Preview Section */}
      <section className="py-24 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl mb-4 text-center"
          >
            The 10 Tiers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          >
            Each tier represents a fundamental human need with specific products, experiences, and locations curated for maximum effectiveness.
          </motion.p>

          <div className="grid gap-4">
            {tierInfo.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-gray-900/30 hover:bg-gray-900/60 border border-gray-800 hover:border-gray-700 rounded-lg p-6 transition-all"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${tier.color} rounded-l-lg`} />
                  
                  <div className="flex items-start gap-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-mono text-xs text-gray-500">{tier.timeframe}</span>
                        <h3 className="font-bold text-lg">
                          <span className="text-gray-500 mr-2">{tier.tier}</span>
                          {tier.name}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl mb-12 text-center"
          >
            How To Use This
          </motion.h2>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex gap-6"
            >
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Start From The Bottom</h3>
                <p className="text-gray-400 leading-relaxed">
                  Secure Tier 1 (survival gear) before optimizing Tier 10 (meaning). 
                  A broken leg doesn't care about your life purpose—address immediate threats first.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Filter By Modality</h3>
                <p className="text-gray-400 leading-relaxed">
                  Use the sidebar to filter by Product, Experience, or Location depending on what you need. 
                  Budget filters help match your current resources.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-6"
            >
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Read The Justifications</h3>
                <p className="text-gray-400 leading-relaxed">
                  Click any card to see detailed reasoning, source citations, and why this specific item made the cut. 
                  We show our work.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-6"
            >
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Take Action</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every item includes affiliate links to purchase or learn more. 
                  We only recommend what we'd use ourselves—revenue supports ongoing research.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl mb-6"
          >
            Ready To Build Your Foundation?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-8"
          >
            Enter the hierarchy. Start where you are. Build upward.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={onEnter}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
          >
            Enter The Hierarchy
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-4">
            LUCID — The hierarchy of what matters.
          </p>
          <p className="text-xs">
            Affiliate links support our research. We only recommend items that meet our rigorous standards.
          </p>
        </div>
      </footer>
    </div>
  );
};

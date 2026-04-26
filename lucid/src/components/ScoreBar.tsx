import type { LucidItem } from '../types';

interface ScoreBarProps {
  item: LucidItem;
}

const getScoreColor = (score: number): string => {
  if (score >= 95) return 'bg-score-green';
  if (score >= 80) return 'bg-score-lime';
  if (score >= 60) return 'bg-score-amber';
  return 'bg-score-red';
};

const getMetricLabel = (key: string): string => {
  const labels: Record<string, string> = {
    efficacy: 'Efficacy',
    buildQuality: 'Build',
    consensus: 'Consensus',
    impact: 'Impact',
    transformation: 'Transform',
    uniqueness: 'Unique',
    beauty: 'Beauty',
    accessibility: 'Access',
    safety: 'Safety',
  };
  return labels[key] || key;
};

export const ScoreBar: React.FC<ScoreBarProps> = ({ item }) => {
  const scores = item.scores;
  
  // Determine which metrics to show based on modality
  let metrics: Array<{ key: string; value?: number }> = [];
  
  if (item.modality === 'product') {
    metrics = [
      { key: 'efficacy', value: scores.efficacy },
      { key: 'buildQuality', value: scores.buildQuality },
      { key: 'consensus', value: scores.consensus },
    ];
  } else if (item.modality === 'experience') {
    metrics = [
      { key: 'impact', value: scores.impact },
      { key: 'transformation', value: scores.transformation },
      { key: 'uniqueness', value: scores.uniqueness },
    ];
  } else if (item.modality === 'location') {
    metrics = [
      { key: 'beauty', value: scores.beauty },
      { key: 'accessibility', value: scores.accessibility },
      { key: 'safety', value: scores.safety },
    ];
  }
  
  // Filter out undefined values and calculate average for display
  const validMetrics = metrics.filter(m => m.value !== undefined);
  const avgScore = validMetrics.length > 0 
    ? Math.round(validMetrics.reduce((sum, m) => sum + (m.value || 0), 0) / validMetrics.length)
    : item.overallScore;
  
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 flex gap-1 h-2">
        {validMetrics.map((metric) => (
          <div
            key={metric.key}
            className={`h-full ${getScoreColor(metric.value || 0)}`}
            style={{ width: `${(metric.value || 0) / 3}%` }}
            title={`${getMetricLabel(metric.key)}: ${metric.value}`}
          />
        ))}
      </div>
      <span className="font-mono text-lg font-bold text-text-primary-light dark:text-text-primary">
        {avgScore}
      </span>
    </div>
  );
};

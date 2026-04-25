interface ScoreBarProps {
  efficacy: number;
  buildQuality: number;
  consensus: number;
  overallScore: number;
}

const getScoreColor = (score: number): string => {
  if (score >= 95) return 'bg-score-green';
  if (score >= 80) return 'bg-score-lime';
  if (score >= 60) return 'bg-score-amber';
  return 'bg-score-red';
};

export const ScoreBar: React.FC<ScoreBarProps> = ({
  efficacy,
  buildQuality,
  consensus,
  overallScore,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 flex gap-1 h-2">
        <div
          className={`h-full ${getScoreColor(efficacy)}`}
          style={{ width: `${efficacy / 3}%` }}
          title={`Efficacy: ${efficacy}`}
        />
        <div
          className={`h-full ${getScoreColor(buildQuality)}`}
          style={{ width: `${buildQuality / 3}%` }}
          title={`Build Quality: ${buildQuality}`}
        />
        <div
          className={`h-full ${getScoreColor(consensus)}`}
          style={{ width: `${consensus / 3}%` }}
          title={`Consensus: ${consensus}`}
        />
      </div>
      <span className="font-mono text-lg font-bold text-text-primary-light dark:text-text-primary">
        {overallScore}
      </span>
    </div>
  );
};

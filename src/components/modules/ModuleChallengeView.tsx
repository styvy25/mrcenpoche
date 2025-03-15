
import DailyChallenge from "@/components/challenge/DailyChallenge";
import UpcomingEventsWidget from "@/components/challenge/UpcomingEventsWidget";

interface ModuleChallengeViewProps {
  onChallengeComplete: () => void;
}

const ModuleChallengeView = ({ onChallengeComplete }: ModuleChallengeViewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Défi quotidien</h2>
        <DailyChallenge onComplete={onChallengeComplete} />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-6">Formations</h2>
        <UpcomingEventsWidget />
      </div>
    </div>
  );
};

export default ModuleChallengeView;

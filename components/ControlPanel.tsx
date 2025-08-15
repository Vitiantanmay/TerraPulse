import type { LayerToggles } from '../types';

interface ControlPanelProps {
  toggles: LayerToggles;
  onToggle: (layer: keyof LayerToggles) => void;
}

const Toggle = ({ label, isChecked, onToggle, accentColor }: { label: string; isChecked: boolean; onToggle: () => void; accentColor: string }) => (
  <label className="flex items-center justify-between cursor-pointer my-2">
    <span className="text-gray-300 text-sm font-medium">{label}</span>
    <div className="relative">
      <input type="checkbox" className="sr-only" checked={isChecked} onChange={onToggle} />
      <div className={`block w-10 h-6 rounded-full transition-colors ${isChecked ? accentColor : 'bg-gray-600'}`}></div>
      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isChecked ? 'translate-x-4' : ''}`}></div>
    </div>
  </label>
);

const ControlPanel = ({ toggles, onToggle }: ControlPanelProps) => {
  const layers: { key: keyof LayerToggles; label: string; color: string }[] = [
    { key: 'earthquakes', label: 'Earthquakes', color: 'bg-orange-500' },
    { key: 'iss', label: 'ISS', color: 'bg-cyan-400' },
    { key: 'flights', label: 'Flights (Simulated)', color: 'bg-yellow-400' },
    { key: 'ships', label: 'Ships (Simulated)', color: 'bg-blue-500' },
    { key: 'wildlife', label: 'Wildlife (Simulated)', color: 'bg-green-500' },
    { key: 'dayNightOverlay', label: 'Day/Night Overlay', color: 'bg-purple-500' },
  ];

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-4 z-[1000] bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg shadow-2xl border border-cyan-500/20 w-64">
      <h2 className="text-lg font-bold text-cyan-300 mb-2 border-b border-cyan-500/30 pb-2">Data Layers</h2>
      {layers.map(layer => (
        <Toggle
          key={layer.key}
          label={layer.label}
          isChecked={toggles[layer.key]}
          onToggle={() => onToggle(layer.key)}
          accentColor={layer.color}
        />
      ))}
    </div>
  );
};

export default ControlPanel;

import type { EventData } from '../types';

interface DetailsSidebarProps {
  event: EventData | null;
  onClose: () => void;
}

const DetailsSidebar = ({ event, onClose }: DetailsSidebarProps) => {
  const typeStyles: Record<string, { bg: string, text: string, icon: string }> = {
    Earthquake: { bg: 'bg-orange-500/20', text: 'text-orange-300', icon: '🌋' },
    ISS: { bg: 'bg-cyan-500/20', text: 'text-cyan-300', icon: '🛰️' },
    Flight: { bg: 'bg-yellow-500/20', text: 'text-yellow-300', icon: '✈️' },
    Ship: { bg: 'bg-blue-500/20', text: 'text-blue-300', icon: '🚢' },
    Wildlife: { bg: 'bg-green-500/20', text: 'text-green-300', icon: '🐾' },
  };

  const style = event ? typeStyles[event.type] : { bg: '', text: '', icon: '' };

  return (
    <div
      className={`absolute top-0 right-0 h-full z-[1100] bg-gray-900/80 backdrop-blur-md shadow-2xl border-l border-cyan-500/20 w-80 transform transition-transform duration-300 ease-in-out ${
        event ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {event && (
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${style.bg} ${style.text}`}>
                {style.icon} {event.type}
              </span>
              <h2 className="text-xl font-bold text-gray-100 mt-2">{event.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full p-2 transition-colors"
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 border-t border-gray-700 pt-4 flex-grow overflow-y-auto">
            <ul className="space-y-3">
              {Object.entries(event.details).map(([key, value]) => (
                <li key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400">{key}:</span>
                  <span className="text-gray-200 font-medium text-right">{value}</span>
                </li>
              ))}
               <li className="flex justify-between text-sm">
                  <span className="text-gray-400">Coords:</span>
                  <span className="text-gray-200 font-medium text-right">{event.coords.lat.toFixed(4)}, {event.coords.lng.toFixed(4)}</span>
                </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsSidebar;

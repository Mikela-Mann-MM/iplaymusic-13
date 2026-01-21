

interface VinylRecordProps {
  isPlaying: boolean;
  albumArt?: string;
}

export default function VinylRecord({ isPlaying, albumArt }: VinylRecordProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {albumArt ? (
        // Album art mode
        <div className="relative w-full h-full">
          <img
            src={albumArt}
            alt="Album artwork"
            className={`w-full h-full object-cover rounded-lg shadow-2xl ${
              isPlaying ? 'animate-pulse' : ''
            }`}
          />
        </div>
      ) : (
        // Vinyl disc mode
        <div
          className={`w-[85%] h-[85%] rounded-full bg-linear-to-br from-gray-800 to-gray-900 shadow-2xl ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          {/* Vinyl grooves effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
            }}
          />

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[35%] h-[35%] rounded-full bg-linear-to-br from-primary-pink to-primary-orange relative">
              {/* Inner rings */}
              <div className="absolute inset-[20%] rounded-full border-2 border-white/20" />
              <div className="absolute inset-[35%] rounded-full border-2 border-white/10" />
              {/* Center hole */}
              <div className="absolute inset-[45%] rounded-full bg-gray-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
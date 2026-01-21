

interface TrackInfoProps {
  trackName: string;
  artistName: string;
  albumName?: string;
}

export default function TrackInfo({ trackName, artistName, albumName }: TrackInfoProps) {
  return (
    <div className="text-center">
      <h1 className="text-[2rem] font-bold text-gray-900 dark:text-white mb-2">
        {trackName}
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        {artistName}
      </p>
      {albumName && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {albumName}
        </p>
      )}
    </div>
  );
}
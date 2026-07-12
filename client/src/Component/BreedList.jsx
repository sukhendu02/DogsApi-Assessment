import BreedCard from './BreedCard';

export default function BreedList({ breeds, query, loading, error, ...handlers }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin mb-3" />
        <p className="text-sm">Loading breeds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-red-600 mb-2">Failed to load breeds</p>
        <p className="text-xs text-gray-400">{error}</p>
      </div>
    );
  }

  if (breeds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-gray-500 mb-1">
          {query ? `No breeds match "${query}"` : 'No breeds yet'}
        </p>
        <p className="text-xs text-gray-400">
          {query ? 'Try a different search.' : 'Add one to get started.'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {breeds.map((breed) => (
        <BreedCard key={breed.id} breed={breed} {...handlers} />
      ))}
    </div>
  );
}

import { useState } from 'react';
import SubBreedItem from './SubBreedItem';
import { CircleChevronRight, SquareChevronRight } from 'lucide-react';

export default function BreedCard({ breed, onRenameBreed, onDeleteBreed, onAddSubBreed, onRenameSubBreed, onDeleteSubBreed }) {
  const [expanded, setExpanded] = useState(false);
  const [editingBreed, setEditingBreed] = useState(false);
  const [breedName, setBreedName] = useState(breed.name);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [addingSub, setAddingSub] = useState(false);
  const [newSubName, setNewSubName] = useState('');

  const subBreeds = breed.SubBreeds ?? [];

  const submitBreedRename = (e) => {
    e.preventDefault();
    const trimmed = breedName.trim();
    if (!trimmed) return;
    onRenameBreed(breed.id, trimmed);
    setEditingBreed(false);
  };

  const submitAddSub = (e) => {
    e.preventDefault();
    const trimmed = newSubName.trim();
    if (!trimmed) return;
    onAddSubBreed(breed.id, trimmed);
    setNewSubName('');
    setAddingSub(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border my-2 border-gray-100  overflow-hidden transition-shadow hover:shadow-md">
      {/* Breed header row */}
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center cursor-pointer gap-2 flex-1 text-left h-11 -my-1 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span
            className={`text-indigo-400 text-xs transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          >
            <CircleChevronRight/>
          </span>
          {editingBreed ? (
            <form onSubmit={submitBreedRename} className="flex items-center gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
              <input
                autoFocus
                value={breedName}
                
                onChange={(e) => setBreedName(e.target.value)}
                className="flex-1 h-9 px-2 text-sm font-medium border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
              <button type="submit" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 px-2 h-9">Save</button>
              <button type="button" onClick={() => { setEditingBreed(false); setBreedName(breed.name); }} className="text-xs font-medium text-gray-500 hover:text-gray-700 px-2 h-9">Cancel</button>
            </form>
          ) : (
            <span className="text-base font-semibold text-gray-900 capitalize">{breed.name}</span>
          )}
          {!editingBreed && (
            <span className="text-xs text-gray-400 font-normal ml-1">
              {subBreeds.length} {subBreeds.length === 1 ? 'sub-breed' : 'sub-breeds'}
            </span>
          )}
        </button>

        {!editingBreed && !confirmingDelete && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setEditingBreed(true)}
              className="cursor-pointer text-xs font-medium text-gray-500 hover:text-indigo-600 px-2.5 h-9 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setConfirmingDelete(true)}
              className="cursor-pointer text-xs font-medium text-gray-500 hover:text-red-600 px-2.5 h-9 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        {confirmingDelete && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-gray-600 hidden sm:inline">Delete?</span>
            <button
              onClick={() => { onDeleteBreed(breed.id); setConfirmingDelete(false); }}
              className="cursor-pointer text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-2.5 h-8 rounded-lg transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700 px-2.5 h-8"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* Sub-breeds panel */}
      {expanded && (
        <div className="px-4 pb-4 pl-10 border-t border-gray-50">
          {subBreeds.length === 0 && !addingSub && (
            <p className="text-sm text-gray-400 py-3 italic">No sub-breeds yet.</p>
          )}

          {subBreeds.length > 0 && (
            <ul className="py-1">
              {subBreeds.map((sb) => (
                <SubBreedItem
                  key={sb.id}
                  subBreed={sb}
                  onRename={onRenameSubBreed}
                  onDelete={onDeleteSubBreed}
                />
              ))}
            </ul>
          )}

          {addingSub ? (
            <form onSubmit={submitAddSub} className="flex items-center gap-2 mt-2">
              <input
                autoFocus
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                placeholder="Sub-breed name"
                className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              />
              <button type="submit" className="cursor-pointer text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-700 px-3 h-9 rounded-lg transition-colors">
                Add
              </button>
              <button type="button" onClick={() => { setAddingSub(false); setNewSubName(''); }} className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700 px-2 h-9">
                Cancel
              </button>
            </form>
          ) : (
            <button
              onClick={() => setAddingSub(true)}
              className="mt-2 text-sm font-medium text-indigo-500 hover:text-indigo-700 h-9 px-2 -ml-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              + Add sub-breed
            </button>
          )}
        </div>
      )}
    </div>
  );
}

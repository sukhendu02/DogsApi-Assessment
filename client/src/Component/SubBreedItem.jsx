import { LineDotRightHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function SubBreedItem({ subBreed, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(subBreed.name);
  const [confirming, setConfirming] = useState(false);

  const submitRename = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onRename(subBreed.id, trimmed);
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="flex items-center gap-2 py-1.5">
        <form onSubmit={submitRename} className="flex items-center gap-2 flex-1">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 h-9 px-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button type="submit" className=" cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700 px-2 h-9">
            Save
          </button>
          <button
            type="button"
            onClick={() => { setEditing(false); setName(subBreed.name); }}
            className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700 px-2 h-9"
          >
            Cancel
          </button>
        </form>
      </li>
    );
  }

  if (confirming) {
    return (
      <li className="flex items-center gap-2 py-1.5">
        <span className="text-sm text-gray-600 flex-1">Delete "{subBreed.name}"?</span>
        <button
          onClick={() => { onDelete(subBreed.id); setConfirming(false); }}
          className="cursor-pointer text-xs font-medium text-white bg-red-600 hover:bg-red-700 px-2.5 h-8 rounded-lg transition-colors"
        >
          Delete
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="cursor-pointer text-xs font-medium text-gray-500 hover:text-gray-700 px-2.5 h-8"
        >
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li className="group flex items-center gap-2 py-1.5 border-2 border-gray-100 m-3 p-3 rounded-2xl">
      {/* <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" /> */}
      <LineDotRightHorizontal className='text-indigo-500'/>
      <span className="text-sm text-gray-700 font-semibold my-2 flex-1 capitalize ">{subBreed.name}</span>
      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditing(true)}
          className=" cursor-pointer text-xs font-medium text-gray-500 hover:text-blue-600 px-2 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => setConfirming(true)}
          className=" cursor-pointer text-xs font-medium text-gray-500 hover:text-red-600 px-2 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

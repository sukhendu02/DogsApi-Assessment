import { useState,useEffect } from 'react'
import './App.css'

import {
  getBreeds,
  createBreed,
  updateBreed,
  deleteBreed,
  createSubBreed,
  updateSubBreed,
  deleteSubBreed,
} from "./api";

import BreedList from './Component/BreedList';
import Modal from './Component/Modal';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import SearchBar from './Component/SearchBar';
import { Megaphone } from 'lucide-react';

function App() {

const [error, setError] = useState(null);

   const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [newBreedName, setNewBreedName] = useState("");
    const [query, setQuery] = useState('');
  

  // GET ALL THE BREED 
   const fetchData = async (search="") => {
    try {
          setLoading(true);
  
      const data = await getBreeds(search);
      console.log(data.breeds)
      setBreeds(data.breeds);
    } catch (err) {
      setError('Failed to load breeds');
    }
    finally{
      setLoading(false)
    }
  };

   useEffect(() => {
    fetchData(query);
  },[query]);

  // ADD BREED
   const handleAddBreed = async (name) => {
    try {
      const created = await createBreed(name);
      setBreeds((prev) => [...prev, created]);
      toast.success('Breed added');
      await fetchData();
    } catch (e) {
      toast.error(e?.response?.data?.error?.message, 'Failed to add Breed');
    }
  };

    const submitAddBreed = (e) => {
    e.preventDefault();
    const trimmed = newBreedName.trim();
    if(trimmed===""){

       toast.error("Breed name cannot be empty")
    }
    if (!trimmed)  return;
    
    handleAddBreed(trimmed);
    setNewBreedName('');
    setAddOpen(false);
  };


  // ---------- UPDATE BREED ----------
    const handleUpdateBreed = async (id, name) => {
    const prev = breeds;
    setBreeds((cur) => cur.map((b) => (b.id === id ? { ...b, name } : b)));
    try {
      await updateBreed(id, name);
      toast.success("Updated successfully")
    } catch (e) {
      setBreeds(prev);
      toast.error(e?.response?.data?.error?.message, 'Failed to update');
    }
  };

  // HANDLE DELETE BREED
   const handleDeleteBreed = async (id) => {
    const prev = breeds;
    setBreeds((cur) => cur.filter((b) => b.id !== id));
    try {
      await deleteBreed(id);
      toast.success('Breed deleted');
    } catch (e) {
      setBreeds(prev);
      toast.error(e?.response?.data?.error?.message, 'Failed to Delete');
    }
  };

// ADD SUB-BREED
  const handleAddSubBreed = async (breedId, name) => {
    try {
      const created = await createSubBreed(breedId, name);
      
      setBreeds((cur) =>
        cur.map((b) =>
          b.id === breedId ? { ...b, SubBreeds: [...(b.SubBreeds ?? []), created.subBreed] } : b,
        ),
      );
      toast.success('Sub-breed added');
    } catch (e) {
      toast.error(e?.response?.data?.error?.message, 'Failed to add Sub-Breed');
    }
  };

  // UPDATE SUB-BREED
    const handleRenameSubBreed = async (id, name) => {
    const prev = breeds;
    setBreeds((cur) =>
      cur.map((b) => ({
        ...b,
        SubBreeds: (b.SubBreeds ?? []).map((sb) => (sb.id === id ? { ...sb, name } : sb)),
      })),
    );
    try {
      await updateSubBreed(id, name);
      toast.success('Sub-breed updated');
    } catch (e) {
      setBreeds(prev);
      toast.error(e?.response?.data?.error?.message, 'Failed to add Sub-Breed');
    }
  };

// DELETE SUB-BREED
   const handleDeleteSubBreed = async (id) => {
    const prev = breeds;
    setBreeds((cur) =>
      cur.map((b) => ({
        ...b,
        SubBreeds: (b.SubBreeds ?? []).filter((sb) => sb.id !== id),
      })),
    );
    try {
      await deleteSubBreed(id);
      toast.success('Sub-breed deleted');
    } catch (e) {
      setBreeds(prev);
     toast.error(e?.response?.data?.error?.message, 'Failed to add Sub-Breed');

    }
  };

  const filtered = query
    ? breeds.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    : breeds;

  return (
    <>
    <div>
      <div><Toaster/></div>
    </div>

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-indigo-900">Dogs API</h1>
              <p className="text-xs text-gray-500 mt-0.5">Manage breeds and sub-breeds</p>
            </div>
            <button
              onClick={() => setAddOpen(true)}
              className="h-10 px-4 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="text-base leading-none">+</span> Add Breed
            </button>
          </div>
        </div>

      <div className='text-center mb-2'>
        <SearchBar className="" value={query} onChange={setQuery} />
      </div>
      </header>
  

  <main className="max-w-2xl mx-auto px-4 py-6">
    <p className='text-xs text-gray-500 font-semibold mb-2'>
     <Megaphone className='inline'/> Click to view Sub-Breeds
    </p>
        <BreedList
          breeds={breeds}
          query={query}
          loading={loading}
          error={error}
          onRenameBreed={handleUpdateBreed}
          onDeleteBreed={handleDeleteBreed}
          onAddSubBreed={handleAddSubBreed}
          onRenameSubBreed={handleRenameSubBreed}
          onDeleteSubBreed={handleDeleteSubBreed}
        />
      </main>


       {/* Add Breed modal */}
      <Modal open={addOpen} title="Add Breed" onClose={() => setAddOpen(false)}>
        <form onSubmit={submitAddBreed}>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Breed name</label>
          <input
            autoFocus
            value={newBreedName}
            onChange={(e) => setNewBreedName(e.target.value)}
            placeholder="e.g. retriever"
            className="w-full h-11 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
          />
          {/* <p className='text-xs text-red-500'>{error}</p> */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="h-10 px-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default App

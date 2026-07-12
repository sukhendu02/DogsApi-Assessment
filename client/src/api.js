import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1`;

// Breeds
export const getBreeds = async (search="") => {
  const res = await axios.get(`${API_BASE}/breed`,{
    params:{search},
  });
  return res.data;
};

export const createBreed = async (name) => {
  const res = await axios.post(`${API_BASE}/breed`, { name });
  return res.data;
};

export const updateBreed = async (id, name) => {
  const res = await axios.patch(`${API_BASE}/breed/${id}`, { name });
  return res.data;
};

export const deleteBreed = async (id) => {
  await axios.delete(`${API_BASE}/breed/${id}`);
};

// Sub-breed
export const createSubBreed = async (breedId, name) => {
  const res = await axios.post(`${API_BASE}/breed/${breedId}/subbreeds`, { name });
  return res.data;
};

export const updateSubBreed = async (id, name) => {
  const res = await axios.patch(`${API_BASE}/subbreed/${id}`, { name });
  return res.data;
};

export const deleteSubBreed = async (id) => {
  await axios.delete(`${API_BASE}/subbreed/${id}`);
};
import React, { useEffect, useState } from 'react';
import { craftsAPI } from '../services/api';
import { FaTrash } from 'react-icons/fa';

export default function YourSelling(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{ fetchMine(); }, []);

  const fetchMine = async () => {
    try{
      setLoading(true);
      const res = await craftsAPI.getAll({ mine: 'true' });
      setItems(res.data || []);
    }catch(err){
      console.error(err);
      setError('Failed to load your items');
    }finally{ setLoading(false); }
  };

  const remove = async (id) => {
    if (!confirm('Remove this product?')) return;
    try{
      await craftsAPI.delete(id);
      fetchMine();
      alert('Removed');
    }catch(err){ console.error(err); alert('Delete failed'); }
  };

  if (loading) return <div className="py-12 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Selling</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {items.length === 0 ? (
        <div className="text-gray-600">You are not selling anything yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(it=> (
            <div key={it._id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{it.title || it.name}</h3>
                  <div className="text-sm text-gray-600">{it.origin || (it.originCity && it.originState ? `${it.originCity}, ${it.originState}` : '')}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-600">${it.price}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{it.description}</p>
              {it.paymentScanner && (
                <div className="mb-3">
                  <img src={it.paymentScanner} alt="scanner" className="w-28 h-28 object-cover rounded" />
                </div>
              )}
              <div className="flex justify-end">
                <button onClick={()=>remove(it._id)} className="text-red-600 px-3 py-1 rounded border flex items-center gap-2"><FaTrash /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

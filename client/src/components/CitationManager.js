import React, { useState, useEffect } from 'react';

function CitationManager() {
  const [citations, setCitations] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [journal, setJournal] = useState('');
  const [doi, setDoi] = useState('');

  useEffect(() => {
    fetch('/api/citations')
      .then(res => res.json())
      .then(data => setCitations(data))
      .catch(() => {});
  }, []);

  const addCitation = async () => {
    if (!title) return;
    const res = await fetch('/api/citations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, year: Number(year), journal, doi }),
    });
    const c = await res.json();
    setCitations([...citations, c]);
    setTitle(''); setAuthor(''); setYear(''); setJournal(''); setDoi('');
  };

  const deleteCitation = async (id) => {
    await fetch(`/api/citations/${id}`, { method: 'DELETE' });
    setCitations(citations.filter(c => c._id !== id));
  };

  return (
    <div>
      <h2>Citation Manager</h2>
      <div className="card">
        <div className="grid-2">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
          <input value={year} onChange={e => setYear(e.target.value)} type="number" placeholder="Year" />
          <input value={journal} onChange={e => setJournal(e.target.value)} placeholder="Journal" />
        </div>
        <input value={doi} onChange={e => setDoi(e.target.value)} placeholder="DOI" />
        <button className="btn btn-primary" onClick={addCitation}>Add Citation</button>
      </div>
      <div className="card">
        {citations.map(c => (
          <div key={c._id} className="citation-item">
            <h4>{c.title}</h4>
            <p>{c.author} ({c.year}) &middot; {c.journal}</p>
            {c.doi && <p className="doi">DOI: {c.doi}</p>}
            <button className="btn btn-danger" style={{ marginTop: 6 }} onClick={() => deleteCitation(c._id)}>Delete</button>
          </div>
        ))}
        {citations.length === 0 && <div className="empty-state"><h3>No citations yet</h3></div>}
      </div>
    </div>
  );
}

export default CitationManager;

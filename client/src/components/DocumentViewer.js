import React, { useState, useEffect } from 'react';

function DocumentViewer() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');

  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => setDocuments(data))
      .catch(() => {});
  }, []);

  const uploadDoc = async () => {
    if (!title) return;
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: '000000000000000000000001', title, fileUrl, uploadedBy }),
    });
    const doc = await res.json();
    setDocuments([...documents, doc]);
    setTitle(''); setFileUrl(''); setUploadedBy('');
  };

  const deleteDoc = async (id) => {
    await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    setDocuments(documents.filter(d => d._id !== id));
  };

  return (
    <div>
      <h2>Documents</h2>
      <div className="card">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Document title" />
        <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="File URL" />
        <input value={uploadedBy} onChange={e => setUploadedBy(e.target.value)} placeholder="Uploaded by" />
        <button className="btn btn-primary" onClick={uploadDoc}>Upload Document</button>
      </div>
      <div className="card">
        {documents.map(doc => (
          <div key={doc._id} className="doc-item">
            <div className="info">
              <h4>{doc.title}</h4>
              <p>Uploaded by {doc.uploadedBy || 'Unknown'} &middot; {new Date(doc.uploadedAt).toLocaleDateString()}</p>
              {doc.fileUrl && <a href={doc.fileUrl} target="_blank" rel="noreferrer" style={{ color: '#3498db', fontSize: '0.85rem' }}>View file</a>}
            </div>
            <button className="btn btn-danger" onClick={() => deleteDoc(doc._id)}>Delete</button>
          </div>
        ))}
        {documents.length === 0 && <div className="empty-state"><h3>No documents yet</h3></div>}
      </div>
    </div>
  );
}

export default DocumentViewer;

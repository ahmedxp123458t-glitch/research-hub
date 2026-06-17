import React, { useState, useEffect } from 'react';

function ProgressTracker() {
  const [milestones, setMilestones] = useState([]);
  const [milestone, setMilestone] = useState('');
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetch('/api/progress')
      .then(res => res.json())
      .then(data => setMilestones(data))
      .catch(() => {});
  }, []);

  const addMilestone = async () => {
    if (!milestone) return;
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: '000000000000000000000001', milestone, percentage }),
    });
    const m = await res.json();
    setMilestones([...milestones, m]);
    setMilestone(''); setPercentage(0);
  };

  const updateProgress = async (id, pct) => {
    const res = await fetch(`/api/progress/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ percentage: pct }),
    });
    const updated = await res.json();
    setMilestones(milestones.map(m => (m._id === id ? updated : m)));
  };

  const overall = milestones.length ? Math.round(milestones.reduce((s, m) => s + m.percentage, 0) / milestones.length) : 0;

  return (
    <div>
      <h2>Progress Tracker</h2>
      <div className="card">
        <div className="progress-bar-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span>Overall Progress</span>
            <span>{overall}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: overall + '%' }}>{overall}%</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="grid-2">
          <input value={milestone} onChange={e => setMilestone(e.target.value)} placeholder="Milestone name" />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <input type="range" min="0" max="100" value={percentage} onChange={e => setPercentage(Number(e.target.value))} />
            <span>{percentage}%</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={addMilestone}>Add Milestone</button>
      </div>
      {milestones.map(m => (
        <div key={m._id} className="card milestone-item">
          <span className="name">{m.milestone}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="range" min="0" max="100" value={m.percentage} onChange={e => updateProgress(m._id, Number(e.target.value))} style={{ width: 150 }} />
            <span className="percentage">{m.percentage}%</span>
          </div>
        </div>
      ))}
      {milestones.length === 0 && <div className="empty-state"><h3>No milestones yet</h3></div>}
    </div>
  );
}

export default ProgressTracker;

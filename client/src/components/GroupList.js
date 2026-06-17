import React, { useState, useEffect } from 'react';

function GroupList() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');

  useEffect(() => {
    fetch('/api/groups')
      .then(res => res.json())
      .then(data => setGroups(data))
      .catch(() => {});
  }, []);

  const createGroup = async () => {
    if (!name) return;
    const res = await fetch('/api/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, members: members.split(',').map(m => m.trim()).filter(Boolean) }),
    });
    const group = await res.json();
    setGroups([...groups, group]);
    setName(''); setDescription(''); setMembers('');
  };

  const deleteGroup = async (id) => {
    await fetch(`/api/groups/${id}`, { method: 'DELETE' });
    setGroups(groups.filter(g => g._id !== id));
  };

  return (
    <div>
      <h2>Research Groups</h2>
      <div className="card">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Group name" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <input value={members} onChange={e => setMembers(e.target.value)} placeholder="Members (comma separated)" />
        <button className="btn btn-primary" onClick={createGroup}>Create Group</button>
      </div>
      <div className="grid-3">
        {groups.map(g => (
          <div key={g._id} className="group-card">
            <h4>{g.name}</h4>
            <p>{g.description}</p>
            <div className="members">
              {g.members?.map((m, i) => <span key={i} className="member-tag">{m}</span>)}
            </div>
            <button className="btn btn-danger" style={{ marginTop: 10 }} onClick={() => deleteGroup(g._id)}>Delete</button>
          </div>
        ))}
        {groups.length === 0 && <div className="empty-state"><h3>No groups yet</h3></div>}
      </div>
    </div>
  );
}

export default GroupList;

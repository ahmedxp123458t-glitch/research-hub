import React, { useState, useEffect } from 'react';

function DiscussionBoard() {
  const [discussions, setDiscussions] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('User');
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    fetch('/api/discussions')
      .then(res => res.json())
      .then(data => setDiscussions(data))
      .catch(() => {});
  }, []);

  const postDiscussion = async () => {
    if (!message) return;
    const res = await fetch('/api/discussions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupId: '000000000000000000000001', userId, message }),
    });
    const disc = await res.json();
    setDiscussions([disc, ...discussions]);
    setMessage('');
  };

  const postReply = async (id) => {
    if (!replyText[id]) return;
    const res = await fetch(`/api/discussions/${id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, text: replyText[id] }),
    });
    const updated = await res.json();
    setDiscussions(discussions.map(d => (d._id === id ? updated : d)));
    setReplyText({ ...replyText, [id]: '' });
  };

  return (
    <div>
      <h2>Discussion Board</h2>
      <div className="card">
        <input value={userId} onChange={e => setUserId(e.target.value)} placeholder="Your name" style={{ width: 200 }} />
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Start a discussion..." />
        <button className="btn btn-primary" onClick={postDiscussion}>Post</button>
      </div>
      {discussions.map(d => (
        <div key={d._id} className="card discussion-item">
          <div className="header">
            <span className="user">{d.userId}</span>
            <span className="time">{new Date(d.createdAt).toLocaleString()}</span>
          </div>
          <div className="message">{d.message}</div>
          <div className="replies">
            {d.replies?.map((r, i) => (
              <div key={i} className="reply">
                <span className="user">{r.userId}</span>: {r.text}
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input value={replyText[d._id] || ''} onChange={e => setReplyText({ ...replyText, [d._id]: e.target.value })} placeholder="Reply..." />
              <button className="btn btn-secondary" onClick={() => postReply(d._id)}>Reply</button>
            </div>
          </div>
        </div>
      ))}
      {discussions.length === 0 && <div className="empty-state"><h3>No discussions yet</h3></div>}
    </div>
  );
}

export default DiscussionBoard;

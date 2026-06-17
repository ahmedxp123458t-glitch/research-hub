import React from 'react';

function Navbar({ activeView, setActiveView }) {
  const links = [
    { id: 'groups', label: 'Groups' },
    { id: 'documents', label: 'Documents' },
    { id: 'discussions', label: 'Discussions' },
    { id: 'progress', label: 'Progress' },
    { id: 'citations', label: 'Citations' },
  ];

  return (
    <nav className="navbar">
      <h2>Research Hub</h2>
      <ul>
        {links.map(link => (
          <li key={link.id} className={activeView === link.id ? 'active' : ''} onClick={() => setActiveView(link.id)}>
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;

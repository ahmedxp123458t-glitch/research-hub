import React, { useState } from 'react';
import Navbar from './components/Navbar';
import GroupList from './components/GroupList';
import DocumentViewer from './components/DocumentViewer';
import DiscussionBoard from './components/DiscussionBoard';
import ProgressTracker from './components/ProgressTracker';
import CitationManager from './components/CitationManager';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('groups');

  const renderView = () => {
    switch (activeView) {
      case 'groups': return <GroupList />;
      case 'documents': return <DocumentViewer />;
      case 'discussions': return <DiscussionBoard />;
      case 'progress': return <ProgressTracker />;
      case 'citations': return <CitationManager />;
      default: return <GroupList />;
    }
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;

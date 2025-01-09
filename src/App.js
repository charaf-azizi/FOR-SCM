import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UCMFormatter from './components/ucm';
import PalletCodeFormatter from './components/scm';

function App() {
  return (
    <Router>
      <div>
        <nav style={{
          backgroundColor: '#2c5282',
          padding: '1rem',
          color: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '1rem',
            margin: 0,
            padding: 0,
          }}>
            <li>
              <Link
                to="/ucm-formatter"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                UCM Formatter
              </Link>
            </li>
            <li>
              <Link
                to="/pallet-formatter"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              >
                Pallet Code Formatter
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/ucm-formatter" element={<UCMFormatter />} />
          <Route path="/pallet-formatter" element={<PalletCodeFormatter />} />
          <Route path="/" element={<UCMFormatter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


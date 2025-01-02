'use client'

import React, { useState } from 'react'

export default function PalletCodeFormatter() {
  const [input, setInput] = useState('')
  const [formattedOutput, setFormattedOutput] = useState('')

  const formatPalletCodes = () => {
    const codes = input.toUpperCase().split(/\s+/).filter(code => code.trim() !== '');
    const groups = {}

    codes.forEach(code => {
      const prefix = code.slice(0, 3)
      if (!groups[prefix]) {
        groups[prefix] = []
      }
      groups[prefix].push(code.slice(3))
    })

    const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const month = currentDate.toString('').split(' ')[1].toUpperCase();
const year = currentDate.getFullYear().toString().slice(2);
    
    // IAD.30DEC/1210
    const formattedDateTime = `IAD.${day}${month}${year.slice(2)}/${hours}${minutes}`;
    
    let output = 'SCM\n'
    output += formattedDateTime + '\n';

    Object.entries(groups).forEach(([prefix, codes]) => {
      // Split codes into chunks of 5
      for (let i = 0; i < codes.length; i += 5) {
        const chunk = codes.slice(i, i + 5);
        output += `${prefix}.${chunk.join('/')}.T${chunk.length}\n`;
      }
    });

    output += 'SI TK SCM'

    setFormattedOutput(output)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          backgroundColor: '#2c5282',
          color: 'white',
          padding: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '0.5rem' }}>✈️</span>
          Air Cargo Pallet Code Formatter
        </div>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="palletCodes" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#4a5568'
            }}>
              Enter Pallet Codes (space-separated)
            </label>
            <textarea
              id="palletCodes"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. PMC123AA PAG456BB PLA789CC"
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem',
                minHeight:'2.5rem',
                overflow:'hidden',
                resize:'none'
              }}
            />
          </div>
          <button
            onClick={formatPalletCodes}
            style={{
              width: '100%',
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3182ce'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4299e1'}
          >
            📦 Format Pallet Codes
          </button>
          {formattedOutput && (
            <div style={{ marginTop: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                Formatted Output:
              </h3>
              <pre style={{
                backgroundColor: '#2d3748',
                color: '#48bb78',
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}>
                {formattedOutput}
              </pre>
            </div>
          )}
        </div>
        <div style={{
          backgroundColor: '#edf2f7',
          color: '#4a5568',
          padding: '0.75rem',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          Air Cargo Management System
        </div>
      </div>
    </div>
  )
}


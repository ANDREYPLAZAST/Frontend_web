import React, { useState } from 'react';

const PhoneInput = ({ value, onChange }) => {
  const [prefix, setPrefix] = useState('+57');
  const [number, setNumber] = useState('');

  const prefixes = [
    { code: 'CO', prefix: '+57' },
    { code: 'MX', prefix: '+52' },
    { code: 'ES', prefix: '+34' },
    { code: 'US', prefix: '+1' }
  ];

  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
    onChange(e.target.value + number);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, '');
    setNumber(newNumber);
    onChange(prefix + newNumber);
  };

  return (
    <div className="phone-input-container">
      <select 
        value={prefix} 
        onChange={handlePrefixChange}
        className="prefix-select"
      >
        {prefixes.map(p => (
          <option key={p.code} value={p.prefix}>{p.prefix}</option>
        ))}
      </select>
      <input
        type="tel"
        value={number}
        onChange={handleNumberChange}
        placeholder="Número Telefónico"
        className="phone-number-input"
      />
    </div>
  );
};

export default PhoneInput; 
import React from 'react'

export default function CurrencyRow({ currencyOptions }) {
  return (
    <div>
      <input type="number" className="input" />
      <select>
        {currencyOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

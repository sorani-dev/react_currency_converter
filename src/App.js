import React, { Fragment, useEffect, useState } from 'react'
import './App.css'
import CurrencyRow from './components/CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  console.log(currencyOptions)

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      })
    return () => {}
  }, [])
  return (
    <Fragment>
      <h1>Converter App</h1>
      <CurrencyRow currencyOptions={currencyOptions} />
      <div className="equals">=</div>
      <CurrencyRow currencyOptions={currencyOptions} />
    </Fragment>
  )
}

export default App

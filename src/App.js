import React, { Fragment, useEffect, useState } from 'react'
import './App.css'
import CurrencyRow from './components/CurrencyRow'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState() // exchange rate
  const [amount, setAmount] = useState(1) //amount to convert
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true) // which box is selected now

  // variables for the two input boxes
  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  if (fromCurrency === toCurrency) {
    toAmount = fromAmount
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
      .catch(err => console.error(err))
    return () => {}
  }, [])

  /**
   * update currency on selected currency change
   */
  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
        .catch(err => console.error(err))
    }
  }, [fromCurrency, toCurrency])

  /**
   * Get the amount from the "From" input
   * @param {Event} e
   */
  const handleFromAmountChange = e => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  /**
   * Get the amount from the "To" input
   * @param {Event} e
   */
  const handleToAmountChange = e => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <Fragment>
      <h1>Converter App</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </Fragment>
  )
}

export default App

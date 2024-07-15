import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "./slices/stockSlice";
import Modal from 'react-modal';
import "./App.css"; // Import your CSS file here

Modal.setAppElement('#root');

function App() {
  const dispatch = useDispatch();
  const { stocks, status } = useSelector((state) => state.stocks);
  console.log(status, stocks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState('bitcoin');
  const [newSelectedStock, setNewSelectedStock] = useState('bitcoin'); // State to track selected stock before submit
  const [availableCryptos, setAvailableCryptos] = useState([]);

  useEffect(() => {
    dispatch(fetchStocks());
    const intervalId = setInterval(() => {
      dispatch(fetchStocks());
    }, 10000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Extracting available cryptocurrencies from fetched data
  useEffect(() => {
    if (stocks.length > 0) {
      const cryptoOptions = stocks.map(stock => Object.keys(stock.data))[0]; // Assuming stocks[0] has all crypto keys
      setAvailableCryptos(cryptoOptions);
    }
  }, [stocks]);

  const handleStockChange = (e) => {
    setNewSelectedStock(e.target.value); // Update newSelectedStock immediately on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedStock(newSelectedStock); // Update selectedStock on submit
    setModalIsOpen(false); // Close modal
  };

  return (
    <div className="App">
      <h1>Real-time Stock/Crypto Prices</h1>
      <button onClick={() => setModalIsOpen(true)}>Change Stock/Crypto</button>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {status === 'loading' ? (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          ) : status === 'fulfilled' ? (
            stocks.map((stock, index) => (
              <tr key={index}>
                <td>{selectedStock}</td>
                <td>{stock.data[selectedStock]?.usd || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Failed to load data</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Select Stock/Crypto"
        className="Modal__Content"
        overlayClassName="Modal__Overlay"
      >
        <h2 className="Modal__Title">Select Stock/Crypto</h2>
        <form
          className="Modal__Form"
          onSubmit={handleSubmit}
        >
          <label className="Modal__Label">
            Stock/Crypto Symbol:
            <select
              className="Modal__Select"
              value={newSelectedStock} // Use newSelectedStock here
              onChange={handleStockChange} // Update newSelectedStock on change
            >
              {availableCryptos.map((crypto, index) => (
                <option key={index} value={crypto}>
                  {crypto}
                </option>
              ))}
            </select>
          </label>
          <button className="Modal__Button" type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default App;

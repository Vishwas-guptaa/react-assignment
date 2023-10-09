// src/ExchangeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExchangeList.css'; 

const ExchangeList = () => {
  const [exchanges, setExchanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [filter, setFilter] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get(`https://assignment-lkw9.onrender.com/api/exchangeList?page=${currentPage}&pageSize=${pageSize}&filter=${filter}`);
        setExchanges(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
      }
    };

    fetchExchanges();
  }, [currentPage, pageSize, filter]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < 20) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <=4; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div>
      <h1>Crypto Exchanges</h1>

      <input type="text" placeholder="Find an exchange" onChange={(e) => handleFilterChange(e.target.value)} />

      <ul className="exchange-list">
        {exchanges.map((exchange, index) => (
          <li key={exchange.id} className="exchange-row">
            <div className="exchange-info">
            <span className="row-index">{index + 1}</span>
              <img src={exchange.iconUrl} alt={`${exchange.name} icon`} />
              <span>{exchange.name}</span>
            </div>
            
          </li>
        ))}
      </ul>

      <div>
        <button className="blue-button" onClick={handlePrevPage}>Prev</button>
        {renderPageButtons()}
        <button className="blue-button" onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default ExchangeList;

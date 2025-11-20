import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import './FavouritesPage.css';

const FavouritesPage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>❤️ My Favourites</h1>
        <Card>
          <p>Your favourite exhibits will appear here.</p>
          <p className="info-text">Add exhibits to favourites by clicking the heart icon on exhibit pages.</p>
        </Card>
      </div>
    </div>
  );
};

export default FavouritesPage;

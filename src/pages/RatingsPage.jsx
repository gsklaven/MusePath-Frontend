import React from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

const RatingsPage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>⭐ My Ratings</h1>
        <Card>
          <p>Your exhibit ratings will appear here.</p>
          <p className="info-text">Rate exhibits by clicking the stars on exhibit pages.</p>
        </Card>
      </div>
    </div>
  );
};

export default RatingsPage;

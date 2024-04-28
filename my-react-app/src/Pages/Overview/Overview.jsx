import React from 'react';
import { Navigation } from '../../Components/Navigation-menu';
import Dark_mode from '../../Components/Dark-mode';

const Overview = ({ dark }) => {
  return (
    
    <div className={dark ? 'bg-blue-900 dark:bg-gray-800' : ''}>
      <Dark_mode/>
      <Navigation />
      <h1 className="text-3xl font-bold underline">Overview!</h1>
    </div>
  );
}

export default Overview;

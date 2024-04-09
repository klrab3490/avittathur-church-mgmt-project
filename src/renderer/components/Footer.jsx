import React from 'react';
import SCETLogo from '../../img/SCET.png';
import ACESLogo from '../../img/aces.png';

export default function Footer() {
  return (
    <>
      <div className="flex gap-10 justify-center items-center">
        <img alt="ACES" className="h-24 w-auto" src={ACESLogo} />
        <img alt="Sahrdaya" className="h-10 w-auto" src={SCETLogo} />
      </div>
      <p className="text-xs font-bold text-gray-600 text-center">
        Designed and Developed by Dept. of CSE, Sahrdaya College of Engineering
        and Technology, Kodakara
      </p>
    </>
  );
}

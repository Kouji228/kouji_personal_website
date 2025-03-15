'use client';
import React, { useState } from 'react';
import { VscGrabber, VscClose } from 'react-icons/vsc';

export default function HeaderExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <VscClose /> : <VscGrabber />}
      </button>
    </header>
  );
}

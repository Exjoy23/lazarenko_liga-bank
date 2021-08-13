import React from 'react';
import { Header } from '../../header/header';
import { Slider } from '../../slider/slider';

function MainPage() {
  return (
    <div>
      <Header />
      <main>
        <Slider />
      </main>
    </div>
  );
}

export { MainPage };

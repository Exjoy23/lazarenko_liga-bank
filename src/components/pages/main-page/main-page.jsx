import React from 'react';
import { Header } from '../../header/header';
import { Services } from '../../services/services';
import { Slider } from '../../slider/slider';

function MainPage() {
  return (
    <div>
      <Header />
      <main>
        <Slider />
        <Services />
      </main>
    </div>
  );
}

export { MainPage };

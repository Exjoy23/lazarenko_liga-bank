import React from 'react';
import { Header } from '../../header/header';
import { Map } from '../../map/map';
import { Services } from '../../services/services';
import { Slider } from '../../slider/slider';

function MainPage() {
  return (
    <div>
      <Header />
      <main>
        <Slider />
        <Services />
        <Map />
      </main>
    </div>
  );
}

export { MainPage };

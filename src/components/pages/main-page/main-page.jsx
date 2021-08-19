import React from 'react';
import { Footer } from '../../footer/footer';
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
      <Footer />
    </div>
  );
}

export { MainPage };

import React from 'react';
import { Calculator } from '../../calculator/calculator';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import { Map } from '../../map/map';
import { Services } from '../../services/services';
import { Slider } from '../../slider/slider';
import styles from './main-page.module.scss';

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Slider />
        <Services />
        <Calculator />
        <Map />
      </main>
      <Footer />
    </div>
  );
}

export { MainPage };

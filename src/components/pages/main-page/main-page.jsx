import React from 'react';
import { Calculator } from '../../sections/calculator/calculator';
import { Converter } from '../../sections/converter/converter';
import { Footer } from '../../footer/footer';
import { Header } from '../../header/header';
import { Map } from '../../sections/map/map';
import { Services } from '../../sections/services/services';
import { Slider } from '../../sections/slider/slider';
import styles from './main-page.module.scss';

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <h1 className="visually-hidden">Главная страница Лига банка.</h1>
        <Slider />
        <Services />
        <Calculator />
        <Converter />
        <Map />
      </main>
      <Footer />
    </div>
  );
}

export { MainPage };

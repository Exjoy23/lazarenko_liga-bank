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
      <main>
        <h1 className="visually-hidden">Главная страница Лига банка.</h1>
        <h2 className="visually-hidden">Промо</h2>
        <Slider />
        <h2 className="visually-hidden">Услуги</h2>
        <Services />
        <Calculator />
        <Map />
      </main>
      <h2 className="visually-hidden">Контакты</h2>
      <Footer />
    </div>
  );
}

export { MainPage };

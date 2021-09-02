import React from 'react';
import SwiperCore, { Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import styles from './slider.module.scss';
import classNames from 'classnames';
import { Button } from '../../button/button';

SwiperCore.use([Pagination, A11y, Autoplay]);

function Slider() {
  return (
    <section>
      <h2 className="visually-hidden">Промоакции</h2>
      <Swiper
        slidesPerView={1}
        pagination
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        a11y
        loop
      >
        <SwiperSlide className={classNames(styles.slide, styles.slide_first)}>
          <div className={classNames(styles.inner, styles.inner_first)}>
            <h2 className={styles.title}>Лига Банк</h2>
            <p className={styles.text}>Кредиты на любой случай</p>
            <Button className={styles.button} secondary href="#calculator">
              Рассчитать кредит
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className={classNames(styles.slide, styles.slide_second)}>
          <div className={styles.inner}>
            <h2 className={styles.title}>Лига Банк</h2>
            <p className={styles.text}>Ваша уверенность в завтрашнем дне</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className={classNames(styles.slide, styles.slide_third)}>
          <div className={styles.inner}>
            <h2 className={styles.title}>Лига Банк</h2>
            <p className={styles.text}>Всегда рядом</p>
            <Button href="#map">Найти отделение</Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export { Slider };

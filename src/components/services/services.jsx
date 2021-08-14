import React, { useState } from 'react';
import classNames from 'classnames';
import SwiperCore, { Thumbs, Pagination, Keyboard, A11y } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import styles from './services.module.scss';
import { Button } from '../button/button';

SwiperCore.use([Thumbs, Pagination, Keyboard, A11y]);

function Services() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <Swiper
          className="thumb"
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          allowTouchMove={false}
          simulateTouch
        >
          <SwiperSlide>
            <span className={classNames(styles.control, styles.control_vault)}>
              Вклады
            </span>
          </SwiperSlide>
          <SwiperSlide>
            <span className={classNames(styles.control, styles.control_cards)}>
              Кредиты
            </span>
          </SwiperSlide>
          <SwiperSlide>
            <span
              className={classNames(styles.control, styles.control_security)}
            >
              Страхование
            </span>
          </SwiperSlide>
          <SwiperSlide>
            <span className={classNames(styles.control, styles.control_phone)}>
              Онлайн-сервисы
            </span>
          </SwiperSlide>
        </Swiper>
        <Swiper
          className={classNames('slides', styles.slides)}
          thumbs={{ swiper: thumbsSwiper }}
          simulateTouch={false}
          loop
          pagination
          keyboard={{ enabled: true }}
          a11y
        >
          <SwiperSlide className={classNames(styles.slide, styles.slide_vault)}>
            <h2 className={styles.title}>
              Вклады Лига Банка – это выгодная
              <br />
              инвестиция в свое будущее
            </h2>
            <ul className={styles.list}>
              <li className={styles.item}>Проценты по вкладам до 7%</li>
              <li className={styles.item}>Разнообразные условия</li>
              <li className={styles.item}>
                Возможность ежемесячной капитализации
                <br />
                или вывод процентов на банковскую карту
              </li>
            </ul>
            <Button style={{ padding: '14px 85px' }}>Узнать подробнее</Button>
          </SwiperSlide>
          <SwiperSlide className={classNames(styles.slide, styles.slide_cards)}>
            <h2 className={styles.title}>
              Лига Банк выдает кредиты под любые цели
            </h2>
            <ul className={styles.list}>
              <li className={styles.item}>Ипотечный кредит</li>
              <li className={styles.item}>Автокредит</li>
              <li className={styles.item}>Потребительский кредит</li>
            </ul>
            <p className={styles.text}>
              Рассчитайте ежемесячный платеж
              <br />и ставку по кредиту воспользовавшись
              <br />
              нашим{' '}
              <a className={styles.link} href="/">
                кредитным калькулятором
              </a>
            </p>
          </SwiperSlide>
          <SwiperSlide
            className={classNames(styles.slide, styles.slide_security)}
          >
            <h2 className={styles.title}>
              Лига Страхование — застрахуем все что захотите
            </h2>
            <ul className={styles.list}>
              <li className={styles.item}>Автомобильное страхование</li>
              <li className={styles.item}>Страхование жизни и здоровья</li>
              <li className={styles.item}>Страхование недвижимости</li>
            </ul>
            <Button style={{ padding: '14px 85px' }}>Узнать подробнее</Button>
          </SwiperSlide>
          <SwiperSlide className={classNames(styles.slide, styles.slide_phone)}>
            <h2 className={styles.title}>
              Лига Банк — это огромное количество онлайн-сервисов для вашего
              удобства
            </h2>
            <ul className={styles.list}>
              <li className={styles.item}>
                Мобильный банк, который всегда под рукой
              </li>
              <li className={styles.item}>
                Приложение Лига-проездной позволит вам оплачивать билеты по
                всему миру
              </li>
            </ul>
            <Button style={{ padding: '14px 85px' }}>Узнать подробнее</Button>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export { Services };

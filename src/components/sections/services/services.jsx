import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import SwiperCore, { Thumbs, Pagination, A11y } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import styles from './services.module.scss';
import { Button } from '../../button/button';

SwiperCore.use([Thumbs, Pagination, A11y]);

function Services() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const thumbRef = useRef(null);
  const sliderRef = useRef(null);

  const onSlideFocus = (evt) => {
    const index = +evt.target.dataset.id;

    const thumbElements = thumbRef.current.querySelectorAll('.swiper-slide');
    const sliderElements = sliderRef.current.querySelectorAll('.swiper-slide');

    if (thumbElements[index]) {
      thumbElements.forEach((item) =>
        item.classList.remove('swiper-slide-thumb-active'),
      );

      sliderElements.forEach((item) =>
        item.classList.remove(
          'swiper-slide-active',
          'swiper-slide-prev',
          'swiper-slide-next',
        ),
      );

      thumbElements[index].classList.add('swiper-slide-thumb-active');
      sliderElements[index].classList.add('swiper-slide-active');

      if (sliderElements[index - 1]) {
        sliderElements[index - 1].classList.add('swiper-slide-prev');
      }

      if (sliderElements[index + 1]) {
        sliderElements[index + 1].classList.add('swiper-slide-next');
      }
    }
  };

  return (
    <section className={styles.wrapper} id="services">
      <h2 className="visually-hidden">Услуги</h2>
      <div className={styles.inner}>
        <div ref={thumbRef}>
          <Swiper
            className="thumb"
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            allowTouchMove={false}
            simulateTouch
          >
            <SwiperSlide>
              <span
                className={classNames(styles.control, styles.control_vault)}
              >
                Вклады
              </span>
            </SwiperSlide>
            <SwiperSlide>
              <span
                className={classNames(styles.control, styles.control_cards)}
              >
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
              <span
                className={classNames(styles.control, styles.control_phone)}
              >
                Онлайн-сервисы
              </span>
            </SwiperSlide>
          </Swiper>
        </div>
        <div ref={sliderRef}>
          <Swiper
            className={classNames('slides', styles.slides)}
            thumbs={{ swiper: thumbsSwiper }}
            simulateTouch={false}
            pagination
            a11y
          >
            <SwiperSlide
              className={classNames(styles.slide, styles.slide_vault)}
              onFocus={onSlideFocus}
              tabIndex="0"
              data-id="0"
            >
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
              <Button fullwidth>Узнать подробнее</Button>
            </SwiperSlide>
            <SwiperSlide
              className={classNames(styles.slide, styles.slide_cards)}
              onFocus={onSlideFocus}
              tabIndex="0"
              data-id="1"
            >
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
              onFocus={onSlideFocus}
              tabIndex="0"
              data-id="2"
            >
              <h2 className={styles.title}>
                Лига Страхование — застрахуем все что захотите
              </h2>
              <ul className={styles.list}>
                <li className={styles.item}>Автомобильное страхование</li>
                <li className={styles.item}>Страхование жизни и здоровья</li>
                <li className={styles.item}>Страхование недвижимости</li>
              </ul>
              <Button fullwidth>Узнать подробнее</Button>
            </SwiperSlide>
            <SwiperSlide
              className={classNames(styles.slide, styles.slide_phone)}
              onFocus={onSlideFocus}
              tabIndex="0"
              data-id="3"
            >
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
              <Button fullwidth>Узнать подробнее</Button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export { Services };

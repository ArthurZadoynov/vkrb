import styles from "./styles.module.css";
import VK from "../../images/VK.png";
import Instagram from "../../images/Instagram.png";
import Tooltip from "../../images/Tooltip.png";

export const MainSectionContacts = () => {
  return (
    <section id="contact" className={styles.containerContacts}>
      <div className={styles.contacts}>
        <div className={styles.contactsContent}>
          <div className={styles.textContent}>
            <h2>Контакты</h2>
            <div>
              <div className={styles.department}>
                Главный офис
                <div>
                  <img src={Tooltip} alt="Tooltip" />
                  <span>
                    Адрес и телефон для корреспонденции, инвесторов. Вопросы о
                    доставке, качестве обслуживания и товара просьба задавать в
                    отдел продаж.
                  </span>
                </div>
              </div>
            </div>
            <a href="tel: +7 800 789 89 89">+7 800 789 89 89</a>
            <p>г. Санкт-Петербург, 2-я Комсомольская, 43</p>
            <p className={styles.department}>Отдел продаж</p>
            <a href="tel: +7 800 789 89 89">+7 800 789 89 89</a>
            <p>г. Санкт-Петербург, 2-я Комсомольская, 43</p>
            <div className={styles.messengers}>
              <a href="https:/vk.com" target="_blank" rel="noopener noreferrer">
                <img src={VK} alt="VK" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={Instagram} alt="Instagram" />
              </a>
            </div>
          </div>
          <div className={styles.map}>
            <a href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps">
              Санкт‑Петербург
            </a>
            <a href="https://yandex.ru/maps/2/saint-petersburg/house/2_ya_komsomolskaya_ulitsa_43/Z0kYdwNiSEAFQFtjfXRycXhqbQ==/?ll=30.144665%2C59.831144&utm_medium=mapframe&utm_source=maps&z=18.24">
              2-я Комсомольская улица, 43 на карте Санкт‑Петербурга —
              Яндекс Карты
            </a>
            <iframe
              title="MapYandex"
              src="https://yandex.ru/map-widget/v1/?ll=30.144665%2C59.831144&mode=whatshere&whatshere%5Bpoint%5D=30.142152%2C59.830499&whatshere%5Bzoom%5D=17&z=18.24?lang=ru_RU"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

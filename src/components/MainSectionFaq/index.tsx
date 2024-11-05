import styles from "./styles.module.css";
import { Accordeon } from "../Accordeon";

export const MainSectionFaq = () => {
  return (
    <section id="faqs" className={styles.containerFaq}>
      <div className={styles.faqs}>
        <div className={styles.FaqContent}>
          <h2>Часто задаваемые вопросы</h2>
          <div className={styles.accordeonContent}>
            <Accordeon
              id="faq1"
              labelFaq="Вопрос 1"
              answerFaq="А это ответ 1: в комплексе функционируют 6 детских садов с площадками, воспитателями и всякими другими людьми"
            />
            <Accordeon
              id="faq2"
              labelFaq="Вопрос 2"
              answerFaq="А это ответ 2: ..."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

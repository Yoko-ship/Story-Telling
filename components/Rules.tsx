import classes from "@/app/page.module.css";
export default function Rules() {
  return (
    <main className={classes.main}>
      <h2 className={classes.welcoming}>Добро пожаловать в StoreGen!</h2>
      <p>
        Здесь любые 2–3 слова превращаются в дикие, смешные, трогательные или
        эпичные истории. <br/>Вводи что угодно — хоть “арбуз, дракон, дискотека” — и
        смотри, что за безумие придумает AI.
      </p>
      <ol>
        <h2>Что умеем</h2>
        <li>
        Генерим сказки, крипи, комедии, фантастику и всё между
        </li>
        <li> Читаем вслух, будто у нас актёр в подвале</li>
      </ol>
    </main>
  );
}

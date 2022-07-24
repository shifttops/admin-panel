import Chart from "../../../../components/Chart";
import "./inner-graphics.scss"
import styles from "../InnerConfiguration/inner-configuration.module.scss";
import SearchQuick from "../../../../components/search/SearchQuick";
import { useState } from "react";

const labels = Array(30).fill(0).map((date, index) => {
  const newDate = new Date()
  newDate.setDate(newDate.getDate() - index)
  return newDate.toLocaleDateString()
}).reverse()

const getArrayData = () => Array(30).fill(0).map(() => Math.floor(Math.random() * 99) + 1)

const graphs = [
  'Количество машин',
  'Время заправки',
  'Количество посетителей',
  'Время обслуживание на кассе',
  'Средний чек',
  'Тип оплаты',
  'Занятые столы',
  'Время нахождения на заправке',
];

const InnerGraphics = () => {
  const [search, setSearch] = useState('')

  return (
    <>
      <div className={styles.head}>
        <div className={styles.headSearch}>
          <h2 className={styles.title}>Бизнес информация</h2>
          <SearchQuick setSearch={setSearch}/>
        </div>
      </div>
      <div className="graphics">
        {graphs.filter((title) => title.toLowerCase()
          .includes(search.toLowerCase()))
          .map((title) => (
          <Chart
            key={title}
            title={title}
            labels={labels}
            chartData={getArrayData()}
          />
        ))}
      </div>
    </>
  )
}

export default InnerGraphics

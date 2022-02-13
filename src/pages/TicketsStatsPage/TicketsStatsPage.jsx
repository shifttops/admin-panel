import styles from "./tickets-stats-page.module.scss";
import BackLink from "../../components/BackLink";
import routes from "../../constants/routes";
import Button from "../../components/buttons/Button";
import { SaveVideo } from "../../icons";
import Chart from "../../components/Chart";
import { observer } from "mobx-react";
import TicketsStore from "../../store/TicketsStore";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import cn from "classnames";
import moment from "moment";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { configureTicketsStatsChartData } from "../../helpers/functions/forTicketStatsPage/configureTicketsStatsChartData";
import { getExclusiveStoresCount } from "../../helpers/functions/forTicketStatsPage/getExclusiveStoresCount";
import { getAllTicketsCount } from "../../helpers/functions/forTicketStatsPage/getAllTicketsCount";
import { getTicketTypeCount } from "../../helpers/functions/forTicketStatsPage/getTicketTypeCount";
import {
  ticketReasonMapper,
  ticketsStatsChartsMapper,
  ticketsStatsPdfTableMapper,
  ticketsStatsTablesMapper,
  ticketStatusMapper,
  ticketTypesMapper,
} from "../../helpers/mappers";
import Loader from "../../components/Loader";

const TicketsStatsPage = observer(() => {
  const history = useHistory();
  const {
    filteredTickets,
    statsPeriod: period,
    isTicketsFetching,
  } = TicketsStore;

  const [charts, setCharts] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!filteredTickets.get().length && !isTicketsFetching) {
      history.push(routes.tickets);
    }

    return () => TicketsStore.filteredTickets.get().clear();
  }, []);

  const getChart = (chart) => {
    setCharts((prevState) => [...prevState, chart]);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const docTitle = `Tickets stats for ${moment(period.get().startDate).format(
      "DD.MM.YYYY"
    )} - ${moment(period.get().endDate).format("DD.MM.YYYY")}.pdf`;

    const doc = new jsPDF("landscape");
    doc.text(docTitle, 10, 10);

    doc.text(`Tickets`, 135, 25);

    const ticketsTable = {
      margin: { top: 30 },
      headStyles: {
        fillColor: "#515151",
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      head: [ticketsStatsPdfTableMapper.map((item) => item.visibleName)],
      body: [],
    };

    filteredTickets.get().map((ticket) => {
      const tableRowData = [];

      ticketsStatsPdfTableMapper.map((item) => {
        const pushingItem =
          item.visibleName === "Created"
            ? moment(ticket[item.name]).format("DD.MM.YYYY, HH:mm")
            : item.visibleName === "Status" && ticket[item.name]
            ? ticketStatusMapper.find(({ name }) => name === ticket[item.name])
                .visibleName
            : item.visibleName === "Type" && ticket[item.name]
            ? ticketTypesMapper.find(({ name }) => name === ticket[item.name])
                .visibleName
            : item.visibleName === "Key" && ticket[item.name]
            ? `[Mcd-${ticket[item.name]}]`
            : item.visibleName === "Reporter" && ticket[item.name]
            ? ticket.owner_first_name && ticket.owner_first_name.length
              ? `${ticket.owner_first_name} ${ticket.owner_last_name}`
              : `[User ${ticket[item.name]}]`
            : item.visibleName === "Reason" && ticket[item.name]
            ? ticketReasonMapper.find(({ name }) => name === ticket[item.name])
                .visibleName
            : ticket[item.name]
            ? ticket[item.name]
            : "N/A";

        tableRowData.push(pushingItem);
      });

      ticketsTable.body.push(tableRowData);
    });

    autoTable(doc, ticketsTable);

    doc.addPage("pdf", "landscape");

    doc.text(`Summary`, 135, 10);

    ticketsStatsTablesMapper.map((item) => {
      const table = {
        margin: { top: 15 },
        headStyles: {
          fillColor: "#515151",
          halign: "center",
        },
        bodyStyles: {
          halign: "center",
        },
        head: [[item.title]],
        body: [[]],
      };

      table.body[0].push(getAllTicketsCount(item.types, filteredTickets.get()));
      item.mapper.map((mapperItem) => {
        table.head[0].push(mapperItem.visibleName);
        table.body[0].push(
          getTicketTypeCount({
            types: item.types,
            name: mapperItem.name,
            field: item.field,
            tickets: filteredTickets.get(),
          })
        );
      });

      table.head[0].push("Exclusive stores");
      table.body[0].push(
        getExclusiveStoresCount(item.types, filteredTickets.get())
      );

      autoTable(doc, table);
    });

    doc.addPage("pdf", "landscape");

    doc.text(`Charts`, 135, 10);

    if (charts.length) {
      charts.map((chart, index) => {
        const chartImage = new Image();
        if (chart.canvas) chartImage.src = chart.toBase64Image();

        const imageSettings = {
          coordinates: {},
          width: 128,
          height: 64,
          padding: 10,
        };

        const initialValues = {
          x: 10,
          y: 15,
        };

        const coordinatesTypes = {
          0: {
            x: initialValues.x,
            y: initialValues.y,
          },
          1: {
            x: initialValues.x + imageSettings.width + imageSettings.padding,
            y: initialValues.y,
          },
          2: {
            x: initialValues.x,
            y: initialValues.y + imageSettings.height + imageSettings.padding,
          },
        };

        imageSettings.coordinates = { ...coordinatesTypes[index] };

        doc.addImage(
          chartImage,
          "JPEG",
          imageSettings.coordinates.x,
          imageSettings.coordinates.y,
          imageSettings.width,
          imageSettings.height
        );
      });
    }

    doc.save(docTitle);

    setIsDownloading(false);
    ToastsStore.success(`${docTitle} successfully downloaded`, 3000, "toast");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <BackLink path={routes.tickets} text={"Back to tickets list"} />
        <div className={styles.header__info}>
          <h2 className={styles.title}>Tickets statistics</h2>
          <div className={styles.header__period}>
            <p>Chosen period: </p>
            <div>
              {[
                { title: "Start date", date: period.get().startDate },
                { title: "End date", date: period.get().endDate },
              ].map(({ title, date }) => (
                <div>
                  <span>{title}</span>: {moment(date).format("MMMM DD, YYYY")}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.header__buttons}>
            <Button
              Icon={SaveVideo}
              text={"Download"}
              onClick={handleDownload}
              disabled={!filteredTickets.get().length || isTicketsFetching}
              fetching={isDownloading}
            />
          </div>
        </div>
      </div>
      {!isTicketsFetching && filteredTickets.get().length ? (
        <div className={styles.stats}>
          <div className={styles.charts}>
            <h3 className={styles.subtitle}>Charts</h3>
            <div className={styles.charts__body}>
              {ticketsStatsChartsMapper.map(
                ({ title, type, mapper, field }) => (
                  <Chart
                    title={title}
                    labels={[
                      ...configureTicketsStatsChartData(
                        mapper,
                        field,
                        filteredTickets.get()
                      ).map(
                        ({ name }) =>
                          mapper.find((item) => item.name === name).visibleName
                      ),
                    ]}
                    type={type}
                    chartData={configureTicketsStatsChartData(
                      mapper,
                      field,
                      filteredTickets.get()
                    ).map(({ count }) => count)}
                    getChart={getChart}
                  />
                )
              )}
            </div>
          </div>
          <aside className={styles.summary}>
            <h3 className={styles.subtitle}>Tables</h3>
            <div className={styles.tables}>
              {ticketsStatsTablesMapper.map((item) => (
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.table__ticketsCount}>
                      <th
                        className={cn(styles.table__title, styles.table__head)}
                        rowSpan={3}
                      >
                        {item.title}
                      </th>
                      <tr>
                        <th className={styles.table__head} colSpan={4}>
                          {getAllTicketsCount(
                            item.types,
                            filteredTickets.get()
                          )}
                        </th>
                      </tr>
                      <tr>
                        {item.mapper.map(({ visibleName, className }) => (
                          <th className={cn(styles.status, className)}>
                            {visibleName}
                          </th>
                        ))}
                      </tr>
                      <tr>
                        {item.mapper.map(({ name }) => (
                          <th className={styles.table__head}>
                            {getTicketTypeCount({
                              types: item.types,
                              name,
                              field: item.field,
                              tickets: filteredTickets.get(),
                            })}
                          </th>
                        ))}
                      </tr>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={styles.table__item}>Exclusive stores</td>
                      <td className={styles.table__item}>
                        {getExclusiveStoresCount(
                          item.types,
                          filteredTickets.get()
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </aside>
        </div>
      ) : (
        <div className={styles.loader}>
          {isTicketsFetching ? (
            <Loader types={["medium"]} />
          ) : (
            "No tickets for chosen period"
          )}
        </div>
      )}
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_RIGHT}
      />
    </div>
  );
});

export default TicketsStatsPage;

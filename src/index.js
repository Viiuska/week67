//https://www.youtube.com/watch?v=sYGreL-lxkg
//https://moodle.lut.fi/mod/page/view.php?id=701261
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";

const query = {
  query: [
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2000",
          "2001",
          "2002",
          "2003",
          "2004",
          "2005",
          "2006",
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021"
        ]
      }
    },
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"]
      }
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"]
      }
    }
  ],
  response: {
    format: "json-stat2"
  }
};

const getData = async () => {
  const url =
    "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";

  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(query)
  });
  if (!res.ok) {
    return;
  }
  const data = await res.json();
  return data;
};

const buildChart = async (clicked, kunta) => {
  const data = await getData();
  const years = Object.values(data.dimension.Vuosi.category.label);
  const alue = Object.values(data.dimension.Alue);
  const luku = data.value;

  //console.log(alue[1].index)
  let n = alue[1].index;
  //console.log(Object.keys(n)[0]);

  const charData = {
    labels: years,
    datasets: [{ name: Object.keys(n)[0], values: luku }]
  };

  const chart = new Chart("#chart", {
    title: "My Chart",
    data: charData,
    type: "line",
    colors: ["#eb5146"],
    height: 450
  });
};
let clicked = "false";
let kunta = "";

buildChart(clicked, kunta);
const submitBtn = document.getElementById("submit-data");
//discussion with Kirveskoski
submitBtn.addEventListener("click", function () {
  kunta = document.getElementById("input-area").value;
  clicked = "true";
  buildChart(clicked, kunta);
});

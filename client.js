const URL = "https://tpex.atmois.com/plot-data";
let itemID = "stone";

function plotGraph(data) {
  const trace = {
    x: data.map((d) => d.date),
    y: data.map((d) => d.value),
    type: "scatter",
  };

  const layout = {
    title: `${itemID} Value Over Time`,
    xaxis: { title: "Date" },
    yaxis: { title: "Value" },
  };

  Plotly.newPlot("graph", [trace], layout);
}

function fetchDataAndPlot(itemID) {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemID: itemID }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => plotGraph(data))
    .catch((error) => console.error("Error:", error));
}

fetchDataAndPlot(itemID);
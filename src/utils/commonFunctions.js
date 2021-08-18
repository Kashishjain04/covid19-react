export const fetcher = (url) => {
  return fetch(url).then((response) => {
    return response.json();
  });
};

export const formatNum = (num, digits) => {
  if (!num || !digits) return "";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e5, symbol: "L" },
    { value: 1e7, symbol: "Cr" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return (
    (num / item?.value)
      .toFixed(digits)
      .replace(rx, "$1")
      .toLocaleString("en_IN") + item?.symbol
  );
};

export const getActive = (data) => {
  const other = data?.other ? data?.other : 0;
  const active = data?.confirmed - data?.recovered - data?.deceased - other;
  return Number.isNaN(active) ? 0 : active;
};

export const formatDate = (date) => {
  return new Date(date + "GMT+0530").toISOString().split("T")[0];
};

export const formatHistoryData = (data, date) => {
  let newData = Object.entries(data);
  newData.forEach((state) => {
    state[1] = state[1].dates[date];
  });
  return newData;
};

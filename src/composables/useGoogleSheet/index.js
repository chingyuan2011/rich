export const useGoogleSheet = () => {
  const getSheetData = async ({
    apiKey = "AIzaSyCZgrWUDYg4zJ2d9OwYn-MsfrgAv2nlLRQ",
    sheetID = "",
    name = "",
  }) => {
    let fetchData = null

    if (!apiKey || !sheetID || !name) return fetchData

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${name}?key=${apiKey}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        fetchData = data.values;
      })
      .catch((error) => console.error("Error:", error));
    return fetchData;
  };

  return {
    getSheetData,
  };
};

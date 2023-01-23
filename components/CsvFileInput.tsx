import React, { useState } from "react";
import {toArrayOfObjects, toRecipientsAndAmountsArrays} from "../util/util";

interface CSVFileInputProps {
  setTokenRecipients: (_: string[]) => void;
  setTokenAmounts: (_: string[]) => void;
}

function CsvFileInput({
  setTokenRecipients,
  setTokenAmounts
  }:CSVFileInputProps) {
  const [csvFile, setCsvCsvFile] = useState();
  const [csvData, setCsvData] = useState([]);
  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setCsvCsvFile(e.target.files[0]);
  };

  const parseCsvFileToArray = csvRecord => {
    const csvHeader = csvRecord.slice(0, csvRecord.indexOf("\n")).split(",")
    const csvRows = csvRecord.slice(csvRecord.indexOf("\n") + 1).split("\n");
    const [csvRecipients, csvAmounts] = toRecipientsAndAmountsArrays(csvRows);

    const array = toArrayOfObjects(csvRows, csvHeader);
    setTokenRecipients(csvRecipients)
    setTokenAmounts(csvAmounts)
    setCsvData(array);
  };

//todo: check the format of csv file
//todo: check if the address and amount are valid

  const handleCsvUpload = (e) => {
    e.preventDefault();

    if (csvFile) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        parseCsvFileToArray(text);
      };
      fileReader.readAsText(csvFile);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...csvData)); //todo: simply this

  return (
    <div style={{textAlign: "center"}}>
      <h2>Import CSV for Airdropping </h2>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        <button
          onClick={(e) => {
            handleCsvUpload(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>

      <br/>
      <table>
        <thead>
        <tr key={"header"}>
          {headerKeys.map((key) => (
            <th>{key}</th>
          ))}
        </tr>
        </thead>

        <tbody>
        {csvData.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default CsvFileInput


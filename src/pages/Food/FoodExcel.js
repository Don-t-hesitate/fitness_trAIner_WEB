import React, { useEffect, useState } from "react";
import DataGrid, { textEditor } from "react-data-grid";
import { read, utils, writeFile } from "xlsx";

import 'react-data-grid/lib/styles.css';

function arrayify(rows) {
  return rows.map(row => {
    if(Array.isArray(row)) return row;
    var length = Object.keys(row).length;
    for(; length > 0; --length) if(row[length-1] != null) break;
    return Array.from({length, ...row});
  });
}

const getRowsCols = (data, sheetName) => ({
  rows: utils.sheet_to_json(data[sheetName], { header: 1 }),
  columns: [
    { key: "0", name: utils.encode_col(0), width: 150, editor: textEditor },
    ...Array.from(
      {
        length: utils.decode_range(data[sheetName]["!ref"] || "A1").e.c,
      },
      (_, i) => ({ key: String(i + 1), name: utils.encode_col(i + 1), editor: textEditor })
    ),
  ],
});

export default function FoodExcel() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [workBook, setWorkBook] = useState({});
  const [sheets, setSheets] = useState([]);
  const [current, setCurrent] = useState("");
  const [deletedRows, setDeletedRows] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const deleteRow = (rowToDelete) => {
    const newRows = rows.filter(
      (row) => JSON.stringify(row) !== JSON.stringify(rowToDelete)
    );
    setRows(newRows);
    setDeletedRows([...deletedRows, rowToDelete]);
  };

  function selectSheet(name) {
    workBook[current] = utils.aoa_to_sheet(arrayify(rows));

    const { rows: new_rows, columns: new_columns } = getRowsCols(workBook, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  async function handleAB(file) {
    console.log("before read");
    console.log("file: " + file);
    const data = await read(file);
    console.log("after read");

    setWorkBook(data.Sheets);
    setSheets(data.SheetNames);

    const name = data.SheetNames[0];
    const { rows: new_rows, columns: new_columns } = getRowsCols(data.Sheets, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  useEffect(() => { (async () => {
    const res = await fetch("http://localhost:8080/admin/excel");
    const ab = await res.arrayBuffer();
    console.log("before ab ");
    await handleAB(ab);
    console.log("after ab");
    setIsLoading(false);
  })(); }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function saveFile(ext) {
    workBook[current] = utils.aoa_to_sheet(arrayify(rows));

    const wb = utils.book_new();
    sheets.forEach((n) => { utils.book_append_sheet(wb, workBook[n], n); });

    writeFile(wb, "SheetJSRDG." + ext);
  }

  function addRow() {
    setRows(prevRows => [...prevRows, []]);
  }

  return (
    <>
      {sheets.length > 0 && ( <>
        <p>드롭다운을 사용하여 워크시트 전환하기:&nbsp;
          <select onChange={async (e) => selectSheet(sheets[+(e.target.value)])}>
            {sheets.map((sheet, idx) => (<option key={sheet} value={idx}>{sheet}</option>))}
          </select>
        </p>
        <p>열 삭제는 해당 열의 셀 더블클릭, 열 추가는 아래 Add Row 버튼</p>
        <div className="flex-cont"><b>현재 시트: {current}</b></div>
        <DataGrid 
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        onRowDoubleClick={(row) => {
          console.log('this is row' + row);
          deleteRow(row);
        }}
        defaultColumnOptions={{resizable: true, minWidth: 110, maxWidth:210}}
        style={{height: 590}}/>
        {/* <p>수정된 데이터로 새 파일을 생성하려면 아래 버튼 중 하나를 클릭하세요.</p> */}
        {/* <div className="flex-cont">{["xlsx", "xlsb", "xls"].map((ext) => (
          <button key={ext} onClick={() => saveFile(ext)}>export [.{ext}]</button>
        ))}</div> */}
        <button onClick={addRow}>Add Row</button>
      </> )}
    </>
  );
}
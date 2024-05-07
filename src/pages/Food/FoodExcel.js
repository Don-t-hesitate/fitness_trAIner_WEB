import React, { useEffect, useState } from "react";
import DataGrid, { textEditor } from "react-data-grid";
import { read, utils, write } from "xlsx";
import { Button, ButtonGroup, Stack } from 'react-bootstrap';

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
  const [rows, setRows] = useState([]); // 엑셀 행을 저장할 상태
  const [columns, setColumns] = useState([]); // 엑셀 열을 저장할 상태
  const [workBook, setWorkBook] = useState({}); // 엑셀 워크북을 저장할 상태
  const [sheets, setSheets] = useState([]); // 엑셀 시트 이름을 저장할 상태
  const [current, setCurrent] = useState(""); // 현재 선택된 시트 이름을 저장할 상태
  const [deletedRows, setDeletedRows] = useState([]); // 삭제된 행을 저장할 상태

  const [isLoading, setIsLoading] = useState(false);

  // 특정 행을 삭제하는 함수
  const deleteRow = (rowToDelete) => {
    const newRows = rows.filter(
      (row) => JSON.stringify(row) !== JSON.stringify(rowToDelete)
    );
    setRows(newRows);
    setDeletedRows([...deletedRows, rowToDelete]);
  };

  // 엑셀 시트 선택 시 실행되는 함수
  function selectSheet(name) {
    workBook[current] = utils.aoa_to_sheet(arrayify(rows));

    const { rows: new_rows, columns: new_columns } = getRowsCols(workBook, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  // 엑셀 파일을 읽어와서 상태에 저장하는 함수
  async function handleAB(file) {
    const data = await read(file);

    setWorkBook(data.Sheets);
    setSheets(data.SheetNames);

    const name = data.SheetNames[0];
    const { rows: new_rows, columns: new_columns } = getRowsCols(data.Sheets, name);
    setRows(new_rows);
    setColumns(new_columns);
    setCurrent(name);
  }

  // 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => { (async () => {
    const res = await fetch("http://localhost:8080/admin/excel");
    const ab = await res.arrayBuffer(); // ArrayBuffer로 변환

    await handleAB(ab);

    setIsLoading(false);
  })(); }, []);

  // 엑셀 파일이 로딩 중인 경우 로딩 메시지 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 엑셀 파일을 서버에 반영하는 함수
  async function saveFile() { try {
    workBook[current] = utils.aoa_to_sheet(arrayify(rows));
    
    const wb = utils.book_new();
    sheets.forEach((n) => { utils.book_append_sheet(wb, workBook[n], n); });
    
    // writeFile(wb, "final_food_db.xlsx");
    
    /* Export to XLSX */
    const data = write(wb, {bookType: 'xlsx', type: 'array'});

    /* Make FormData */
    const fdata = new FormData();
    fdata.append('file', new File([data], 'sheetjs.xlsx'));

    (async() => {
      /* send data using fetch */
      const res = await fetch("http://localhost:8080/admin/excel", { method: "POST", body: fdata });
      const txt = await res.text();
      console.log(txt);
    })();
  } catch (e) { console.error(e); } }

  // 행 추가 함수
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
          <br></br>열 삭제는 해당 열의 셀 더블클릭, 열 추가는 아래 Add Row 버튼
        </p>
        <Stack direction="horizontal">
          <div className="flex-cont"><b>현재 시트: {current}</b></div>
          <ButtonGroup className='ms-auto'>
            <Button variant="secondary" onClick={addRow}>행 추가</Button>
            <Button onClick={() => saveFile()}>업데이트</Button>
          </ButtonGroup>
        </Stack>
        <DataGrid 
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        onRowDoubleClick={(row) => {
          console.log('this is row: ' + row);
          deleteRow(row);
        }}
        defaultColumnOptions={{resizable: true, minWidth: 110, maxWidth:210}}
        style={{height: 590}}/>
        {/* <p>수정된 데이터로 새 파일을 생성하려면 아래 버튼 중 하나를 클릭하세요.</p> */}
        {/* <div className="flex-cont">{["xlsx", "xlsb", "xls"].map((ext) => (
          <button key={ext} onClick={() => saveFile(ext)}>export [.{ext}]</button>
        ))}</div> */}
      </> )}
    </>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataGrid, { textEditor } from "react-data-grid";
import { read, utils, write } from "xlsx";
import { Button, ButtonGroup, Stack } from 'react-bootstrap';
import 'react-data-grid/lib/styles.css';
import LoadingModal from "../../components/LoadingModal";

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
    const res = await fetch(process.env.REACT_APP_API_URL_BLD + "/admin/excel");
    const ab = await res.arrayBuffer(); // ArrayBuffer로 변환

    await handleAB(ab);

    setIsLoading(false);
  })(); }, []);

  // 엑셀 파일이 로딩 중인 경우 로딩 메시지 표시
  if (isLoading) {
    return <LoadingModal />;
  }

  // 엑셀 파일을 서버에 반영하는 함수
  async function saveFile() { 
    try {
      workBook[current] = utils.aoa_to_sheet(arrayify(rows)); // 현재 시트의 행을 엑셀 워크북에 반영
    
      // sheets 배열에 있는 시트들을 엑셀 워크북에 추가
      const wb = utils.book_new();
      sheets.forEach((n) => { utils.book_append_sheet(wb, workBook[n], n); });
            
      /* XLSX로 변환 */
      const data = write(wb, {bookType: 'xlsx', type: 'array'});

      console.log('excel data: ', data);
      console.log('rows: ', rows);

      // 디버깅용
      const startingWithS = Object.fromEntries(
        Object.entries(workBook['final_food_db'])
          .filter(([key, value]) => key.startsWith('S49'))
      );
      const startingWithR = Object.fromEntries(
        Object.entries(workBook['final_food_db'])
          .filter(([key, value]) => key.startsWith('R49'))
      );
      const startingWithQ = Object.fromEntries(
        Object.entries(workBook['final_food_db'])
          .filter(([key, value]) => key.startsWith('Q49'))
      );
      const startingWithP = Object.fromEntries(
        Object.entries(workBook['final_food_db'])
          .filter(([key, value]) => key.startsWith('P49'))
      );
      
      console.log('workbook with keys and values starting with "P": ', startingWithP);
      console.log('workbook with keys and values starting with "Q": ', startingWithQ);
      console.log('workbook with keys and values starting with "R": ', startingWithR)
      console.log('workbook with keys and values starting with "S": ', startingWithS);

      /* FormData 생성 */
      const fdata = new FormData();
      fdata.append('file', new File([data], 'sheetjs.xlsx'));

      const header = process.env.REACT_APP_API_URL_BLD;
      (async() => {
        /* 데이터 전송 */
        const response = await axios.post(header + "/admin/excel", fdata, { headers: { 'Content-Type': 'multipart/form-data' } });
        const size = response.data.result.size / (1024 ** 2); // MB 단위로 변환
        
        alert(response.data.message + '\n파일 크기: ' + size.toFixed(2) + 'MB');
      })();
    } catch (error) { 
      console.error('error?: ', error);
      alert('Error saving file:', error.data.message);
    } 
  };

  // 행 추가 함수
  function addRow() {
    setRows(prevRows => [...prevRows, []]);
  }

  return (
    <>
      {sheets.length > 0 && ( <>
        <div><span style={{color: 'crimson', fontWeight: 'bold'}}>행 삭제</span>는 해당 행의 셀 <span style={{color: 'goldenrod', fontStyle: 'italic', textDecoration: 'underline'}}>더블클릭</span>, 
        <span style={{color: 'blue', fontWeight: 'bold'}}> 행 추가</span>는 <span style={{color: '#6c757d', fontStyle: 'italic', textDecoration: 'underline'}}>버튼</span>으로 수행</div>
        <p>드롭다운을 사용하여 워크시트 전환하기:&nbsp;
          <select onChange={async (e) => selectSheet(sheets[+(e.target.value)])}>
            {sheets.map((sheet, idx) => (<option key={sheet} value={idx}>{sheet}</option>))}
          </select>
        </p>
        <Stack direction="horizontal">
          <div className="flex-cont"><b>현재 시트: {current}</b></div>
          <ButtonGroup className='ms-auto mb-1 mt-2' >
            <Button variant="secondary" onClick={addRow}>
              <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>add</span>
              <span style={{verticalAlign: "middle", fontWeight: 'bold'}}> 행 추가</span>
            </Button>
            <Button onClick={() => saveFile()}>
              <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>save</span>
              <span style={{verticalAlign: "middle", fontWeight: 'bold'}}> 저장</span>
            </Button>
          </ButtonGroup>
        </Stack>
        <DataGrid 
        columns={columns}
        rows={rows}
        onRowsChange={setRows}
        onRowDoubleClick={(row) => {
          console.log('deleted row:\n' + row);
          deleteRow(row);
        }}
        defaultColumnOptions={{resizable: true, minWidth: 110, maxWidth:210}}
        style={{height: 590}}/>
      </> )}
    </>
  );
}
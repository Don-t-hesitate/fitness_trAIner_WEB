import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal";
import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FoodExcel from "./FoodExcel";

function PreferenceManage() {
  // // 선호도 데이터를 저장할 상태
  // const [preferenceData, setPreferenceData] = useState(null);
  // // 현재 페이지 번호를 저장할 상태 및 보여줄 회원 수를 저장할 상태
  // const [currentPage, setCurrentPage] = useState(1);
  // const [preferencesPerPage] = useState(12);
  // // 페이지 이동을 위한 navigate 함수
  // const navigate = useNavigate();

  // // 컴포넌트가 마운트될 때 한 번만 실행
  // useEffect(() => {
  //   const fetchPreferenceData = async () => {
  //     try {
  //       console.log("fetchPreferenceData");
  //       const response = await axios.get(process.env.REACT_APP_API_URL_BLD + "/admin/food/preferences"); // 서버에서 선호도 데이터를 가져옴
  //       setPreferenceData(response.data.result); // 선호도 데이터를 상태에 저장
  //       if (response.data.success) {
  //         console.log(response.data.message);
  //       } else {
  //         console.log("fail");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching preference data:", error);
  //     }
  //   };
  //   fetchPreferenceData(); // 선호도 데이터 가져오는 함수 실행
  // }, []);

  // // preferenceData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  // if (!preferenceData) {
  //   return <LoadingModal data={preferenceData} />;
  // }

  // const handleRowClick = (userId) => {
  //   // 회원 ID를 파라미터로 전달하여 회원 정보 페이지로 이동
  //   navigate(`/preference/${userId}`);
  // };

  // // 현재 페이지에 해당하는 사용자 목록 계산

  // const indexOfLastPreference = currentPage * preferencesPerPage;
  // const indexOfFirstPreference = indexOfLastPreference - preferencesPerPage;
  // const currentPreferences = preferenceData.slice(indexOfFirstPreference, indexOfLastPreference);

  // // 페이지 번호 클릭 시 실행되는 함수
  // const handlePageClick = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // // 페이지네이션에 표시할 페이지 번호 계산
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(preferenceData.length / preferencesPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon fontSize="sm" />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none" // hover는 마우스를 올렸을 때 밑줄이 생기는 것
            color="neutral"
            href="/dashboard"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            선호 음식 관리
          </Typography>
        </Breadcrumbs>
      </Box>
      <Row>
        <Col>
          <h2 style={{fontWeight: '800', marginBottom: '24px'}}>선호 음식 관리</h2>
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>식별 번호</th>
                <th>회원 ID</th>
                <th>회원 닉네임</th>
                <th>맛 취향</th>
                <th>음식 종류 취향</th>
              </tr>
            </thead>
            <tbody>
              {currentPreferences.map((preference, index) => (
                <tr key={index} onClick={() => handleRowClick(preference.userId)}>
                  <td>{preference.userId}</td>
                  <td>{preference.username}</td>
                  <td>{preference.nickname}</td>
                  <td>{preference.tastePreference}</td>
                  <td>{preference.preferenceTypeFood}</td>
                </tr>
              ))}
            </tbody>
          </Table> */}
          {/* <Pagination>
            {pageNumbers.map((number) => (
              <Pagination.Item 
                key={number} 
                active={number === currentPage}
                onClick={() => handlePageClick(number)}
              >
                {number}
              </Pagination.Item>
            ))}
          </Pagination> */}
          <FoodExcel apiDestination={"/admin/food/preferences/select_food_list.csv"} />
        </Col>
      </Row>
    </>
  );
}

export default PreferenceManage;
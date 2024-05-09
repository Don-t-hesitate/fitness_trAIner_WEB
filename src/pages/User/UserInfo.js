import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, ButtonGroup, Stack } from 'react-bootstrap';

function UserInfo({ userId }) {
  const [userData, setUserData] = useState(null); // 회원 데이터를 저장할 상태
  const [username, setUsername] = useState(''); // 회원 ID를 저장할 상태
  const [nickname, setNickname] = useState(''); // 회원 별명을 저장할 상태
  const [age, setAge] = useState(''); // 회원 나이를 저장할 상태
  const [height, setHeight] = useState(''); // 회원 키를 저장할 상태
  const [weight, setWeight] = useState(''); // 회원 몸무게를 저장할 상태
  const [gender, setGender] = useState(''); // 회원 성별을 저장할 상태
  const [spicyPreference, setSpicyPreference] = useState(''); // 회원 매운맛 선호도를 저장할 상태
  const [meatConsumption, setMeatConsumption] = useState(''); // 회원 고기 선호여부를 저장할 상태
  const [tastePreference, setTastePreference] = useState(''); // 회원 맛 선호도를 저장할 상태
  const [activityLevel, setActivityLevel] = useState(''); // 회원 활동량을 저장할 상태
  const [preferenceTypeFood, setPreferenceTypeFood] = useState(''); // 회원 선호 음식 타입을 저장할 상태

  // 숫자만 입력 가능하도록 하는 함수의 에러용 상태
  const [ageError, setAgeError] = useState(null);
  const [heightError, setHeightError] = useState(null);
  const [weightError, setWeightError] = useState(null);
  const [spicyPreferenceError, setSpicyPreferenceError] = useState(null);
  const [activityLevelError, setActivityLevelError] = useState(null);
  
  // 페이지 이동을 위한 useNavigate 함수 가져오기
  const navigate = useNavigate();

  const deleteClick = (e) => {
    e.preventDefault();
    const check = window.confirm("정말 삭제하시겠습니까?");
    if (check) {
      handleDelete(e);
    }
  };

  // 회원 정보 삭제 함수
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(process.env.REACT_APP_API_URL + `/admin/${userId}`);
      if (response.data.success) {
        alert(response.data.message);
        navigate('/user');
      } else {
        alert('회원 정보 삭제 실패');
      }
    } catch (error) {
      alert('Error deleting user data:', JSON.stringify(error.response.data.message));
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('gender: ' + gender, '\ngender type: ' + typeof(gender));
    try {
      // PUT 요청을 보내 회원 정보 업데이트
      const response = await axios.put(process.env.REACT_APP_API_URL + `/admin/${userId}`, {
        userId: userId,
        nickname,
        height,
        weight,
        age,
        gender,
        spicyPreference,
        meatConsumption,
        tastePreference,
        activityLevel,
        preferenceTypeFood
      });

      if (response.data.success) {
        // 업데이트 성공 메시지 출력
        alert(response.data.message);
        // navigate(0 , { replace: true });
      } else {
        // 업데이트 실패
        console.error('회원 정보 업데이트 실패');
      }
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error updating user data:', error);
    }
  };

  // 컴포넌트 마운트 및 userId 변경 시 실행되는 hook
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 컴포넌트 마운트 및 userId 변경 시 실행되는 hook
        const response = await axios.get(process.env.REACT_APP_API_URL + `/users/${userId}`);

        let data = response.data.result;
        // data = data.find((user) => user.userId === Number(userId));
        setUserData(data); // 회원 데이터 상태 업데이트
        console.log("data: " + JSON.stringify(data));
        if (data) {
          // 각 필드 상태 업데이트
          setUsername(data.username);
          setNickname(data.nickname);
          setAge(data.age);
          setHeight(data.height);
          setWeight(data.weight);
          setGender(data.gender);
          setSpicyPreference(data.spicyPreference);
          setMeatConsumption(data.meatConsumption);
          setTastePreference(data.tastePreference);
          setActivityLevel(data.activityLevel);
          setPreferenceTypeFood(data.preferenceTypeFood);
        }
      } catch (error) {
        // 에러 발생 시 에러 메시지 출력
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // 회원 데이터 가져오는 함수 실행
  }, [userId]); // userId 변경 시에만 실행되도록 의존성 배열 설정

  // userData가 null인 경우 (데이터 로딩 중) 로딩 메시지 표시
  if (!userData) { 
    return <div>Loading...</div>; 
  }

  // 숫자만 입력 가능하도록 하는 함수
  const handleChange = (e, setValue, setError) => {
    const inputValue = e.target.value;
    const isNumber = /^\d+$/.test(inputValue);

    if (!isNumber && inputValue !== '') {
      setError('숫자(소수점 *제외*)만 입력 가능합니다.');
    } else {
      setError(null);
      setValue(inputValue);
    }
  };

  const handleRnumberChange = (e, setValue, setError) => {
    const inputValue = e.target.value;
    const isNumber = /^\d*\.?\d*$/.test(inputValue); // 실수(소수점 포함) 허용 정규식
  
    if (!isNumber && inputValue !== '') {
      setError('숫자(소수점 *포함*)만 입력 가능합니다.');
    } else {
      setError(null);
      setValue(inputValue);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>format_list_numbered</span>
                <span style={{verticalAlign: "middle"}}> 회원 식별 번호</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={userId} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>signature</span>
                <span style={{verticalAlign: "middle"}}> 회원 ID</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={username || ''} disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>star</span>
                <span style={{verticalAlign: "middle"}}> 회원 별명</span>
                </Form.Label>
              <Col sm="9">
                <Form.Control value={nickname || ''} onChange={(e) => setNickname(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>update</span>
                <span style={{verticalAlign: "middle"}}> 회원 나이</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={age || ''} onChange={(e) => handleChange(e, setAge, setAgeError)} isInvalid={!!ageError} />
                <Form.Control.Feedback type="invalid">{ageError}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>straighten</span>
                <span style={{verticalAlign: "middle"}}> 회원 키</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={height || ''} onChange={(e) => handleRnumberChange(e, setHeight, setHeightError)} isInvalid={!!heightError} />
                <Form.Control.Feedback type="invalid">{heightError}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>scale</span>
                <span style={{verticalAlign: "middle"}}> 회원 몸무게</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={weight || ''} onChange={(e) => handleRnumberChange(e, setWeight, setWeightError)} isInvalid={!!weightError} />
                <Form.Control.Feedback type="invalid">{weightError}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className="material-symbols-outlined" style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>wc</span>
                <span style={{verticalAlign: "middle"}}> 회원 성별</span>
              </Form.Label>
              <Col sm="9" className="mt-2">
                <Form.Check
                  inline
                  label="Female"
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value='female'
                  defaultChecked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Male"
                  type="radio"
                  id="gender-male"
                  name="gender"
                  value='male'
                  defaultChecked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>onsen</span>
                <span style={{verticalAlign: "middle"}}> 매운맛 선호도</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={spicyPreference} onChange={(e) => handleChange(e, setSpicyPreference, setSpicyPreferenceError)} isInvalid={!!spicyPreferenceError} />
                <Form.Control.Feedback type="invalid">{spicyPreferenceError}</Form.Control.Feedback>
              </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>egg_alt</span>
                <span style={{verticalAlign: "middle"}}> 육류 선호 여부</span>
              </Form.Label>
              <Col sm="9" className="mt-2">
                <Form.Check
                  inline
                  label="True"
                  type="radio"
                  id="meatConsumption-true"
                  name="meatConsumption"
                  value={true}
                  defaultChecked={meatConsumption === true}
                  onChange={(e) => setMeatConsumption(e.target.value)}
                />
                <Form.Check
                  inline
                  label="False"
                  type="radio"
                  id="meatConsumption-false"
                  name="meatConsumption"
                  value={false}
                  defaultChecked={meatConsumption === false}
                  onChange={(e) => setMeatConsumption(e.target.value)}
                />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>recommend</span>
                <span style={{verticalAlign: "middle"}}> 선호하는 맛</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={tastePreference || ''} onChange={(e) => setTastePreference(e.target.value)} />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>directions_run</span>
                <span style={{verticalAlign: "middle"}}> 활동량</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={activityLevel} onChange={(e) => handleChange(e, setActivityLevel, setActivityLevelError)} isInvalid={!!activityLevelError} />
                <Form.Control.Feedback type="invalid">{activityLevelError}</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="3">
                <span className='material-symbols-outlined' style={{verticalAlign: "middle", marginRight: "5px", fontVariationSettings: "'FILL' 1"}}>menu_book</span>
                <span style={{verticalAlign: "middle"}}> 선호 음식 종류</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control value={preferenceTypeFood || ''} onChange={(e) => setPreferenceTypeFood(e.target.value)} />
              </Col>
            </Form.Group>
            <Stack direction="horizontal">
              <ButtonGroup className="pt-2 ms-auto">
                <Button variant="primary" type="submit" style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>edit</span>
                  <span style={{verticalAlign: "middle"}}> 정보 수정</span>
                </Button>
                <Button variant="danger" onClick={deleteClick} style={{fontWeight: "bold"}}>
                  <span className="material-symbols-outlined" style={{verticalAlign: "middle"}}>delete</span>
                  <span style={{verticalAlign: "middle"}}> 회원 탈퇴</span>
                </Button>
              </ButtonGroup>
            </Stack>
          </Form>
        </Col>
      </Row>
      
    </Container>
  );
}

export default UserInfo;
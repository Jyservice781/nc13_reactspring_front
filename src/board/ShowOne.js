import {useParams} from "react-router-dom";
import axios from 'axios'
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";


let ShowOne = () => {
    // axios 사용 - 비동기 통신
    // 게시글 id 받아오기
    // useLocation -> 무조건 ?값이 어딘가 있어야 받아옴
    // useParams -> 주소에 어딘가에 :id 를 적어주고 해당 파라미터를 받아올때 사용한다.
    let params = useParams()
    let [data, setData] = useState({})
    let id = parseInt(params.id)

    // ---------------------------------|     axios 사용할 거임    |-----------------------------------------

    // await  을 사용할 때는 반드시 비동기화 함수(async) 아래에서 사용을 해야한다.
    // test 는 비동기화 함수이기 때문에 async 를 붙여준다.

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/board/showOne' + id, {})
                if (resp.status === 200) {
                    setData(resp.data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        selectOne()
    }, [])

    return (
        <Container className={"mt-3"}>
            <Row className="justify-content-center">
                <Col xs md lg={6} style={{backgroundColor: 'white'}}>
                    <Table striped bordered hover>
                        <tr>
                            <td colSpan={2}>제목: {data.title}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>글 번호: {data.id}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>작성자: {data.nickname}</td>
                        </tr>
                        <tr>
                            <td>글 작성일: {data.entryDate}</td>
                            <td>글 수정일: {data.modifyDate}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>내용 </td>
                        </tr>
                        <tr>
                            <td>{data.content}</td>
                        </tr>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default ShowOne;
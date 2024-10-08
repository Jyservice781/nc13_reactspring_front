import {useLocation, useNavigate, useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import {Pagination} from "react-bootstrap";


let ShowList = () => {
    // -----------  security 설정값 -> user 정보 받아올 애임  -----------------
    let location = useLocation()
    let userInfo = location.state.userInfo


    //  ---------------------------------------------------------------------


    let params = useParams()
    let pageNo = params.pageNo

    let [data, setData] = useState({boardList: []})
    let navigate = useNavigate()

    let moveToSingle = (id) => {
        navigate('/board/showOne/' + id, {state: {userInfo: userInfo}})
    }

    let moveToPage = (pageNo) => {
        navigate(`/board/showList/` + pageNo, {state: {userInfo: userInfo}})
    }

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/board/showList/" + pageNo, {
                    withCredentials: true

                })
                // boardList 에서 user 사용자의 정보를
                // 필요로 하기 때문에 넣어준다
                .catch((e) => {
                    // 에러 발생시에 catch 를 통해서 어떠한 행동을 할지 지정해줄 수 있다.
                    console.error(e)
                    moveToPage(1)
                })

            // html 통신을 할때 문제가 없으면 200 이 나온다.
            if (resp.status === 200) {
                setData(resp.data)
            }
        }
        selectList();

    }, [pageNo])

    return (
        <Container className={"mt-3"}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>글 번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                </tr>
                </thead>
                <tbody>
                {data.boardList.map(b => (
                    <TableRow board={b} key={b.id} moveToSingle={moveToSingle}/>
                ))}
                <tr>
                    <td colSpan={3} className={"text-center"}>
                        <MyPagination startPage={data.startPage}
                                      endPage={data.endPage}
                                      currentPage={data.currentPage}
                                      maxPage={data.maxPage}
                                      moveToPage={moveToPage}
                        />
                    </td>
                </tr>

                </tbody>
            </Table>
        </Container>
    )
}

let TableRow = ({board, moveToSingle}) => {
    return (
        <tr onClick={() => moveToSingle(board.id)}>
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.nickname}</td>
        </tr>
    )
}

let MyPagination = ({startPage, endPage, currentPage, moveToPage, maxPage}) => {
    let items = []
    for (let i = startPage; i <= endPage; i++) {
        items.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => moveToPage(i)}>
                {i}
            </Pagination.Item>
        );
    }

    return (
        <Pagination className={"justify-content-center"}>
            <Pagination.First onClick={() => {
                moveToPage(1)
            }}/>
            {items}
            <Pagination.Last onClick={() => {
                moveToPage(maxPage)
            }}/>
        </Pagination>
    )
}

export default ShowList;
import {useParams} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';


let ShowList = () => {
    let params = useParams()
    let pageNo = params.pageNo

    let [data, setData] = useState({})

    useEffect(() => {
        let selectList = async () => {
            let resp = await axios
                .get("http://localhost:8080/board/showList/" + pageNo, {})
                .catch((e) => {
                    // 에러 발생시에 catch 를 통해서 어떠한 행동을 할지 지정해줄 수 있다.
                    console.error(e)
                    window.location.href = '/board/showList/1'
                })

            // html 통신을 할때 문제가 없으면 200 이 나온다.
            if (resp.status === 200) {
                setData(resp.data)
            }
        }

        selectList();
    }, [])

    return (
        <Container className={"mt-3"}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>글 번호</td>
                    </tr>
                </thead>
                {data.boardList?.map( b => (
                    <TableRow board={b} />
                ))}
            </Table>
        </Container>
    )
}

let TableRow = ({board}) => {
    return (
        <tr>
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.nickname}</td>
        </tr>
    )
}

export default ShowList;
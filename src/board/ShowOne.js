import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Table} from "react-bootstrap";


let ShowOne = () => {
    // axios 사용 - 비동기 통신
    // 게시글 id 받아오기
    // useLocation -> 무조건 ?값이 어딘가 있어야 받아옴
    // useParams -> 주소에 어딘가에 :id 를 적어주고 해당 파라미터를 받아올때 사용한다.
    let params = useParams()
    let [data, setData] = useState({})
    let id = parseInt(params.id)

    // user 가 해당 location 에 userInfo 를 넣어서 해당 내용을
    // 확인 할 수 있도록 접근을 허용함. -> security 설정값 넣고 난 이후 사용자가 접근 할 수 있는지에 대한 설정이 필요하다.
    let location = useLocation()
    let userInfo = location.state.userInfo

    let navigate = useNavigate()
    // 페이지 이동을 시킬 때 사용함 태그 형식이 아니라 함수의 형태로 이동시킬떄 사용 가능하다.
    let goBack = () => {
        navigate('/board/showList/1', {state: {userInfo: userInfo}})
    }

    let onUpdate = () => {
        navigate('/board/update/' + id, {state: {userInfo: userInfo}})
    }

    let onDelete = () => {
        navigate('/board/delete/' + id)
    }


    // ---------------------------------|     axios 사용할 거임    |-----------------------------------------

    // await  을 사용할 때는 반드시 비동기화 함수(async) 아래에서 사용을 해야한다.
    // test 는 비동기화 함수이기 때문에 async 를 붙여준다.

    useEffect(() => {
        let selectOne = async () => {
            try {
                let resp = await axios.get('http://localhost:8080/board/showOne/' + id, {
                    withCredentials: true
                })
                if (resp.status === 200) {
                    setData(resp.data)
                }
            } catch (error) {
                console.error(error)
            }
        }
        selectOne()
    }, [])

    let onLogOut = async () => {
        let response = await axios.post('http://localhost:8080/user/logOut', {
           withCredentials: true
        })

        if (response.status === 200) {
           navigate("/")
        }

    }

    return (
        <Container className={"mt-3"}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <td colSpan={2} className={'text-end'}>
                        <Button onClick={onLogOut}>로그아웃</Button>
                    </td>
                </tr>
                </thead>
                <tbody>
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
                    <td colSpan={2}>내용</td>
                </tr>
                <tr>
                    <td colSpan={2}>{data.content}</td>
                </tr>
                {data.writerId === userInfo.id ?
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button className={'m-2'} onClick={onUpdate}>수정하기</Button>
                            <Button>삭제하기</Button>
                        </td>
                    </tr>
                    : null}
                <tr>
                    <td colSpan={2} className={"text-center"}>
                        <Button variant="outline-primary" onClick={goBack}>뒤로가기</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ShowOne;
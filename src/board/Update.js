import {Button, Container, FormControl, Table} from "react-bootstrap";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

let Update = () => {
    let params = useParams()
    let id = params.id

    // -----------  user 정보 가져오기  -------------
    let location = useLocation()
    let userInfo = location.state.userInfo


    let [inputs, setInputs] = useState({
        title: '',
        content: ''
    })
    // 기존의 데이터를 가져오기
    useEffect(() => {
        let getUpdate = async () => {
            let resp = await axios.get('http://localhost:8080/board/showOne/' + id, {
                withCredentials: true
            })

            if (resp.status === 200) {
                setInputs(resp.data)
            }
        }
        getUpdate()
    }, [])

    //수정하기 버튼 눌렀을때 처리
    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let navigate = useNavigate()
    let moveToNext = (id) => {
        navigate(`/board/showOne/${id}`, {state: {userInfo: userInfo}})
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        // 강제로 때려박는 행위를 막음.
        if (inputs.writerId === userInfo.id) {
            let resp = await axios.post('http://localhost:8080/board/update', inputs, {
                withCredentials: true
            })
            if (resp.status === 200) {
                moveToNext(resp.data.destId)
            }
        }
    }


    return (
        <Container>
            <form onSubmit={onSubmit}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <td colSpan={2} className={'text-center'}>{id}번 글 수정하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td><FormControl type={'text'} name={'title'}
                                         value={inputs.title} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                        <textarea name={'content'} className={'form-control'}
                                  value={inputs.content} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button type={'submit'}>
                                수정하기
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}

export default Update;
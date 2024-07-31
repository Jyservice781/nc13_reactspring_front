import {useState} from "react";
import {Button, Container, FormControl, Table} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

let Write = () => {
    let [inputs, setInputs] = useState({
        title: '',
        content: ''
    })

    let navigate = useNavigate()

    let moveToNext = (id) => {
        navigate(`/board/showOne/${id}`)
    }

    let onChange = (e) => {
        let {name, value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    let onSubmit = async (e) => {
        e.preventDefault()
        try {
            let resp = await axios.post("http://localhost:8080/board/write", inputs)

            if(resp.data.resultId !== undefined){
                moveToNext(resp.data.resultId)
            }
        } catch (error){
            console.log(error)
        }
    }

    return (
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit}>
                <Table striped hover>
                    <thead>
                    <tr>
                        <td colSpan={2} className={'text-center'}>글 작성하기</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td><FormControl type={'text'} value={inputs.title}
                                         name={'title'} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea name={'content'} value={inputs.content}
                                      className={"form-control"} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <Button variant="primary" type={'submit'}>
                                작성하기
                            </Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )

}

export default Write;
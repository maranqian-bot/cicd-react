import Header from "../components/Header";
import {useState} from "react";
import {registerMemberMutation} from "../query/registerMemberMutation"

function Register() {
    const registerMutation = registerMemberMutation();

    const [formData, setFormData] = useState({
        userName: '',
        userId: '',
        email: '',
        password: '',
        passwordCheck: '' 
    }); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("handleChange name: ", name);
        console.log("handleChange value: ", value);

        setFormData({ ...formData, [name]: value})
        console.log(formData);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        // TanStack Query 호출
        registerMutation.mutate(formData);
    } 

    return (
        <>
            <Header />
            <div className="container">
                <div className="form-card">
                    <h2>회원가입</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label>이름</label>
                            <input type="text" 
                                    placeholder="이름을 입력하세요" 
                                    required=""
                                    name="userName"
                                    onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>아이디</label>
                            <input
                                type="text"
                                placeholder="사용할 아이디를 입력하세요"
                                required=""
                                name="userId"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>이메일</label>
                            <input type="email" 
                                    placeholder="이메일을 입력하세요" 
                                    required="" 
                                    name="email"
                                    onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label>비밀번호</label>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                required=""
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>비밀번호 확인</label>
                            <input
                                type="password"
                                placeholder="비밀번호를 다시 입력하세요"
                                required=""
                                name="passwordCheck"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                가입하기
                            </button>
                            <a
                                href="index.html"
                                className="btn btn-secondary"
                                style={{ textDecoration: "none", textAlign: "center" }}
                            >
                                취소
                            </a>
                        </div>
                    </form>
                    <div className="form-link">
                        이미 계정이 있으신가요? <a href="login.html">로그인</a>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Register;
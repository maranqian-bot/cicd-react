import { useState } from "react";
import Header from "../components/Header";
import { useLoginMemberMutation } from "../query/loginMemberMutation";

function Login() {
    const loginMutation = useLoginMemberMutation();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        loginMutation.mutate({
            userId: userId,
            password: password
        })
    } 

    return (
        <>
            <Header />
            <div className="container">
                <div className="form-card">
                    <h2>로그인</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>아이디</label>
                            <input
                                type="text"
                                placeholder="사용자 아이디를 입력하세요"
                                required=""
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>비밀번호</label>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                required=""
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                로그인
                            </button>
                        </div>
                    </form>
                    <div className="form-link">
                        <a href="find-id.html">아이디 찾기</a> |
                        <a href="find-password.html">비밀번호 찾기</a>
                    </div>
                    <div className="form-link">
                        계정이 없으신가요? <a href="register.html">회원가입</a>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Login;
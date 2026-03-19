import { Link, useLocation } from "react-router-dom";
import { useCheckMemberQuery } from "../query/checkMemberQuery";
import useUserStore from "../store/userStore";
import { useEffect } from "react";
import { useLogoutMemberMutation } from "../query/logoutMemberMutation";
import { useQueryClient } from "@tanstack/react-query";

function Header() {
    const location = useLocation();
    const { data, isLoading, error } = useCheckMemberQuery();
    const logoutMemberMutation = useLogoutMemberMutation();
    const { currentUser, setCurrentUser } = useUserStore();
    const queryClient = useQueryClient();


    useEffect(() => {
        setCurrentUser(data);
    }, [data])

    const isActive = (path) => {
        return location.pathname === path ? 'nav-link active' : 'nav-link';
    }

    const handleLogout = () => {
        logoutMemberMutation.mutate();

        queryClient.removeQueries({
            queryKey: ["checkMember"]
        });
    };

    return (
        <header>
            <nav>
                <div className="logo">Spring Hub</div>
                <ul className="nav-center">
                    <li><Link to="/" className={isActive('/')}>홈</Link></li>
                    <li><Link to="/notice/list" className={isActive('/notice/list')}>공지사항</Link></li>
                    <li><Link to="/free" className={isActive('/free')}>자유게시판</Link></li>
                    <li><Link to="/profile" className={isActive('/profile')}>회원정보</Link></li>
                </ul>
                <div className="nav-right">
                    {!currentUser &&
                        <>
                            <Link to="/login" className="btn btn-secondary">로그인</Link>
                            <Link to="/register" className="btn btn-primary" style={{textDecoration: 'none', display: 'inline-block'}}>회원가입</Link>
                        </>
                    }
                    {currentUser &&
                        <>
                            <button className="btn btn-primary" style={{textDecoration: 'none', display: 'inline-block', cursor:'pointer'}}
                            onClick={handleLogout}>로그아웃</button>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header;
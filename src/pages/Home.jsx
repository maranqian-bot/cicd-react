import Header from "../components/Header";

function Home() {
    return (
        <>
            <Header />

            <div className="container">
                <h1 style={{ marginBottom: "1rem" }}>
                    Spring 학습 플랫폼에 오신 것을 환영합니다
                </h1>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        marginBottom: "2rem",
                        fontSize: "1.1rem"
                    }}
                >
                    이 플랫폼에서 Spring 백엔드 개발의 기본 개념을 실습할 수 있습니다.
                </p>
                <div className="card-grid">
                    <a
                        href="announcements.html"
                        className="card"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <h3>📢 공지사항</h3>
                        <p style={{ color: "var(--text-secondary)" }}>
                            최신 소식과 업데이트를 확인하세요
                        </p>
                    </a>
                    <a
                        href="board.html"
                        className="card"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <h3>💬 자유게시판</h3>
                        <p style={{ color: "var(--text-secondary)" }}>
                            다른 학습자들과 소통하세요
                        </p>
                    </a>
                    <a
                        href="profile.html"
                        className="card"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <h3>👤 회원정보</h3>
                        <p style={{ color: "var(--text-secondary)" }}>프로필 정보를 관리하세요</p>
                    </a>
                </div>
            </div>

        </>


    )
}

export default Home;
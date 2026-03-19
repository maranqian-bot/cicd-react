import Header from "../components/Header"
import { useNoticeListHook } from "../hooks/useNoticeListHook";
import useUserStore from "../store/userStore";
import { Link  } from "react-router-dom";

// pages, components : UI 렌더링
//  - pages가 기본 (react-router가 접근하는 페이지)
//  - compoenents : 재사용이 필요한 UI (ex. Header)
function NoticeList() {
    const { noticeList,
        currentPage,
        totalPages,
        isLoading,
        isError,
        error,
        handlePageChange,
        goToFirstPage,
        goToPrevPage,
        goToLastPage,
        goToNextPage,
        pageNumbers,
        goToDetail } = useNoticeListHook();

    // 로그인 상태 가져오기
    //       key: 내가쓸변수명
    const { currentUser } = useUserStore();
    const isLogin = currentUser;

    // 로딩중일때 보여줄 UI 렌더링
    if (isLoading) {
        return (
            <>
                <Header />
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem"
                        }}
                    >
                        <h1>공지사항</h1>
                        {/* 글쓰기 버튼 추가 */}
                        {isLogin && <a href="announcement-write.html"
                            className="btn btn-primary"
                            style={{ textDecoration: "none" }}>
                            글쓰기
                        </a>
                        }
                    </div>

                    <div style={{ textAlign: 'center' }}>로딩중...</div>
                </div>
            </>
        )
    }

    // 에러가 발생했을 때 UI 렌더링
    if (isError) {
        return (
            <>
                <Header />
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "2rem"
                        }}
                    >
                        <h1>공지사항</h1>
                        {/* 글쓰기 버튼 추가 */}
                        {isLogin && <a href="announcement-write.html"
                            className="btn btn-primary"
                            style={{ textDecoration: "none" }}>
                            글쓰기
                        </a>
                        }
                    </div>

                    <div style={{ textAlign: 'center' }}>알 수 없는 오류가 발생했습니다.</div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="container">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "2rem"
                    }}
                >
                    <h1>공지사항</h1>
                    {/* 글쓰기 버튼 추가 */}
                    {isLogin && <Link to="/notice/write"
                    
                        className="btn btn-primary"
                        style={{ textDecoration: "none" }}>
                        글쓰기
                    </Link>
                    }
                </div>

                {noticeList.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>등록된 공지사항이 없습니다.</div>
                ) : (
                    <div className="post-list" id="announcementList">
                        {noticeList.map((post) => (
                            <div className="post-item" 
                                key={post.id}
                                onClick={() => goToDetail(post.id)}>
                                <div className="post-header">
                                    <div>
                                        <div className="post-title">{post.title}</div>
                                        <div className="post-content">
                                            {post.content}
                                        </div>
                                    </div>
                                    <span className="badge">{post.category}</span>
                                </div>
                                <div className="post-footer">
                                    <span>{post.writerName}</span>
                                    <span>{post.createdAt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* 페이징 버튼 추가 */}
                {totalPages > 1 && (
                <div className="pagination">
                    <button className="page-btn" onClick={goToFirstPage}>
                        &lt;&lt;
                    </button>
                    <button className="page-btn" onClick={goToPrevPage}>
                        &lt;
                    </button>
                    {pageNumbers.map((pageNum) =>(
                        <button key={pageNum}
                        className={`page-btn ${currentPage === pageNum ? 'active' : ''}`} 
                        onClick={() => handlePageChange(pageNum)}>
                            {pageNum}
                        </button>
                    ))}
                    <button className="page-btn" onClick={goToNextPage}>
                        &gt;
                    </button>
                    <button className="page-btn" onClick={goToLastPage}>
                        &gt;&gt;
                    </button>
                </div>
                )}
            </div>
        </>
    )
}

export default NoticeList;
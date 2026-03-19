import { useState } from "react";
import Header from "../components/Header";
import { useNoticeDetailHook } from "../hooks/useNoticeDetailHook";

function NoticeDetail() {
    const { data, 
            postId,
            isLoading,
            isError,
            error,
            isWriterCheck,
            currentUser,
            goToList,
            goToEdit,
            deletePost,
            closeDeleteModal,
            confirmDelete,
            showDeleteModal} = useNoticeDetailHook();


    // 로딩중일 때
    if(isLoading){
        return(
            <>
            <Header />
            <div className="container">
                <div style={{textAlign:'center'}}>로딩중...</div>
            </div>
            </>
        )
    }

    // 에러가 발생했을 때
    if(isError){
        return(
            <>
            <Header />
            <div className="container">
                <div style={{textAlign:'center'}}>알수 없는 오류가 발생했습니다.</div>
            </div>
            </>
        )
    }

    // 존재하지 않는 게시글일 때
    if(! data){
        return(
            <>
            <Header />
            <div className="container">
                <div style={{textAlign:'center'}}>게시글을 찾을 수 없습니다.</div>
            </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="container">
                <button
                    onClick={goToList}
                    style={{
                        color: "var(--accent)",
                        textDecoration: "none",
                        marginBottom: "1rem",
                        display: "inline-block"
                    }}
                >
                    ← 목록으로 돌아가기
                </button>
                <div className="post-detail">
                    <div className="detail-header">
                        <div>
                            <h1 id="detailTitle">{data.title}</h1>
                            <div className="detail-meta">
                                <span id="detailAuthor">{data.writerName}</span>
                                <span id="detailDate">{data.createdAt}</span>
                                {/* 조회수 추가 */}
                                <span id="detailViews">조회수 {data.viewCount}</span>
                            </div>
                        </div>
                        {/* 수정, 삭제 버튼 추가 */}
                        {isWriterCheck && (
                        <div className="detail-actions">
                            <button
                                onClick={goToEdit}
                                className="btn btn-secondary"
                                style={{ textDecoration: "none" }}
                            >
                                수정
                            </button>
                            <button className="btn btn-secondary" onClick={deletePost}>
                                삭제
                            </button>
                        </div>
                        )}
                    </div>
                    {data.files.length > 0 && (
                        <div id="detailImage" style={{ margin: "2rem 0" }}>
                            <img
                            src={`http://localhost:8080${data.files[0].filePath}`}
                                style={{width: 200, height: 200}}
                                ></img>
                        </div>
                    )}
                    <div id="detailContent" className="detail-content">
                        {/* 상세 내용 */}
                        {data.content}
                    </div>
                </div>
                {/* 댓글 섹션 */}
                <div className="comments-section">
                    <h2>
                        댓글 (<span id="commentCount">0</span>)
                    </h2>
                    <div className="comment-form">
                        <textarea
                            id="commentInput"
                            placeholder="댓글을 입력하세요"
                            rows={3}
                            defaultValue={""}
                        />
                        <button className="btn btn-primary" onclick="submitComment()">
                            댓글 작성
                        </button>
                    </div>
                    <div id="commentsList" className="comments-list">
                        {/* 댓글 목록 */}
                    </div>
                </div>
            </div>
                <>
            {/* 삭제 확인 모달 */}
            {showDeleteModal && (
            <div className="modal" onClick={closeDeleteModal} id="deleteModal">
                <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                >
                <h2 style={{ marginBottom: "1.5rem" }}>게시글 삭제</h2>
                <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
                    정말 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </p>
                <div className="form-actions">
                    <button
                    className="btn btn-primary"
                    onClick={confirmDelete}
                    style={{ backgroundColor: "var(--error)" }}
                    >
                    삭제
                    </button>
                    <button className="btn btn-secondary" onClick={closeDeleteModal}>
                    취소
                    </button>
                </div>
                </div>
            </div>
            )}
            </>

        </>
    )
}
export default NoticeDetail;
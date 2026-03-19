import { useState } from "react";
import Header from "../components/Header";
import { useQuillEditorHook } from "../hooks/useQuillEditorHook";
import { useFileUploadHook } from "../hooks/useFileUploadHook";
import { Link, useNavigate } from "react-router-dom";
import { useNoticeCreateMutation } from "../query/NoticeCreateMutation";

function NoticeWrite() {
    const navigate = useNavigate();
    const { selectedFiles, imagePreview, handleImageChange } = useFileUploadHook();  
    const {quillRef } = useQuillEditorHook();
    const [category, setCategory] = useState('');
    const[title, setTitle] = useState('');
    const noticeCreateMutation = useNoticeCreateMutation();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const content = quillRef.current.root.innerHTML; // 내용 가져오기

        const formData = new FormData();
        formData.append("title",title);
        formData.append("content", content);
        formData.append("category", category);

        selectedFiles.forEach(file => {
            formData.append("files",file);
        })

        //API요청
        noticeCreateMutation.mutate(formData);
    }


    return (
        <>
            <Header />
            <div className="container">
                <h1 style={{ marginBottom: "2rem" }}>공지사항 작성</h1>
                <div className="form-card" style={{ maxWidth: 800 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>분류</label>
                            <select
                                id="announcementCategory"
                                onChange={(e) => setCategory(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    border: "1px solid var(--border)",
                                    borderRadius: "0.5rem"
                                }}
                            >
                                <option value="공지">공지</option>
                                <option value="점검">점검</option>
                                <option value="이벤트">이벤트</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>제목</label>
                            <input
                                type="text"
                                id="announcementTitle"
                                placeholder="공지사항 제목을 입력하세요"
                                required=""
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>내용</label>
                            <div id="noticeEditor" className="editor-container" />
                        </div>
                        <div className="form-group">
                            <label>이미지 업로드</label>
                            <input type="file" id="announcementImage" accept="image/*"
                                    onChange={handleImageChange}/>
                            {imagePreview && (
                                <img src={imagePreview} alt="" />
                            )}
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                작성
                            </button>
                            <Link
                                to="/notice/list"
                                className="btn btn-secondary"
                                style={{ textDecoration: "none" }}
                            >
                                취소
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default NoticeWrite;
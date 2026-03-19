import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { noticeEditApi } from "../api/boardApi";
import { useQuillEditorHook } from "./useQuillEditorHook";

export const useNoticeEditHook = (postId, boardDTO) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [category, setCategory] = useState("공지");
    const [title, setTitle] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { quillRef, editorReady } = useQuillEditorHook(boardDTO?.content || "");

    useEffect(() => {
        if (boardDTO) {
            setCategory(boardDTO.category || "공지");
            setTitle(boardDTO.title || "");
        }
    }, [boardDTO]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }

        if (!editorReady || !quillRef.current) {
            alert("에디터가 준비되지 않았습니다.");
            return;
        }

        const content = quillRef.current.root.innerHTML;

        if (!content.trim() || content === "<p><br></p>") {
            alert("내용을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("category", category);

            selectedFiles.forEach((file) => {
                formData.append("files", file);
            });

            await noticeEditApi(postId, formData);

            queryClient.invalidateQueries({ queryKey: ["noticeDetail", postId] });
            queryClient.invalidateQueries({ queryKey: ["noticeList"] });

            alert("공지사항이 수정되었습니다.");
            navigate(`/notice/detail/${postId}`);
        } catch (error) {
            console.error("[NoticeEdit] 수정 실패:", error);

            if (error.response) {
                const errorMessage =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    "게시글 수정 중 오류가 발생했습니다.";
                alert(errorMessage);

                if (error.response.status === 401 || error.response.status === 403) {
                    navigate("/login");
                }
            } else if (error.request) {
                alert("서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
            } else {
                alert("요청 처리 중 오류가 발생했습니다: " + error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        category,
        setCategory,
        title,
        setTitle,
        selectedFiles,
        setSelectedFiles,
        imagePreview,
        setImagePreview,
        isSubmitting,
        quillRef,
        editorReady,
        handleImageChange,
        handleSubmit
    };
};
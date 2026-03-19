        import { useMutation, useQueryClient } from "@tanstack/react-query";
        import { useNavigate } from "react-router-dom";
        import { noticeEditApi } from "../api/boardApi";
        import { useNoticeEditMutation } from "../query/NoticeEditMutation";

        export const useNoticeEditMutation = (postId, setIsSubmitting) => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();

        return useMutation({
            mutationFn: (formData) => noticeEditApi(postId, formData),

            onMutate: () => {
            setIsSubmitting(true);
            },

            onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["noticeDetail", postId] });
            queryClient.invalidateQueries({ queryKey: ["noticeList"] });
            alert("공지사항이 수정되었습니다.");
            navigate(`/notice/detail/${postId}`);
            },

            onError: (error) => {
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
            },

            onSettled: () => {
            setIsSubmitting(false);
            }
        });
        };
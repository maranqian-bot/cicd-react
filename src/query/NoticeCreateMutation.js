import { useMutation, useQueryClient } from "@tanstack/react-query"
import { noticeCreateApi } from "../api/boardApi"
import { useNavigate } from "react-router-dom";

export const useNoticeCreateMutation = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (formData) => { noticeCreateApi(formData)},
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['noticeList']
            })
            alert('게시글이 등록되었습니다.');
            navigate('/notice/list');
        }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { noticeDeleteApi, noticeDetailApi } from "../api/boardApi"

// 게시글 삭제
export const useNoticeDeleteMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(postId) => noticeDetailApi(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({

                queryKey : ['noticeDetail']
            })
        }
    })
}
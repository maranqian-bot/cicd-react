import { noticeGoEditPageApi } from "../api/boardApi";
import { useQuery } from "@tanstack/react-query";

// 공지사항 수정 페이지 이동 데이터 조회 Query
    export const useNoticeEditFormQuery = (id) => {
    return useQuery({
        queryKey: ['noticeEdit', id],
        queryFn: () => noticeGoEditPageApi(id),
        enabled: !!id, // id가 있을 때만 실행
        staleTime: 0, // 수정 페이지는 항상 최신 데이터를 가져와야 함
        retry: 1,
    });
    };

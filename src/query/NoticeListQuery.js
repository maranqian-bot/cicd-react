import { useQuery } from "@tanstack/react-query"
import { noticeListApi} from "../api/boardApi"

export const useNoticeListQuery = (page = 1) => {

    return useQuery ({
        queryKey:['noticeList', page], // 해당 쿼리의 캐시 키(식별자)
        queryFn: ()=> noticeListApi(page), // 실제 API 요청을 수행하는 함수
        staleTime:30000, // 30초간 유지,
        retry: 1
    })
} 
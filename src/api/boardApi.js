import axiosInstance from "./axiosInstance"

// 공지사항 목록 조회
export const noticeListApi = async(page = 1) => {
    const response = await axiosInstance.get("/api/board/notice",{
        params: {
            page: page,
        },
        withCredentials:true
    })
    return response.data;
}

// 공지사항 상세보기 조회
export const noticeDetailApi = async(postId) => {
    try{
        const response = await axiosInstance.get(`/api/board/notice/${postId}`,{
            withCredentials:true
        })
        return response.data;
    }catch(err){
        // 서버가 응답을 했을때 상태 코드가 4xx, 5xx
        if(err.response){
            console.error('응답 데이터:',err.response.data);
            throw err;
        }else if(err.request){
            //요청은 보냈는데 서버가 응답을 하지 않았을 때
            console.log('서버가 연결할 수 없습니다.')
            throw err;
        }else {
            // 요청 중 에러 발생했을 때
            console.log('요청 중 에러 발생: ' , err.message);
            throw err;
        }

    }
}


// 
export const noticeDeleteApi = async(postId) => {
    const response = await axiosInstance.delete(`/api/board/notice/${postId}`,{
        withCredentials:true

    });

return response.data;
}

// 공지사항 글 작성
export const noticeCreateApi = async (formData) => {
    const response = await axiosInstance.post("/api/board/notice/create",
                                                formData,
                                                {
                                                    withCredentials:true,
                                                    headers: {
                                                        "Content-Type": "multipart/form-data"
                                                    }
                                                }
    )

    return response.data;
}



// 공지사항 수정 페이지 이동 조회
    export const noticeGoEditPageApi = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/board/notice/${id}`, {
        withCredentials: true, // 세션 쿠키를 포함하기 위해 필요
        });
        console.log('[API] 공지사항 수정용 데이터 조회 성공:', response.data);
        // 백엔드가 boardDTO로 감싸서 반환
        return response.data.boardDTO || response.data;
    } catch (error) {
        console.error('[API] 공지사항 수정용 데이터 조회 실패:', error);
        if (error.response) {
        // 서버가 응답했지만 에러 상태 코드
        console.error('응답 데이터:', error.response.data);
        console.error('상태 코드:', error.response.status);
        throw error;
        } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못함
        console.error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
        } else {
        // 요청 설정 중 에러 발생
        console.error('요청 설정 오류:', error.message);
        throw error;
        }
    }
    };

    // 공지사항 수정 요청
    export const noticeEditApi = async (id, formData) => {
    try {
        console.log(`[API] 공지사항 수정 요청: id=${id}`, formData);
        const response = await axiosInstance.patch(`/api/board/notice/${id}`, formData, {
        withCredentials: true, // 세션 쿠키를 포함하기 위해 필요
        headers: {
            'Content-Type': 'multipart/form-data', // 파일 업로드를 위해 필요
        },
        });
        console.log('[API] 공지사항 수정 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('[API] 공지사항 수정 실패:', error);
        if (error.response) {
        // 서버가 응답했지만 에러 상태 코드
        console.error('응답 데이터:', error.response.data);
        console.error('상태 코드:', error.response.status);
        throw error;
        } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못함
        console.error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
        throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
        } else {
        // 요청 설정 중 에러 발생
        console.error('요청 설정 오류:', error.message);
        throw error;
        }
    }
    };

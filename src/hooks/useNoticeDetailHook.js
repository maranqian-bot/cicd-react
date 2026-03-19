import { useNavigate, useParams } from "react-router-dom"
import { useNoticeDetailQuery} from "../query/NoticeDetailQuery"
import useUserStore from "../store/userStore";
import { useState } from "react";
import { useNoticeDeleteMutation } from "../query/NoticeDeleteMutation";
export const useNoticeDetailHook = () => {
    const noticeDeleteMutation = useNoticeDeleteMutation();

    //경로파라미터 가져오기
    const { id } = useParams();
    const navigate = useNavigate();
    const postId = id ? parseInt(id) : null;

    // 삭제 모달 상태
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // 공지사항 게시글 상세보기 조회
    const { data, isLoading, isError, error } = useNoticeDetailQuery(postId);

    // 로그인한 사용자 상태 가져오기
    const { currentUser } = useUserStore();

    // 로그인한 유저와 작성자가 일치하는지 확인
    const isWriterCheck = () => {
        if(data.writerName === currentUser.userName){
            return true;
        }

        return false;
    }

    // 목록으로 돌아가기
    const goToList =() => {
        navigate('/notice')
    }

    // 수정 페이지로 이동
    const goToEdit = () =>{
        if(postId) navigate(`/notice/edit/${postId}`)
    }

    // 삭제 모달 열기
    const deletePost = () => {
        setShowDeleteModal(true);
    }

    // 모달 닫기
    const closeDeleteModal = () =>{
        setShowDeleteModal(false);
    }

    // 게시글 삭제
    const confirmDelete = () => {
        noticeDeleteMutation.mutate(postId, {
            onSuccess: () => {
                alert("게시글이 삭제되었습니다.");
                closeDeleteModal();
                goToList();
            },
            onError: () => {
                alert("게시글 삭제에 실패했습니다.");
            }
        });
    }


    return{
        data,
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
        showDeleteModal,
        noticeDeleteMutation,}


}
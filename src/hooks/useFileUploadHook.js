import { useState } from "react";

export const useFileUploadHook = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    //이미지 미리보기 생성하는 함수
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);

        // 이미지 미리보기 생서
        // - 하나 이상의 파일을 업로드했을 경우
        if(files.length > 0){
            const reader = new FileReader();

            // 파일 리어 생성 후 실행
            reader.onload = (event) => {
                // 사용자가 업로드한(데이터) 저장
                setImagePreview(event.target.result);
            }

            // 첫 번째 파일 읽기(이부분에서 프리뷰 생성)
            reader.readAsDataURL(files[0])
        }else{
            setImagePreview(null);
        }
    }

    return {
        selectedFiles,
        imagePreview,
        handleImageChange
    }
}
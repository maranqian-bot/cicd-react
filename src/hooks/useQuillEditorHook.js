        import { useEffect, useRef, useState } from "react";

        export const useQuillEditorHook = (initialContent = "") => {
        const [editorReady, setEditorReady] = useState(false);
        const editorInitializedRef = useRef(false);
        const quillRef = useRef(null);

        useEffect(() => {
            let timeoutId = null;
            let retryCount = 0;
            const maxRetries = 50;

            const initEditor = () => {
            if (typeof window === "undefined" || !window.Quill) {
                if (retryCount < maxRetries) {
                retryCount++;
                timeoutId = setTimeout(initEditor, 100);
                } else {
                console.error("[NoticeEdit] Quill을 로드할 수 없습니다.");
                }
                return;
            }

            const editorElement = document.getElementById("noticeEditor");
            if (!editorElement) {
                if (retryCount < maxRetries) {
                retryCount++;
                timeoutId = setTimeout(initEditor, 100);
                }
                return;
            }

            if (editorInitializedRef.current || quillRef.current) {
                return;
            }

            try {
                const quill = new window.Quill("#noticeEditor", {
                theme: "snow",
                placeholder: "공지사항 내용을 입력하세요",
                modules: {
                    toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"]
                    ]
                }
                });

                quillRef.current = quill;
                editorInitializedRef.current = true;
                quill.enable(true);
                setEditorReady(true);

                if (initialContent) {
                quill.clipboard.dangerouslyPasteHTML(initialContent);
                }

                console.log("[NoticeEdit] Quill 에디터 초기화 완료");
            } catch (err) {
                console.error("[NoticeEdit] Quill 에디터 초기화 실패:", err);
            }
            };

            initEditor();

            return () => {
            if (timeoutId) clearTimeout(timeoutId);
            };
        }, []);

        useEffect(() => {
            if (editorReady && quillRef.current) {
            quillRef.current.root.innerHTML = "";
            if (initialContent) {
                quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
            }
            }
        }, [initialContent, editorReady]);

        return {
            quillRef,
            editorReady
        };
        };
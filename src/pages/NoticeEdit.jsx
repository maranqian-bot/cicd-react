            import { useParams, useNavigate } from 'react-router-dom';
            import Header from '../components/Header.jsx';
            import { useNoticeEditFormQuery } from '../query/NoticeEditFormQuery';
            import { useNoticeEditHook } from '../hooks/useNoticeEditHook.js';

            function NoticeEdit() {
              const { id } = useParams();
              const navigate = useNavigate();
              const postId = id ? parseInt(id) : null;

              const { data: boardDTO, isLoading, isError, error } = useNoticeEditFormQuery(postId);

              const {
                category,
                setCategory,
                title,
                setTitle,
                imagePreview,
                selectedFiles,
                isSubmitting,
                handleImageChange,
                handleSubmit
              } = useNoticeEditHook(postId, boardDTO);

              if (isLoading) {
                return (
                  <>
                    <Header />
                    <div className="container">
                      <div style={{ textAlign: 'center', padding: '2rem' }}>로딩 중...</div>
                    </div>
                  </>
                );
              }

              if (isError) {
                return (
                  <>
                    <Header />
                    <div className="container">
                      <button
                        onClick={() => navigate(`/notice/detail/${postId}`)}
                        style={{
                          color: 'var(--accent)',
                          textDecoration: 'none',
                          marginBottom: '1rem',
                          display: 'inline-block',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontFamily: 'inherit'
                        }}
                      >
                        ← 돌아가기
                      </button>
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error)' }}>
                        게시글을 불러오는 중 오류가 발생했습니다.
                        <br />
                        {error?.message || error?.response?.data?.message || '알 수 없는 오류가 발생했습니다.'}
                      </div>
                    </div>
                  </>
                );
              }

              if (!boardDTO) {
                return (
                  <>
                    <Header />
                    <div className="container">
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        게시글을 찾을 수 없습니다.
                      </div>
                    </div>
                  </>
                );
              }

              return (
                <>
                  <Header />
                  <div className="container">
                    <h1 style={{ marginBottom: '2rem' }}>공지사항 수정</h1>
                    <div className="form-card" style={{ maxWidth: '800px' }}>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>분류</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }}
                          >
                            <option value="공지">공지</option>
                            <option value="점검">점검</option>
                            <option value="이벤트">이벤트</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label>제목</label>
                          <input
                            type="text"
                            placeholder="공지사항 제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>내용</label>
                          <div id="noticeEditor" className="editor-container"></div>
                        </div>

                        <div className="form-group">
                          <label>이미지 업로드</label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            disabled={isSubmitting}
                          />
                          {imagePreview && (
                            <div style={{ marginTop: '1rem' }}>
                              <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px', borderRadius: '0.5rem' }} />
                            </div>
                          )}
                          {selectedFiles.length > 1 && (
                            <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              {selectedFiles.length}개의 파일이 선택되었습니다.
                            </div>
                          )}
                        </div>

                        <div className="form-actions" style={{ textAlign: 'center' }}>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? '수정 중...' : '수정'}
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`/notice/detail/${postId}`)}
                            className="btn btn-secondary"
                            disabled={isSubmitting}
                          >
                            취소
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              );
            }

            export default NoticeEdit;
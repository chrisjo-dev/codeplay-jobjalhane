import { useLocation, useNavigate } from 'react-router-dom'
import './ResultPage.css'

const ResultPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { profile, pdfResult } = location.state || {}

  if (!profile || !pdfResult) {
    return (
      <div className="result-page">
        <div className="error-container">
          <h2>잘못된 접근입니다</h2>
          <p>프로필 분석 데이터가 없습니다.</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            처음으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="result-page">
      <div className="result-container">
        <header className="result-header">
          <h1>프로필 분석 결과</h1>
          <p className="subtitle">AI가 분석한 당신의 커리어 프로필입니다</p>
        </header>

        {/* PDF 정보 */}
        <section className="pdf-info-section">
          <h3>📄 분석 대상</h3>
          <div className="info-card">
            <div className="info-item">
              <span className="label">파일명:</span>
              <span className="value">{pdfResult.filename}</span>
            </div>
            <div className="info-item">
              <span className="label">검사 형식:</span>
              <span className={`value ${pdfResult.is_supported_format ? 'supported' : 'unsupported'}`}>
                {pdfResult.format_detected}
                {pdfResult.is_supported_format ? ' ✓' : ''}
              </span>
            </div>
            <div className="info-item">
              <span className="label">페이지 수:</span>
              <span className="value">{pdfResult.total_pages}페이지</span>
            </div>
          </div>
        </section>

        {/* 프로필 분석 결과 */}
        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-item strengths">
              <h3>💪 핵심 강점</h3>
              <ul className="profile-list">
                {profile.profile.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="profile-item interests">
              <h3>❤️ 흥미 분야</h3>
              <ul className="profile-list">
                {profile.profile.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>

            <div className="profile-item weakness">
              <h3>🎯 보완이 필요한 부분</h3>
              <p className="weakness-text">{profile.profile.weakness}</p>
            </div>
          </div>
        </section>

        {/* 분석 정보 */}
        <section className="analysis-meta">
          <p className="meta-info">
            <small>분석 모델: {profile.model_used}</small>
          </p>
        </section>

        {/* 액션 버튼 */}
        <section className="action-section">
          <div className="action-buttons">
            <button onClick={() => navigate('/')} className="btn-secondary">
              처음부터 다시
            </button>
            <button className="btn-primary" disabled>
              다음 단계: 직업 추천 (준비중)
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResultPage

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './PDFUploader.css'

const PDFUploader = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [supportedFormats, setSupportedFormats] = useState([])
  const [profile, setProfile] = useState(null)
  const [analyzingProfile, setAnalyzingProfile] = useState(false)

  // 컴포넌트 마운트 시 지원하는 형식 목록 가져오기
  useEffect(() => {
    fetchSupportedFormats()
  }, [])

  const fetchSupportedFormats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/supported-formats')
      setSupportedFormats(response.data.supported_formats)
    } catch (err) {
      console.error('Failed to fetch supported formats:', err)
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('PDF 파일만 업로드 가능합니다.')
        setFile(null)
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('파일 크기는 10MB를 초과할 수 없습니다.')
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const fakeEvent = {
        target: {
          files: [droppedFile]
        }
      }
      handleFileChange(fakeEvent)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('파일을 선택해주세요.')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(
        'http://localhost:8000/api/upload-pdf',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setResult(response.data)
      setLoading(false)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'PDF 업로드 중 오류가 발생했습니다. 다시 시도해주세요.'
      )
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setResult(null)
    setError(null)
    setProfile(null)
  }

  const handleAnalyzeProfile = async () => {
    if (!result) return

    setAnalyzingProfile(true)
    setError(null)

    try {
      const response = await axios.post(
        'http://localhost:8000/api/analyze-profile',
        {
          text: result.text,
          format_detected: result.format_detected
        }
      )

      setProfile(response.data)
      setAnalyzingProfile(false)

      // Navigate to results page with data
      navigate('/result', {
        state: {
          profile: response.data,
          pdfResult: result
        }
      })
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        '프로필 분석 중 오류가 발생했습니다. 다시 시도해주세요.'
      )
      setAnalyzingProfile(false)
    }
  }

  return (
    <div className="pdf-uploader">
      <div className="uploader-card">
        <h2>적성검사 결과 업로드</h2>
        <p className="description">
          적성검사 결과지(PDF)를 업로드하면 AI가 분석하여 맞춤형 직업을 추천해드립니다.
        </p>

        {supportedFormats.length > 0 && (
          <div className="supported-formats">
            <h3>지원하는 적성검사</h3>
            <ul>
              {supportedFormats.map((format, index) => (
                <li key={index}>{format}</li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={`upload-area ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-input"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {!file ? (
            <label htmlFor="file-input" className="upload-label">
              <div className="upload-icon">📄</div>
              <p>PDF 파일을 드래그하거나 클릭하여 선택하세요</p>
              <p className="file-requirements">(최대 10MB)</p>
            </label>
          ) : (
            <div className="file-info">
              <div className="file-icon">✓</div>
              <p className="file-name">{file.name}</p>
              <p className="file-size">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <button onClick={handleReset} className="btn-reset">
                다른 파일 선택
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
          </div>
        )}

        {file && !result && (
          <button
            onClick={handleUpload}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? '분석 중...' : 'PDF 분석 시작'}
          </button>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>PDF를 분석하고 있습니다...</p>
          </div>
        )}

        {result && (
          <div className="result-section">
            <h3>분석 결과</h3>

            <div className="result-card">
              <div className="result-item">
                <span className="label">원본 파일명:</span>
                <span className="value">{result.filename}</span>
              </div>

              <div className="result-item">
                <span className="label">저장된 파일:</span>
                <span className="value">{result.saved_filename}</span>
              </div>

              <div className="result-item">
                <span className="label">파일 크기:</span>
                <span className="value">{(result.file_size / 1024).toFixed(2)} KB</span>
              </div>

              <div className="result-item">
                <span className="label">총 페이지:</span>
                <span className="value">{result.total_pages}페이지</span>
              </div>

              <div className="result-item">
                <span className="label">감지된 형식:</span>
                <span className={`value ${result.is_supported_format ? 'supported' : 'unsupported'}`}>
                  {result.format_detected}
                  {result.is_supported_format ? ' ✓' : ' ⚠️'}
                </span>
              </div>

              {result.warning && (
                <div className="alert alert-warning">
                  <span className="alert-icon">⚠️</span>
                  {result.warning}
                </div>
              )}

              <div className="text-preview">
                <h4>텍스트 미리보기</h4>
                <pre>{result.preview}</pre>
              </div>

              <div className="action-buttons">
                <button onClick={handleReset} className="btn-secondary">
                  다시 업로드
                </button>
                <button
                  onClick={handleAnalyzeProfile}
                  className="btn-primary"
                  disabled={analyzingProfile || profile}
                >
                  {analyzingProfile ? '분석 중...' : profile ? '분석 완료 ✓' : '다음 단계: 프로필 분석'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default PDFUploader

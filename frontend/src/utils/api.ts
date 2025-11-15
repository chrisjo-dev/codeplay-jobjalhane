import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface PDFUploadResponse {
  success: boolean;
  filename: string;
  saved_filename: string;
  file_path: string;
  file_size: number;
  text: string;
  total_pages: number;
  format_detected: string;
  is_supported_format: boolean;
  preview: string;
  extracted_text_path: string;
  warning?: string;
}

/**
 * PDF 파일 업로드 및 텍스트 추출
 */
export const uploadPDF = async (file: File): Promise<PDFUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<PDFUploadResponse>(
    `${API_BASE_URL}/upload-pdf`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

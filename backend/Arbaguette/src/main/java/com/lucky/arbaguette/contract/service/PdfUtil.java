package com.lucky.arbaguette.contract.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class PdfUtil {
    public byte[] generatePdfFromHtml(String htmlContent) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(htmlContent, null);
            builder.useFastMode();
            builder.toStream(outputStream);
            builder.run();
            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();  // 예외 로그 출력
            throw new IOException("PDF 생성 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}

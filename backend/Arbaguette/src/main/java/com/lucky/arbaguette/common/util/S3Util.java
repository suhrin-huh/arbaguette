package com.lucky.arbaguette.common.util;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Component
public class S3Util {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile file) throws IOException {
        String fileName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")).concat(Long.toString(System.nanoTime()));
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());
        amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    public String uploadPdf(byte[] pdfData, String fileName) throws IOException {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("application/pdf");
            metadata.setContentLength(pdfData.length);
            ByteArrayInputStream inputStream = new ByteArrayInputStream(pdfData);
            amazonS3Client.putObject(bucket, fileName, inputStream, metadata);
            return amazonS3Client.getUrl(bucket, fileName).toString();
        } catch (AmazonServiceException e) {
            // S3에서 발생하는 서비스 예외 처리
            e.printStackTrace();
            throw new IOException("PDF 업로드 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

}

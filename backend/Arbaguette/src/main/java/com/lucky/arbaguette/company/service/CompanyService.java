package com.lucky.arbaguette.company.service;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import com.lucky.arbaguette.company.dto.response.OcrResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import java.util.regex.Pattern;
import java.util.regex.Matcher;

@Service
public class CompanyService {

    public OcrResponse ocrImage(MultipartFile file) throws IOException {
        ByteString byteString = ByteString.copyFrom(file.getBytes());

        List<AnnotateImageRequest> requests = new ArrayList<>();
        Image img = Image.newBuilder().setContent(byteString).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                .addFeatures(feat)
                .setImage(img)
                .build();
        requests.add(request);
        String fullText = "";
        try (ImageAnnotatorClient vision = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = vision.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return null;
                }

                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                    fullText = annotation.getDescription();
                    break; // 전체 텍스트만 필요하므로 첫 번째 항목만 처리
                }
            }
        }

        // 추출된 전체 텍스트에서 필요한 부분을 추출
        OcrResponse ocrResponse = extractFields(fullText);
        return ocrResponse;
    }

    private OcrResponse extractFields(String fullText) {
        // 줄바꿈을 제거하고 공백으로 대체, 그리고 '대 표 자' 같은 케이스를 처리
        fullText = fullText.replaceAll("\n", " ").replaceAll("\\s+", " ").replaceAll("대 표 자", "대표자").trim();

        // 정규식을 사용하여 필요한 정보 추출
        String name = extractField(fullText, "법인명\\(단체명\\):\\s*(.*?)(?= 대표자|사업장 소재지|$)");
        String address = extractField(fullText, "사업장\\s*소재지:?\\s*(.*?)(?= 본점|$)");  // 본점 소재지 전의 주소만 추출
        String representative = extractField(fullText, "대표자:?\\s*(.*?)\\s");


        // OcrResponse 객체에 값 설정
        OcrResponse response = new OcrResponse(name, address, representative);

        return response;
    }

    private String extractField(String text, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            return matcher.group(1).trim();  // 첫 번째 캡처 그룹을 반환
        }
        return null;  // 값을 찾지 못했을 경우 null 반환
    }

}


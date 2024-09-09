package com.lucky.arbaguette.company.controller;

import com.lucky.arbaguette.common.ApiResponse;
import com.lucky.arbaguette.company.dto.response.OcrResponse;
import com.lucky.arbaguette.company.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping(value="/ocr", consumes = "multipart/form-data")
    public ApiResponse<OcrResponse> ocrImage(@RequestPart("image") MultipartFile file) throws IOException {
        return ApiResponse.success(OK, companyService.ocrImage(file));
    }

}

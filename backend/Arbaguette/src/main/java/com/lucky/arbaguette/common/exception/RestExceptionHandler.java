package com.lucky.arbaguette.common.exception;

import com.lucky.arbaguette.common.ApiResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class RestExceptionHandler {

    @ResponseStatus(BAD_REQUEST)
    @ExceptionHandler(value = {BadRequestException.class})
    protected ApiResponse<Object> handleBadRequestException(BadRequestException e) {
        return ApiResponse.error(BAD_REQUEST, e.getMessage());
    }

    @ResponseStatus(CONFLICT)
    @ExceptionHandler(value = {DuplicateException.class})
    protected ApiResponse<Object> handleDuplicateException(DuplicateException e) {
        return ApiResponse.error(CONFLICT, e.getMessage());
    }

    @ResponseStatus(FORBIDDEN)
    @ExceptionHandler(value = {ForbiddenException.class})
    protected ApiResponse<Object> handleForbiddenException(ForbiddenException e) {
        return ApiResponse.error(FORBIDDEN, e.getMessage());
    }

    @ResponseStatus(UNAUTHORIZED)
    @ExceptionHandler(value = {UnAuthorizedException.class})
    protected ApiResponse<Object> handleUnAuthorizedException(UnAuthorizedException e) {
        return ApiResponse.error(UNAUTHORIZED, e.getMessage());
    }

    @ResponseStatus(INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = {InternetServerErrorException.class})
    protected ApiResponse<Object> handleInternetServerErrorException(InternetServerErrorException e) {
        return ApiResponse.error(INTERNAL_SERVER_ERROR, e.getMessage());
    }

    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(value = {NotFoundException.class})
    protected ApiResponse<Object> handleNotFoundException(NotFoundException e) {
        return ApiResponse.error(NOT_FOUND, e.getMessage());
    }

}

package com.daddybazaar.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.time.Instant;
import java.util.List;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageResponse<T> {

    private final boolean success;
    private final String message;
    private final List<T> data;
    private final long totalElements;
    private final int totalPages;
    private final int currentPage;
    private final int pageSize;
    private final boolean first;
    private final boolean last;
    private final String timestamp;

    public PageResponse(String message, Page<T> page) {
        this.success = true;
        this.message = message;
        this.data = page.getContent();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.currentPage = page.getNumber();
        this.pageSize = page.getSize();
        this.first = page.isFirst();
        this.last = page.isLast();
        this.timestamp = Instant.now().toString();
    }
}

package com.daddybazaar.website.service;

import com.daddybazaar.website.dto.TemplateDto;
import com.daddybazaar.website.entity.TemplateEntity;
import com.daddybazaar.website.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    @Transactional(readOnly = true)
    public List<TemplateDto> listActiveTemplates() {
        return templateRepository.findByActiveOrderBySortOrderAsc(true).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private TemplateDto mapToDto(TemplateEntity entity) {
        return TemplateDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .code(entity.getCode())
                .description(entity.getDescription())
                .previewImage(entity.getPreviewImage())
                .features(entity.getFeatures())
                .premium(entity.isPremium())
                .build();
    }
}

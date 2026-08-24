package com.daddybazaar.subscription.service;

import com.daddybazaar.subscription.dto.PlanDto;
import com.daddybazaar.subscription.entity.PlanEntity;
import com.daddybazaar.subscription.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    @Transactional(readOnly = true)
    public List<PlanDto> listActivePlans() {
        return planRepository.findByActiveOrderBySortOrderAsc(true).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private PlanDto mapToDto(PlanEntity entity) {
        return PlanDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .code(entity.getCode())
                .description(entity.getDescription())
                .priceMonthly(entity.getPriceMonthly())
                .priceYearly(entity.getPriceYearly())
                .maxProducts(entity.getMaxProducts())
                .maxImages(entity.getMaxImages())
                .hasAnalytics(entity.isHasAnalytics())
                .hasCustomDomain(entity.isHasCustomDomain())
                .build();
    }
}

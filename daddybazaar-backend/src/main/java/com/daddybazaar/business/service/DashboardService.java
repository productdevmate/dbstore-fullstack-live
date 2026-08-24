package com.daddybazaar.business.service;

import com.daddybazaar.business.dto.DashboardStatsDto;
import com.daddybazaar.category.repository.CategoryRepository;
import com.daddybazaar.product.repository.ProductRepository;
import com.daddybazaar.tenant.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        UUID businessId = TenantContext.getBusinessId();

        long products = productRepository.countByBusinessId(businessId);
        long categories = categoryRepository.countByBusinessId(businessId);

        // Mocked analytics data for Phase 7 stub
        long pageViews = 1245;
        long uniqueVisitors = 890;
        long inquiries = 42;

        return DashboardStatsDto.builder()
                .products(products)
                .categories(categories)
                .pageViews(pageViews)
                .uniqueVisitors(uniqueVisitors)
                .inquiries(inquiries)
                .build();
    }
}

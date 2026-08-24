package com.daddybazaar.subscription.service;

import com.daddybazaar.common.exception.ResourceNotFoundException;
import com.daddybazaar.subscription.dto.SubscriptionDto;
import com.daddybazaar.subscription.dto.UpgradeSubscriptionRequest;
import com.daddybazaar.subscription.entity.PlanEntity;
import com.daddybazaar.subscription.entity.SubscriptionEntity;
import com.daddybazaar.subscription.repository.PlanRepository;
import com.daddybazaar.subscription.repository.SubscriptionRepository;
import com.daddybazaar.tenant.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final PlanRepository planRepository;

    @Transactional(readOnly = true)
    public SubscriptionDto getCurrentSubscription() {
        UUID businessId = TenantContext.getBusinessId();
        SubscriptionEntity subscription = subscriptionRepository.findTopByBusinessIdOrderByCreatedAtDesc(businessId)
                .orElseThrow(() -> ResourceNotFoundException.subscription(businessId.toString()));
        
        PlanEntity plan = planRepository.findById(subscription.getPlanId())
                .orElseThrow(() -> ResourceNotFoundException.plan(subscription.getPlanId().toString()));

        return mapToDto(subscription, plan);
    }

    @Transactional
    public SubscriptionDto upgradeSubscription(UpgradeSubscriptionRequest req) {
        UUID businessId = TenantContext.getBusinessId();
        SubscriptionEntity subscription = subscriptionRepository.findTopByBusinessIdOrderByCreatedAtDesc(businessId)
                .orElseThrow(() -> ResourceNotFoundException.subscription(businessId.toString()));
        
        PlanEntity plan = planRepository.findById(req.getPlanId())
                .orElseThrow(() -> ResourceNotFoundException.plan(req.getPlanId().toString()));

        // Mock upgrade logic:
        subscription.setPlanId(plan.getId());
        subscription.setStatus("ACTIVE");
        subscription.setBillingCycle("MONTHLY");
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusMonths(1));
        subscription.setPaymentProvider("MOCK_STRIPE");
        
        subscription = subscriptionRepository.save(subscription);
        
        return mapToDto(subscription, plan);
    }

    private SubscriptionDto mapToDto(SubscriptionEntity sub, PlanEntity plan) {
        return SubscriptionDto.builder()
                .id(sub.getId())
                .businessId(sub.getBusinessId())
                .planId(plan.getId())
                .planName(plan.getName())
                .planCode(plan.getCode())
                .status(sub.getStatus())
                .billingCycle(sub.getBillingCycle())
                .startDate(sub.getStartDate())
                .endDate(sub.getEndDate())
                .trialEndDate(sub.getTrialEndDate())
                .build();
    }
}

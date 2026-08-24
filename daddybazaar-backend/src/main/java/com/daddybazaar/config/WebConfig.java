package com.daddybazaar.config;

import com.daddybazaar.tenant.TenantInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final TenantInterceptor tenantInterceptor;

    @Value("${app.domain:daddybazaar.com}")
    private String appDomain;

    @Value("${app.frontend-url:http://localhost:5173}")
    private String frontendUrl;

    @Value("${storage.local.upload-dir:./uploads}")
    private String uploadDir;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(
                        frontendUrl,
                        "http://localhost:5173",
                        "http://localhost:3000",
                        "https://" + appDomain,
                        "https://www." + appDomain,
                        "https://*." + appDomain
                )
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(tenantInterceptor)
                .addPathPatterns("/**");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve local uploaded files for development
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:" + uploadDir + "/");
    }
}

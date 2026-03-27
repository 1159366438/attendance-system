package com.example.config;

/**
 * 安全配置类
 * 配置Spring Security安全策略
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * 安全配置类
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * 密码编码器
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 安全过滤链
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 禁用session
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // 配置URL访问权限
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/user/login", "/api/user/logout").permitAll()
                .requestMatchers("/api/**").permitAll() // 暂时允许所有API访问，因为token功能已注释掉
                .anyRequest().permitAll()
            )
            // 禁用csrf
            .csrf(csrf -> csrf.disable());

        return http.build();
    }
}
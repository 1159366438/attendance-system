package com.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 应用程序配置类
 * 配置应用程序的自定义属性和参数
 * 
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {
    
    /**
     * 分页配置
     */
    private Page page = new Page();
    
    public Page getPage() {
        return page;
    }
    
    public void setPage(Page page) {
        this.page = page;
    }
    
    public static class Page {
        /**
         * 默认页码
         */
        private int defaultNum = 1;
        
        /**
         * 默认页面大小
         */
        private int defaultSize = 15;

        public int getDefaultNum() {
            return defaultNum;
        }

        public void setDefaultNum(int defaultNum) {
            this.defaultNum = defaultNum;
        }

        public int getDefaultSize() {
            return defaultSize;
        }

        public void setDefaultSize(int defaultSize) {
            this.defaultSize = defaultSize;
        }
    }
}
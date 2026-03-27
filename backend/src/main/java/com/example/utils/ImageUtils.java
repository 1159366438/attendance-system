package com.example.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Base64;
import java.util.UUID;

/**
 * 图片处理工具类
 * @author Attendance System Team
 * @since 2026-03-27
 * @version v1.1.0-alpha.1
 */
public class ImageUtils {
    
    /**
     * 将Base64字符串转换为字节数组
     * 
     * @param base64String Base64字符串
     * @return 字节数组
     */
    public static byte[] base64ToBytes(String base64String) {
        if (base64String == null || base64String.isEmpty()) {
            return null;
        }
        
        // 移除Data URL前缀 (如 "data:image/jpeg;base64,")
        if (base64String.contains(",")) {
            base64String = base64String.substring(base64String.indexOf(",") + 1);
        }
        
        try {
            return Base64.getDecoder().decode(base64String);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Base64字符串格式错误", e);
        }
    }
    
    /**
     * 将Base64字符串保存为图像文件
     * 
     * @param base64String Base64字符串
     * @param uploadDir 上传目录
     * @return 保存的文件相对路径
     */
    public static String saveBase64Image(String base64String, String uploadDir) {
        if (base64String == null || base64String.isEmpty()) {
            return null;
        }
        
        // 确保上传目录存在
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        
        // 生成唯一的文件名
        String fileName = UUID.randomUUID().toString() + ".png";
        String filePath = uploadDir + File.separator + fileName;
        
        try (OutputStream out = new FileOutputStream(filePath)) {
            byte[] imageBytes = base64ToBytes(base64String);
            if (imageBytes != null) {
                out.write(imageBytes);
                out.flush();
                return "/uploads/avatars/" + fileName; // 返回相对路径
            }
        } catch (IOException e) {
            throw new RuntimeException("保存图像文件失败", e);
        }
        
        return null;
    }
    
    /**
     * 获取图像的MIME类型
     * 
     * @param base64String Base64字符串
     * @return MIME类型
     */
    public static String getImageMimeType(String base64String) {
        if (base64String == null || base64String.isEmpty()) {
            return null;
        }
        
        if (base64String.startsWith("data:image/")) {
            int endIndex = base64String.indexOf(";base64,");
            if (endIndex > 0) {
                return base64String.substring(5, endIndex);
            }
        }
        
        // 如果没有MIME类型信息，默认返回png
        return "image/png";
    }
}
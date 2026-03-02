package com.example.Controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController // 标识为REST接口，返回JSON数据
@RequestMapping("/api/punch") // 匹配前端url的前缀 /api/input
@CrossOrigin // 解决前后端分离的跨域问题（必加，否则前端请求会被拦截）
@Validated // 开启参数校验
public class PunchController {
    /**
     * 获取打卡记录接口
     * <p>
     * 该接口用于获取用户的打卡记录信息
     * </p>
     * 
     * @return 字符串"TEST"，表示接口调用成功
     * @since 1.0.0
     */
    @GetMapping("/record")
    public String getPunchRecords() {
        System.out.println("请求成功");
        return "TEST";
    }
}
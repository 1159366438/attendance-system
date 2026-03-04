package com.example.controller;

import com.example.dto.PunchRequest;
import com.example.dto.PunchResponse;
import com.example.entity.AttendanceRecord;
import com.example.service.AttendanceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

@RestController // 标识为REST接口，返回JSON数据
@RequestMapping("/api/punch") // 匹配前端url的前缀 /api/input
@CrossOrigin // 解决前后端分离的跨域问题（必加，否则前端请求会被拦截）
@Validated // 开启参数校验
public class PunchController {

    @Autowired
    private AttendanceRecordService attendanceRecordService;

    /**
     * 获取打卡记录接口（分页）
     * <p>
     * 该接口用于获取用户的打卡记录信息（支持分页）
     * </p>
     * 
     * @param page 页码，默认为1
     * @param size 每页数量，默认为15
     * @return 包含打卡记录列表和总数的响应
     * @since 1.0.0
     */
    @GetMapping("/record")
    public Map<String, Object> getPunchRecords(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int size) {

        System.out.println("获取打卡记录请求成功，页码: " + page + ", 每页数量: " + size);
        
        // 计算总数
        int total = attendanceRecordService.countAll();
        
        // 获取分页数据
        List<AttendanceRecord> records = attendanceRecordService.queryByPage(page, size);
        
        // 构造响应数据
        Map<String, Object> response = new HashMap<>();
        response.put("records", records);
        response.put("total", total);
        response.put("page", page);
        response.put("size", size);
        response.put("pages", (int) Math.ceil((double) total / size));
        
        return response;
    }

    /**
     * 打卡接口
     * <p>
     * 该接口用于处理用户的打卡请求，保存打卡记录
     * </p>
     *
     * @param punchRequest 打卡请求参数，包含用户名和打卡时间
     * @return 包含状态码和消息的响应
     * @since 1.0.0
     */
    @PostMapping("/in")
    public PunchResponse punchIn(@RequestBody PunchRequest punchRequest) {
        System.out.println("打卡请求：" + punchRequest);

        try {
            // 1. 根据用户名查询用户信息，获取用户ID
            // 这里简化处理，实际应该通过用户名查询用户信息
            // 假设用户ID为1
            Integer userId = 1;


            // 设置为北京时间
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));

            // 获取当前时间的Date对象
            Date now = new Date();

            // 格式化显示
            String formattedDate = sdf.format(now);
            System.out.println("当前时间（北京时间）: " + formattedDate);
            System.out.println("Date对象: " + now);

            // 3. 创建打卡记录
            AttendanceRecord attendanceRecord = new AttendanceRecord();
            attendanceRecord.setUserId(userId);
            attendanceRecord.setCheckInTime(now);
            attendanceRecord.setCheckInType(1); // 1-上班打卡
            attendanceRecord.setCheckInStatus(1); // 1-正常
            attendanceRecord.setCheckInLocation("公司"); // 假设打卡地点为公司

            // 4. 保存打卡记录
            int result = attendanceRecordService.punchIn(attendanceRecord);

            if (result > 0) {
                return new PunchResponse(200, "打卡成功");
            } else {
                return new PunchResponse(500, "打卡失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new PunchResponse(500, "打卡失败");
        }
    }

}
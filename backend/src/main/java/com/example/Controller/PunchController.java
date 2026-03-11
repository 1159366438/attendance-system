package com.example.controller;

import com.example.common.ResponseResult;
import com.example.dto.PunchRequest;
import com.example.dto.PunchResponse;
import com.example.entity.PunchRecord;
import com.example.entity.User;
import com.example.service.PunchRecordService;
import com.example.service.UserService;
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
    private PunchRecordService punchRecordService;

    @Autowired
    private UserService userService;

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
    public ResponseResult<Map<String, Object>> getPunchRecords(
            @RequestParam("userId") Integer userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "15") int size) {

        System.out.println("获取打卡记录请求成功，用户ID: " + userId + ", 页码: " + page + ", 每页数量: " + size);
        
        try {
            // 计算总数
            int total = punchRecordService.countByUserId(userId);
            
            // 获取分页数据
            List<PunchRecord> records = punchRecordService.queryByUserIdAndPage(userId, page, size);
            
            // 构造响应数据
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("records", records);
            responseData.put("total", total);
            responseData.put("page", page);
            responseData.put("size", size);
            responseData.put("pages", (int) Math.ceil((double) total / size));
            
            return ResponseResult.success(responseData);
        } catch (Exception e) {
            System.err.println("获取打卡记录失败: " + e.getMessage());
            e.printStackTrace();
            return ResponseResult.error(500, "获取打卡记录失败");
        }
    }

    /**
     * 打卡接口
     * <p>
     * 该接口用于处理用户的打卡请求，保存打卡记录
     * </p>
     *
     * @param punchRequest 打卡请求参数，包含用户名和打卡时间
     * @return 标准响应格式
     * @since 1.0.0
     */
    @PostMapping("/in")
    public ResponseResult<String> punchIn(@RequestBody PunchRequest punchRequest) {
        System.out.println("打卡请求：" + punchRequest);

        try {
            // 1. 获取前台传递的用户ID
            Integer userId = punchRequest.getUserId();
            if (userId == null) {
                return ResponseResult.error(400, "用户ID不能为空");
            }

            // 2. 查询用户信息，确保用户存在
            User user = userService.queryById(userId);
            if (user == null) {
                return ResponseResult.error(404, "用户不存在");
            }

            // 3. 设置为北京时间
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));

            // 4. 获取当前时间的Date对象
            Date now = new Date();

            // 5. 格式化显示
            String formattedDate = sdf.format(now);
            System.out.println("当前时间（北京时间）: " + formattedDate);
            System.out.println("Date对象: " + now);

            // 6. 创建打卡记录
            PunchRecord punchRecord = new PunchRecord();
            punchRecord.setUserId(userId);
            punchRecord.setCheckInTime(now);
            punchRecord.setCheckInType(1); // 1-上班打卡
            punchRecord.setCheckInStatus(1); // 1-正常
            punchRecord.setCheckInLocation("公司"); // 假设打卡地点为公司

            // 7. 保存打卡记录
            int result = punchRecordService.punchIn(punchRecord);

            if (result > 0) {
                return ResponseResult.success("打卡成功");
            } else {
                return ResponseResult.error(500, "打卡失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseResult.error(500, "打卡失败");
        }
    }

}
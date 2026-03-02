package com.example.PunchCardApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.Controller"})
public class PunchCardApplication  {

    public static void main(String[] args) {
        SpringApplication.run(PunchCardApplication .class, args);

        // 1. 获取当前日期和时间（不含时区）
        LocalDateTime nowDateTime = LocalDateTime.now();
        System.out.println("当前日期时间（默认格式）: " + nowDateTime);

        // 2. 仅获取当前日期
        LocalDate nowDate = LocalDate.now();
        System.out.println("当前日期: " + nowDate);

        // 3. 仅获取当前时间
        LocalTime nowTime = LocalTime.now();
        System.out.println("当前时间: " + nowTime);

        // 4. 获取带时区的当前时间（推荐，更精准）
        ZonedDateTime zonedNow = ZonedDateTime.now();
        System.out.println("带时区的当前时间: " + zonedNow);

        // 5. 格式化输出（自定义格式）
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedNow = nowDateTime.format(formatter);
        System.out.println("格式化后的当前时间: " + formattedNow);
    }

}

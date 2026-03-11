package com.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.example.dao"})

public class PunchCardApplication {

    public static void main(String[] args) {
        SpringApplication.run(PunchCardApplication.class, args);
    }

}
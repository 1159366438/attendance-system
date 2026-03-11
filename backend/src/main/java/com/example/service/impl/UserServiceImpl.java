package com.example.service.impl;

import com.example.dao.UserDao;
import com.example.entity.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * 用户服务实现类
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User queryById(Integer id) {
        return userDao.queryById(id);
    }

    @Override
    public User queryByUsername(String username) {
        return userDao.queryByUsername(username);
    }

    @Override
    public List<User> queryAll() {
        return userDao.queryAll();
    }

    @Override
    public int insert(User user) {
        return userDao.insert(user);
    }

    @Override
    public int update(User user) {
        return userDao.update(user);
    }

    @Override
    public int deleteById(Integer id) {
        return userDao.deleteById(id);
    }

    @Override
    public User login(String username, String rawPassword) {
        // 根据用户名查询用户
        User user = userDao.queryByUsername(username);
        
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            // 密码匹配，返回用户信息（注意：不要返回密码）
            User loginUser = new User();
            loginUser.setId(user.getId());
            loginUser.setUsername(user.getUsername());
            loginUser.setAge(user.getAge());
            loginUser.setAvatar(user.getAvatar());
            loginUser.setCreateTime(user.getCreateTime());
            return loginUser;
        }
        
        return null; // 登录失败
    }
}
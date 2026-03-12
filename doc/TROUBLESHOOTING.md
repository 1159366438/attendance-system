
## BUG记录

旧
-- 添加测试数据
INSERT INTO `user` (`username`, `password`, `age`) VALUES ('admin', '$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm', 25); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`) VALUES ('user1', '$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm', 30); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`) VALUES ('user2', '$2a$10$NQVgZc5sQB7FvHMRxJrwkedBqMTMtwL0C2YdytKE.Ur9eyo9ydwYm', 28); -- 密码为 '123456' 的BCrypt哈希值

新
-- 添加测试数据
INSERT INTO `user` (`username`, `password`, `age`) VALUES ('admin', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 25); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`) VALUES ('user1', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 30); -- 密码为 '123456' 的BCrypt哈希值
INSERT INTO `user` (`username`, `password`, `age`) VALUES ('user2', '$2a$10$byZHeNtemB1DFSAPJgGLzuuVLHig9xsUq4fbVaip806VYU1mFO9BG', 28); -- 密码为 '123456' 的BCrypt哈希值

之前用了错误的密码哈希值，已经更新为正确的哈希值。
# node-captcha
node 生成图片验证码 captcha koa session 校验验证码是否正确
## 安装
```
npm install 
```
## 运行
```
npm start
```
## 访问
```
http://localhost:3000/captcha
```
## 验证码校验
```
POST /captcha/verify
```
请求参数：
```
{
  "code": "验证码",
}
```
const express = require('express');
const app = express();
const session = require('express-session');
const svgCaptcha = require('svg-captcha');
const cors = require('cors'); // 引入cors中间件

// 定义生成验证码函数
function createCode () {
    // 配置背景图片颜色集合
    const colorMap = ['#eeeeee','#edfedf','#eeddff','#c8c8c8','#f2f2f2','#d9d9d9','#f0f0f0','#d3d3d3']

    //随机颜色
    const randomColor = colorMap[Math.floor(Math.random() * colorMap.length)]

    const options ={
        size: 4, // 验证码长度
        ignoreChars: '0oO1ilI', // 排除容易混淆的字符
        noise: 0, // 干扰条数
        width: 160,
        height: 50,
        fontSize: 50,
        color: true,
        background: randomColor
    }
    const captcha = svgCaptcha.create(options)
    return captcha
}

app.use(session({
    secret:'Keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 30000
    },
    rolling: true
}));

// 使用cors中间件，允许跨域请求
app.use(cors());

// createCode()
app.get('/api/captcha', (req, res) => {
    const captchaObj = createCode();
    req.session.captcha = captchaObj.text.toLowerCase();
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(captchaObj.data);
});

app.post('/api/verify', (req, res) => {
    const serverCode = req.session.captcha.toLowerCase();
    const clientCode = req.body.code.toLowerCase(); // 使用req.body获取POST请求体中的数据

    if (serverCode === clientCode) {
        res.json({status: 200, isTrue: true});
    } else {
        res.json({status: 200, isTrue: false});
    }
});

app.listen(3000, ()=> {
    console.log('http://localhost:3000');
});

//定义画板对象
let cc = $('#cc')[0],
    cctx = cc.getContext("2d"),//定义倒计时画笔
    c = $('#c')[0],
    ctx = c.getContext("2d");//定义心画笔

//定义变量
let countdownAll = 7,//时间模板
    countdownTime = countdownAll,//倒计时时间
    countdownClass = '',//倒计时class
    countdownInter,//倒计时计时器
    countdownCircleInter,//画圈计时器
    countdownI = 1,//画圈计数器
    countdownStep = 1000,//倒计时减少的时间间隔
    countdownCircleStep = 10,//画圈步数的时间间隔
    r = 9,//半径长度
    radian,//弧度
    str = '我爱你卢菲！',
    i = 0,//心得计数器
    textI = 0,//字的计数器
    radianDecrement,//弧度增量
    step = 10,//心每个点之间的时间间隔
    heartInter,//心计时器
    textInter,//字计时器
    offsetX = 86,
    offsetY = 75,
    num = 360,//心分割为 360 个点
    textNum,//字的输入间隔
    startRadian = Math.PI;
//计算
let lin = str.split('').length + 1;
textNum = num / lin;

//倒计时动画
let countdown = () => {
    switch (countdownTime) {
        case 7:
            countdownClass = 'red';
            break;
        case 6:
            countdownClass = 'orange';
            break;
        case 5:
            countdownClass = 'yellow';
            break;
        case 4:
            countdownClass = 'green';
            break;
        case 3:
            countdownClass = 'cyan';
            break;
        case 2:
            countdownClass = 'blue';
            break;
        case 1:
            countdownClass = 'purple';
            break;
    }
    $('.countdown .time').attr('class', 'time ' + countdownClass).html(countdownTime);
    countdownTime--;
    if (countdownTime < 0) {
        clearInterval(countdownInter);
        clearInterval(countdownCircleInter);
        $('.top').hide();
        setTimeout(function () {
            startAnimation();
        }, 400)
    }
};

//倒计时画圈
let countdownCircle = () => {
    cctx.beginPath();
    cctx.arc(150, 150, 140, -0.5 * Math.PI, (2 / (countdownAll * countdownStep / countdownCircleStep) * countdownI - 0.5) * Math.PI);
    cctx.stroke();
    countdownI++;
};

//画心初始化
let startAnimation = () => {
    radian = startRadian;//弧度设为初始弧度
    radianDecrement = Math.PI / num * 2;
    ctx.moveTo(getX(radian), getY(radian));//移动到初始点
    heartInter = setInterval(printHeart, step);
    textInter = setInterval(function () {
        if ($('.title .tail').css('display') === 'block') {
            $('.title .tail').hide();
        } else {
            $('.title .tail').show();
        }
    }, 500);
};

//画心详细操作
let printHeart = () => {
    radian += radianDecrement;
    ctx.lineTo(getX(radian), getY(radian));//在旧点和新点之间连线
    i++;
    ctx.stroke();//画线
    if (i > textNum * textI) {
        textI++;
        $('.title .msg').html(str.slice(0, textI));
    }
    if (i >= num) {
        clearInterval(heartInter);
        clearInterval(textInter);
        $('.title .tail').hide();
        setTimeout(function () {
            ctx.fill();
            $('#c').addClass('jump');
        }, 500);
    }
};

//x度数转弧度
let getX = (t) => {
    return 64 + r * (16 * Math.pow(Math.sin(t), 3)) + offsetX;
};

//y度数转弧度
let getY = (t) => {
    return 49 - r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) + offsetY;
};

//初始化数据
cctx.strokeStyle = '#151515';
cctx.lineWidth = 20;//定义倒计时画笔宽度
ctx.strokeStyle = '#eb2d2e';//定义心画笔颜色
ctx.lineWidth = 1;//定义心画笔宽度
ctx.shadowBlur = 5;
ctx.shadowColor = "rgba(253,36,61,0.1)";
let radial = ctx.createLinearGradient(500, 450, 500, 0);
radial.addColorStop(0, "#fd4d4e");
radial.addColorStop(0.2, "#ed3132");
radial.addColorStop(0.8, "#eb2d2e");
radial.addColorStop(1, "#fe5d5e");
ctx.fillStyle = radial;

countdown();
countdownCircle();
countdownInter = setInterval(countdown, countdownStep);
countdownCircleInter = setInterval(countdownCircle, countdownCircleStep);
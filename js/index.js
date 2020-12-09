$(function () {
    /*变量定义*/
    /*登录*/
    let loginBtn = $('#header>.right>.left>#login');//登录框弹出按钮
    let login = $('#box>.login');//登录框
    let reset = $('#box>.login>.top>span:last-child');//登录框关闭按钮
    let clickLogin = $('#box>.login>.bottom>button:nth-child(2)');//登录框中的登录按钮
    let showUserName = $('#header>.right>.left>span');//显示用户名的区域
    let showUserImage = $('#header>.right>.left>img');//显示用户头像的区域
    let usn = $('#box>.login>.middle>div>#username');//用户名输入框
    let pwd = $('#box>.login>.middle>div>#password');//密码输入框
    let hidden = $('#box>.hidden');//遮罩层
    let status = 0;//记录登录状态

    /*播放信息*/
    let title = $('#content>.top>.right>.title');//用于显示音频的标题信息
    let album = $('#content>.top>.right>.message>span:nth-child(1)');//用于显示音频的专辑信息
    let singer = $('#content>.top>.right>.message>span:nth-child(2)');//用于显示音频的歌手信息
    let result = null;//用于保存音频的信息
    let timeLength = null;//用于记录音频的总时长
    let hours = null;//处理音频时，用于保存音频的小时信息
    let minutes = null;//处理音频时，用于保存音频的分钟信息
    let seconds = null;//处理音频时，用于保存音频的秒信息
    let currentTime = 0;//用于保存当前播放时长的数据（非必要，有点冗余）
    let progress = $('#footer>.progress>#progress');//音频控制条
    let current = $('#footer>.progress>#current');//用于显示音频的当前播放时长
    let time = $('#footer>.progress>#time');//用于显示音频的总时长

    /*音量*/
    let volume = $('#footer>.volume>#volume');//音量控制条
    let restore = $('#footer>.volume>.icon-shengyin');//恢复音量
    let mute = $('#footer>.volume>.icon-jingyin');//静音图标
    let volumeValue = null;//用于记录静音前的音量值

    /*更换颜色*/
    let color = $('#header>.right>.center>#color');//input的color类型
    let skin = $('#header>.right>.center>.icon-pifu');//皮肤图标
    let header = $('#header');//要更换颜色的区域，顶部
    let footer = $('#footer');//要更换颜色的区域，底部

    /*播放列表*/
    let listBtn = $('#footer>.manner>div:nth-child(3)>.icon-bofangliebiao');//播放列表图标
    let list = $('#list');//用于显示播放列表
    let playList = $('#list>.content');//播放列表的内容
    let close = $('#list>.btn>.icon-biaoqing');//关闭播放列表图标
    let article = null;//用于保存播放列表的信息
    let medisArray = [];//用于保存歌词信息

    /*喜欢和收藏*/
    let love = $('#content>.top>.left>.btn>.love');//喜欢图标
    let collection = $('#content>.top>.left>.btn>.collection');//收藏图标

    /*播放控制*/
    let index = 14;//当前正在播放的索引
    let play = $('#footer>.control>.icon-bofang2');//播放图标
    let pause = $('#footer>.control>.icon-zanting');//暂停图标
    let next = $('#footer>.control>.icon-xiayishou');//下一首图标
    let prev = $('#footer>.control>.icon-shangyishou');//上一首图标
    let cover = $('#content>.top>.left>.cover');//封面旋转区域
    let audio = $('#footer>.progress>audio');//加载音频的audio元素
    let lrc = $('#content>.top>.right>.lyric');//歌词显示区域
    let flag = 0;//记录上一首歌曲的播放状态，实现下一首是否自动播放，0为暂停，1为播放

    /*播放方式*/
    let playMethod = $('#footer>.manner>div:first-child');//播放方式区域对象
    let methods = $('#footer>.manner>div:first-child>.icon');//播放方式图标
    let n = 0;//记录当前播放图标的索引，改变图标显示
    let that = 0;//记录上一个播放图标的索引，改变图标显示

    /*搜索*/
    let search = $('#header>.center>#search');//搜索输入框
    let searchIcon = $('#header>.center>.icon-search');//搜索图标

    /*评论*/
    let edit = $('#content>.content>.edit');//编辑评论的按钮
    let content = $('#content>.content>.show');//评论显示区域
    let input = $('#box>.show');//评论输入框
    let quxiao = $('#box>.show>div:last-child>button:nth-child(1)');//取消评论按钮
    let fabu = $('#box>.show>div:last-child>button:nth-child(2)');//发布评论按钮
    let textarea = $('#box>.show>textarea');//输入评论的区域
    let argumentsNum = $('#content>.content>div:nth-child(1)>span:nth-child(2)');//显示评论的数量

    /*桌面歌词*/
    let box = $('#box');//音乐界面
    let desktopBtn = $('#footer>.manner>div:nth-child(2)');//桌面歌词按钮
    let desktop = $('.desktop');//桌面歌词显示区域

    /*功能处理*/
    /*评论输入框点击*/
    edit.click(function () {
        input.removeClass('hide');
    });

    /*关闭评论框*/
    quxiao.click(function () {
        input.addClass('hide');
        textarea.val('');
    });

    /*发表评论*/
    fabu.click(function () {
        if (loginBtn.css('display') === 'block') {
            alert('登录后在评论！！！');
        } else {
            let aTime = new Date().toLocaleString().replace(/[/]/g, '-').split(' ');

            let string =
                `<div>
                    <div><img src="${showUserImage.attr('src')}" alt=""></div>
                    <div class="content">
                        <p><span>${showUserName.html()}：</span>${textarea.val()}</p>
                        <span>${aTime[0] + '&nbsp;' +  (aTime[1].slice(2).substring(0, 1) < 10 && '0' + aTime[1].slice(2))}</span><span>点赞&nbsp;|&nbsp;分享&nbsp;|&nbsp;回复</span>
                    </div>
                </div>`;
            content.append(string);
            argumentsNum.html(parseInt(argumentsNum.html()) + 1);
        }
        textarea.val('');
        quxiao.trigger('click');
    });

    /*显示桌面歌词*/
    desktopBtn.click(function () {
        if (desktop.css('display') === 'none') {
            box.css({
                marginTop: '-50px',
                transition: 'margin-top 0.5s linear'
            });
            desktop.css('display', 'block');
            desktopBtn.css({
                boxShadow: '0 0 10px black',
                borderRadius: '50%'
            });
            return;
        }
        if (desktop.css('display') === 'block') {
            box.css({
                marginTop: '0',
                transition: 'margin-top 0.5s linear'
            });
            desktop.css('display', 'none');
            desktopBtn.css({
                boxShadow: 'none',
                borderRadius: '50%'
            });
        }
    });

    /*监听搜索框的变化*/
    search.on('input', function () {
        if ($(this).val() !== '') {
            $(this).css('background-color', 'white');
            searchIcon.css({
                color: 'black',
                fontWeight: 'bold'
            });
        } else {
            $(this).css('background-color', 'transparent');
            searchIcon.css({
                color: 'white',
                fontWeight: 'normal'
            });
        }
    });

    /*登录*/
    loginBtn.click(function () {
        login.removeClass('hide');
        hidden.show();
        if (window.localStorage.getItem('username')) {
            usn.val(window.localStorage.getItem('username'));
            pwd.val(window.localStorage.getItem('password'));
        }
        quxiao.trigger('click');
    });

    /*取消*/
    reset.click(function () {
       login.addClass('hide');
       hidden.hide();
    });

    /*登录界面的登录按钮的点击事件*/
    clickLogin.click(function () {
        $.get({
            url: 'data/user.json',
            success: function (data) {
                data.forEach(function (item) {
                    if (item.name === usn.val()) {
                        status = 1;
                        if (item.pwd === pwd.val()) {
                            status = 2;
                            alert('登录成功');
                            showUserName.html(usn.val()).show();
                            showUserImage.attr('src', item.pic).show();
                            loginBtn.hide();
                            reset.trigger('click');
                            window.localStorage.setItem('username', usn.val());
                            window.localStorage.setItem('password', pwd.val());
                        }
                    }
                });
                let errorStr = status === 1 ? "密码错误" : (status === 0 ? "用户名不存在" : "");
                status === 2 || alert(errorStr + '，登录失败!!');
            }
        })
    });

    /*封装计算音频时长以及修改对应的元素的函数，getAndSetTime(时长, 对象)*/
    function getAndSetTime(number, obj) {
        hours = Math.floor(number / 3600);
        minutes = Math.floor(number / 60);
        seconds = number % 60;
        hours < 10 && (hours = '0' + hours);
        minutes < 10 && (minutes = '0' + minutes);
        seconds < 10 && (seconds = '0' + seconds);
        obj.html(hours - 0 === 0 ? minutes + ':' + seconds : hours + ':' +minutes + ':' + seconds);
    }

    /*拖动播放进度*/
    progress.on('input', function () {
        currentTime = $(this).val();//修改当前进度到指定值
        getAndSetTime(currentTime, current);
    });

    /*更改播放进度*/
    progress.change(function () {
        audio.prop('currentTime', currentTime);//修改音频的进度
        /*当进度修改的时候*/
        for (let i = 0; i < medisArray.length; i++) {
            /*找到当前对应的歌词行*/
            if (parseFloat(medisArray[i].time) <= audio[0].currentTime.toFixed(3) && audio[0].currentTime.toFixed(3) <= parseFloat(medisArray[i + 1].time)) {
                $(lrc.find("li").get(lineNo - 2)).nextAll().removeClass("active");//清除未修改前以及之后的歌词行的样式，确保跳转后只能有一个active
                lineNo = i + 1;//获取当前对应的歌词行
                $(lrc.find("li").get(lineNo)).addClass("active");//当前歌词行添加样式
                lineHeight(lineNo);//调用此函数，实现进度更改后，歌词立即跳转到对应的地方
            }
        }
    });

    /*实现文字高亮滚动*/
    /*参考：https://blog.csdn.net/maid_04/article/details/80849563*/
    let fraction = 0.5;
    let topNum = 0;
    function lineHeight(lineno) {
        //令正在唱的那一行高亮显示
        if (lineno > 0) {
            $(lrc.find("li").get(topNum + lineno - 1)).removeClass("active");//清除上一行的样式
        }
        let nowline = lrc.find("li").get(topNum + lineno);//获取到当前行
        $(nowline).addClass("active");//添加样式
        desktop.html($(nowline).html());//放到桌面歌词部分

        //实现文字滚动
        let _scrollTop;
        /*lrc[0].scrollTop = 0;*/
        if (lrc[0].clientHeight * fraction > nowline.offsetTop) {
            _scrollTop = 0;
        } else if (nowline.offsetTop > (lrc[0].scrollHeight - lrc[0].clientHeight * (1 - fraction))) {
            _scrollTop = lrc[0].scrollHeight - lrc[0].clientHeight;
        } else {
            _scrollTop = nowline.offsetTop - lrc[0].clientHeight * fraction;
        }

        //以下声明歌词高亮行固定的基准线位置成为 “A”
        if ((nowline.offsetTop - lrc[0].scrollTop) >= lrc[0].clientHeight * fraction) {
            //如果高亮显示的歌词在A下面，那就将滚动条向下滚动，滚动距离为 当前高亮行距离顶部的距离-滚动条已经卷起的高度-A到可视窗口的距离
            lrc[0].scrollTop += Math.ceil(nowline.offsetTop - lrc[0].scrollTop - lrc[0].clientHeight * fraction);

        } else if ((nowline.offsetTop - lrc[0].scrollTop) < lrc[0].clientHeight * fraction && _scrollTop !== 0) {
            //如果高亮显示的歌词在A上面，那就将滚动条向上滚动，滚动距离为 A到可视窗口的距离-当前高亮行距离顶部的距离-滚动条已经卷起的高度
            lrc[0].scrollTop -= Math.ceil(lrc[0].clientHeight * fraction - (nowline.offsetTop - lrc[0].scrollTop));

        } else if (_scrollTop === 0) {
            lrc[0].scrollTop = 0;
        } else {
            lrc[0].scrollTop += $(lrc[0].find('li').get(0)).height();
        }
    }

    /*每当播放进度更改时，获取当前进度赋给进度条*/
    let lineNo = 6;//第一行歌词
    audio[0].ontimeupdate = function () {
        currentTime = Math.floor(this.currentTime);
        progress.val(currentTime);
        getAndSetTime(currentTime, current);
        /*异步请求，medisArray数组可能为空*/
        if (lineNo === medisArray.length - 1 && audio[0].currentTime.toFixed(3) >= parseFloat(medisArray[lineNo].time)) {
            lineHeight(lineNo);
        }
        /*增加medisArray[lineNo]，判断medisArray数组是否有值*/
        if (medisArray[lineNo] && parseFloat(medisArray[lineNo].time) <= audio[0].currentTime.toFixed(3) && audio[0].currentTime.toFixed(3) <= parseFloat(medisArray[lineNo + 1].time)) {
            lineHeight(lineNo);
            lineNo++;
        }
    }

    /*音乐播放完成后的事件*/
    audio[0].onended = function () {
        /*pause.trigger('click');*/
        currentTime = 0;
        progress.val(0);
        current.html('00:00');
        /*cover.css('transform', 'rotate(360deg)');*/
        next.trigger('click');
        lrc[0].scrollTop = 0;
        desktop.html('');
        /*滚动参数恢复初始值*/
        lineNo = 6;
    };

    /*获取播放列表*/
    $.get({
        url: 'data/data.json',
        success: function (obj) {
            let str = '<div class="article"><div class="number">序号</div><div class="title">名称</div><div class="singer">歌手</div></div>';
            for (let i = 0; i < obj.length; i++) {
                let message = obj[i].src.slice(6).split(' - ');
                str += `<div class="article"><div class="number">${i < 9 ? '0' + (i + 1) : i + 1}</div><div class="title">${message[1].replace(/(.flac|.mp3|.wav)/, '')}</div><div class="singer">${message[0]}</div></div>`;
                playList.html(str);
            }
            article = playList.children();
            show(obj);

            /*播放列表点击*/
            article.click(function () {
                if ($(this).index() !== 0) {
                    index = $(this).index() - 1;
                    deal();
                    play.trigger('click');
                }
            });

            /*点击下一曲*/
            next.click(function () {
                switch (n) {
                    case 0:
                        index++;
                        index === article.length - 1 && (index = 0);
                        break;
                    case 1:
                        break;
                    case 2:
                        index = Math.floor(Math.random() * 19);
                        break;
                }
                deal();
            });

            /*点击上一曲*/
            prev.click(function () {
                switch (n) {
                    case 0:
                        index--;
                        index === -1 && (index = article.length - 1 - 1);
                        break;
                    case 1:
                        break;
                    case 2:
                        index = Math.floor(Math.random() * 19);
                        break;
                }
                deal();
            });
        }
    });

    /*处理封面和专辑和歌词信息*/
    function deal() {
        $.get({
            url: 'data/data.json',
            success: function (obj) {
                show(obj);
                /*audio.trigger('ended');*/
                /*代替音频播放完成的事件*/
                /*pause.trigger('click');*/
                currentTime = 0;
                progress.val(0);
                current.html('00:00');
                flag === 1 && play.trigger('click');
                /*play.trigger('click');*/
                lrc[0].scrollTop = 0;
                desktop.html('');
                /*滚动参数恢复初始值*/
                lineNo = 6;
            }
        });
    }

    /*封装信息的处理*/
    function show(obj) {
        cover.find('img').attr('src', obj[index].cover);
        album.html(obj[index].album);
        audio.attr('src', obj[index].src);
        audio[0].load();
        article.removeClass('current');
        $(article[index + 1]).addClass('current');
        playList.parent().scrollTop(index * 25);
        $.get({
            url: obj[index].lrc,
            success: function (data) {
                lrc.html('');//清空歌词
                medisArray = [];//清空数组

                let medises = data.split("\n");//用换行符拆分获取到的歌词
                $.each(medises, function (index, item) {//遍历medises，并且将时间和文字拆分开，并push进自己定义的数组，形成一个对象数组
                    let t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
                    medisArray.push({
                        time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
                        content: item.substring(item.indexOf("]") + 1, item.length)
                    });
                });
                // 遍历medisArray，并且生成li标签，将数组内的文字放入li标签
                $.each(medisArray, function (index, item) {
                    let li = $("<li>");
                    li.html(item.content);
                    lrc.append(li);
                });
            }
        });

        /*console.log($(article[index + 1]).children('.title').html());*/
        $('#box>.show>div:first-child').html('歌曲：' + $(article[index + 1]).children('.title').html());

        /*
            <div>
                <div></div>
                <div class="content">
                    <p><span>111：</span>1213314</p>
                    <span>111</span><span>111</span>
                </div>
            </div>
        */
        content.html('');
        let argumentsStr = ``;
        argumentsNum.html(obj[index].msg.length);
        for (let i = 0; i < obj[index].msg.length; i++) {
            let userIdName = [];
            let imgSrc = [];
            $.get({
                url: 'data/user.json',
                success: function (res) {
                    for (let j = 0; j < res.length; j++) {
                        /*console.log(obj[index].msg[i].userId);*/
                        /*console.log(res[j].id);*/
                        if (obj[index].msg[i].userId === res[j].id) {
                            userIdName.push(res[j].name);
                            imgSrc.push(res[j].pic);
                            /*console.log(userIdName);*/
                        }
                    }
                    argumentsStr +=
                        `<div>
                            <div><img src="${imgSrc[0]}" alt=""></div>
                            <div class="content">
                                <p><span>${userIdName[0]}：</span>${obj[index].msg[i].msgCon}</p>
                                <span>${obj[index].msg[i].date}</span><span>点赞&nbsp;|&nbsp;分享&nbsp;|&nbsp;回复</span>
                            </div>
                        </div>`;
                    content.html(argumentsStr);
                }
            });
        }
    }

    /*音乐加载完成后获取音乐的信息*/
    audio[0].onloadedmetadata = function () {
        setTimeLength();
        setTitleAndSinger();
    };

    /*处理音乐的总时长*/
    function setTimeLength() {
        timeLength = Math.round(audio.prop('duration'));
        getAndSetTime(timeLength, time);
        progress.attr('max', timeLength);
    }

    /*处理音乐的名字和歌手*/
    function setTitleAndSinger() {
        /*J.Fla - I Feel It Coming.flac*/
        /*DA PUMP - P.A.R.T.Y. ~ユニバース・フェスティバル~.mp3*/
        result = audio.attr('src').slice(6).split(' - ');
        title.html(result[1].replace(/(.flac|.mp3|.wav)/, ''));
        singer.html(result[0]);
    }

    /*初始化音量*/
    audio.prop('volume', volume.val());

    /*改变音量*/
    volume.change(function () {
        audio.prop('volume', $(this).val());
        if (audio.prop('volume') === 0) {
            restore.css('zIndex', -1);
            mute.css('zIndex', 1);
        } else {
            mute.css('zIndex', -1);
            restore.css('zIndex', 1);
            volumeValue = audio.prop('volume');
        }
    });

    /*静音*/
    restore.click(function () {
        $(this).css('zIndex', -1);
        mute.css('zIndex', 1);
        volumeValue = audio.prop('volume');
        audio.prop('volume', 0);
        volume.val(0);
    });

    /*恢复音量*/
    mute.click(function () {
        $(this).css('zIndex', -1);
        restore.css('zIndex', 1);
        audio.prop('volume', volumeValue);
        volume.val(volumeValue);
    });

    /*更换皮肤*/
    skin.click(function () {
       color.trigger('click');
       color.on('input', function () {
            header[0].style.background = $(this).val();
            footer[0].style.background = $(this).val();
       });
    });

    /*播放列表点击事件*/
    listBtn.click(function () {
        list.toggleClass('hide');
    });
    /*关闭按钮点击事件*/
    close.click(function () {
        list.toggleClass('hide');
    });

    /*喜欢点击事件*/
    love.click(function () {
        $(this).children('.icon-xihuan').toggleClass('like');
    });

    /*收藏点击事件*/
    collection.click(function () {
        $(this).children('.icon-shoucang').toggleClass('like');
    });

    /*播放按钮点击事件*/
    play.click(function () {
        $(this).css({
            zIndex: 0,
            opacity: 0
        });
        pause.css({
            zIndex: 1,
            opacity: 1
        });
        cover.css('animationPlayState','running');
        audio[0].play();
        /*timer = setInterval(setProgress, 1000);*/
        flag = 1;
    });

    /*暂停按钮点击事件*/
    pause.click(function () {
        $(this).css({
            zIndex: 0,
            opacity: 0
        });
        play.css({
            zIndex: 1,
            opacity: 1
        });
        cover.css('animationPlayState','paused');
        audio[0].pause();
        /*clearInterval(timer);*/
        flag = 0;
    });

    /*切换播放方式*/
    playMethod.click(function () {
       n++;
       n === methods.length && (n = 0);
       $(methods[that]).css({
            zIndex: 0,
            opacity: 0
        });
        $(methods[n]).css({
            zIndex: 1,
            opacity: 1
        });
        that = n;
    });
});
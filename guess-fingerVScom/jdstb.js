/**
 * 初始化变量总集对象
 */
function game_init() {
    //(1P出的,com出的,判定结果,1P显示文字,com显示文字,label框,显示倒计时区域,展示电脑所出图片区域,选择按钮,确定按钮,再来一次按钮,剪刀图片地址,石头图片地址,布图片地址,显示结果区域)
    var game_param = {
        jdstb: '',
        jdstb1: '',
        end: 0,
        p1: '',
        com: '',
        $main_box: $('.main-box'),
        $times: $('.times'),
        $com_img: $('.com-img'),
        $guess_option: $('.guess-option'),
        $player_btn: $('#chuquan'),
        $again_btn: $('#again'),
        $results: $('#results'),
        jdurl: '',
        sturl: '',
        buurl: ''
    }
    /**
     * 设置图片url
     * @param {string} jd_url 石头图片url
     * @param {string} st_url 剪刀图片url       
     * @param {string} bu_url 布图片url
     */
    function set_img_url(jd_url,st_url,bu_url) {
        game_param.jdurl = jd_url;
        game_param.sturl = st_url;
        game_param.buurl = bu_url;
    }

    //获取所有参数
    function get_params() {
        return game_param;
    }

    //返回两种方法,设置图片路径,获取所有参数
    return {
        set_img_url: set_img_url,
        get_params: get_params
    }

}

//猜拳主要逻辑
function finger_guessing(gameParams) {
    gameParams.$main_box.hide();

    //隐藏确定按钮
    gameParams.$player_btn.hide();

    //生成com结果
    gameParams.jdstb1 = comjdstb();
    //初始化倒计时
    var i = 3;
    gameParams.$times.text(i);

    //倒计时
    var timeread = setInterval((function () {
        --i;
        gameParams.$times.text(i);

    }), 900)

    //倒计时结束后公布结果
    setTimeout(function () {

        //清除倒计时
        clearInterval(timeread);
        gameParams.$times.text('');
        gameParams.$com_img.css('display', 'inline');

        //判断玩家的选择
        gameParams.$guess_option.each(function () {

            if ($(this).prop('checked') === true) {
                switch ($(this).val()) {
                    case 'jd':
                        gameParams.jdstb = 'jd';
                        $(this).parent('label').show()
                        break;
                    case 'st':
                        gameParams.jdstb = 'st';
                        $(this).parent('label').show();
                        break;
                    case 'bu':
                        gameParams.jdstb = 'bu';
                        $(this).parent('label').show()
                        break;
                }
            }
        })

        //生成胜负结果 0:平局 1:玩家胜 -1:com胜
        gameParams.end = compare(gameParams.jdstb, gameParams.jdstb1);


        //生成玩家和COM选择内容的文字,方便显示
        switch (gameParams.jdstb) {
            case 'jd':
                gameParams.p1 = "剪刀";
                break;
            case 'st':
                gameParams.p1 = "石头";
                break;
            case 'bu':
                gameParams.p1 = "布"
                break;
        }
        switch (gameParams.jdstb1) {
            case 'jd':
                gameParams.com = "剪刀";
                gameParams.$com_img.prop('src', gameParams.jdurl);
                break;
            case 'st':
                gameParams.com = "石头";
                gameParams.$com_img.prop('src', gameParams.sturl);
                break;
            case 'bu':
                gameParams.com = "布"
                gameParams.$com_img.prop('src', gameParams.buurl);
                break;
        }

        //根据end显示结果详情 0,1,-1
        switch (gameParams.end) {
            case 0:
                gameParams.$results.text('你出的是' + gameParams.p1 + ',电脑出的也是' + gameParams.com + '  ,哎呀,是平局');
                break;
            case 1:
                gameParams.$results.text('你出的是' + gameParams.p1 + ',电脑出的是' + gameParams.com + '  ,恭喜你,战胜了智商800的电脑');
                break;
            case -1:
                gameParams.$results.text('你出的是' + gameParams.p1 + ',电脑出的是' + gameParams.com + '  ,真遗憾,你败给了智商-100的电脑');
                break;
        }

        //显示再来一局按钮
        gameParams.$again_btn.show();
    }, 2800)
}

/**
 * 再来一局按钮逻辑
 * @param {string} again_btn 再来一局按钮
 * @param {string} player_btn 确定按钮
 * @param {string} results 显示结果文字区域
 * @param {string} com_img com所选图片区域
 * @return void
 */
function game_again(params) {
    params.$again_btn.hide();
    params.$main_box.show();
    params.$player_btn.show();
    params.$results.text('');
    params.$com_img.prop('src', '');
    params.$com_img.css('display', 'none');
}

function animations() {

}



/**
 * 生成com所出石头剪刀布
 * @return string 返回具体是石头剪刀布哪个的简写字符串
 */
function comjdstb() {
    var num = Math.random() * 10;
    var comjdstb1 = '';
    switch (true) {
        case num < 4:
            comjdstb1 = 'jd';
            break;
        case num > 4 && num < 8:
            comjdstb1 = 'st';
            break;
        case num > 8:
            comjdstb1 = 'bu';
            break;
    }
    return comjdstb1;
}

/**
 * 胜负逻辑
 * @param {string} p1 玩家所出
 * @param {string} com 电脑所出
 * @return number  如果双方平局,返回0 玩家胜 返回1  ,com胜返回-1
 */
function compare(p1, com) {
    switch (p1) {
        case 'jd':
            switch (com) {
                case 'jd': return 0;
                case 'st': return -1;
                case 'bu': return 1;
            }
            break;
        case 'st':
            switch (com) {
                case 'jd': return 1;
                case 'st': return 0;
                case 'bu': return -1;
            }
            break;
        case 'bu':
            switch (com) {
                case 'jd': return -1;
                case 'st': return 1;
                case 'bu': return 0;
            }
            break;
    }
}
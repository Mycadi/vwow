$(function(){
var skillList = {
	warrior : [
		{
			name : '半月弯刀',
			pic : 'jn_zs_bywd',
			desc : '战士是不可匹敌的巨人，总以无所畏惧的姿态冲在战斗的最前方。半月弯刀作为战士的基本AOE技能，用劲气和快速移动的宝剑同时攻击面前的所有敌人，让敌人血溅四方，让战士在其擅长的近身战斗中尽情释放钢铁之躯的狂热力量。'
		},
		{
			name : '烈火剑法',
			pic : 'jn_zs_lhjf',
			desc : '烈火剑法属战士的单体爆发技能，CD长，单次输出高。有了火精灵的奋力相助，一向勇往直前的战士更加不畏生死，看剑上燃起的熊熊烈火，看战士眼中的不灭火光，所有敌人退避三舍。'
		},
		{
			name : '野蛮冲撞',
			pic : 'jn_zs_ymcz',
			desc : '在每一场战斗中，战士都有着怒嚎到底，践踏全场的惊人气魄。全身上下散发着无穷的力量。野蛮冲撞汇聚着战士之威，将全身力量发挥到极致，令天地山河都为之震撼动摇。'	
		}
	],
	wizard : [
		{
			name : '疾光电影',
			pic : 'jn_fs_jgdy',
			desc : '远程攻击加上强大输出是法师的职业特色。疾光电影--法师职业的直线攻击技能，一种释放出积蓄的光的威力的魔法。技能触发时的那一束耀眼强光，仿佛蕴雷电之势，汇聚着整个玛法大陆的万物灵气，一击即中如长虹贯日！'
		},
		{
			name : '地狱雷光',
			pic : 'jn_fs_dylg',
			desc : '强而有力的雷光风暴，迅猛之势不急掩耳，法师蓄力已久的猛然出击，将造成大范围的伤害。地狱雷光攻击的威力以爆发核心最高，最多同时伤害人数可达24人。惊雷震世，瞬间制敌。'
		},
		{
			name : '流星火雨',
			pic : 'jn_fs_lxhy',
			desc : '法师职业的高级AOE技能，拥有超越冰咆哮之上的恐怖威力。在魔法的驱动下，法师自身仿佛幻化成神龙，随即一阵猛烈的火雨从天而降，瞬间爆发出无穷的杀伤力，在法术区域内的任何生物都将受到极大的伤害。流星火雨是火系魔法的巅峰技能，足以领略魔法的终极奥义。'
		}
	],
	taoist : [
		{
			name : '治愈术',
			pic : 'jn_ds_zys',
			desc : '道士--玛法大陆低调而又神秘的族群，有着超越人们想象的惊人力量，可以掌控灵魂，治愈术是他们对自身施放的治疗法术，在效果持续时间内进行一定的生命值回复，关键时刻，总能扭转乾坤！'
		},
		{
			name : '困魔咒',
			pic : 'jn_ds_kmz',
			desc : '一道符咒，即可掌控灵魂之力，将敌人禁锢于原地、无处可逃，给敌人带来天罗地网的定身效果。困魔咒一出，强大的威力必将给予敌人重创甚至致命一击！'
		},
		{
			name : '嗜血术',
			pic : 'jn_ds_sxs',
			desc : '一向沉默低调的道士总有被激怒的时候，他可以驱使护身符对敌人造成伤害，并且在命中后吸取对方生命，为自己回复一定的血量。嗜血术毁天灭地的伤害效果着实令人惊叹与恐惧。'
		}
	],
    archer : [
        {
          name : '恶魔降临',
          pic : 'jn_gjs_emjl',
          desc : '弓箭手最为华丽的技能，当恶魔降临于弓箭手时，弓箭手彷佛化身恶魔，拥有极强的杀伤力！在变身时间内弓箭手所有伤害都会有加成，但自身会变得更脆弱并且无法移动，但可手动取消变身。'
        },
        {
          name : '蓄力射击',
          pic : 'jn_gjs_xlsj',
          desc : '弓箭手核心单体伤害技能，只需蓄力1.5秒，就能对敌人造成大量伤害。释放此技能时弓箭手将全身力量凝聚在箭尖，迅速锁定目标，那一弯如秋水般的寒光直封喉而来，让人不寒而栗。'
        },
        {
          name : '爆炸射击',
          pic : 'jn_gjs_bzsj',
          desc : '核心群体攻击技能，选取可攻击的目标后，射出爆炸箭矢，对目标和目标周围一定范围造成攻击，相比三发散射，爆炸射击的伤害目标更多，并且能造成更多伤害。'
        }
    ],
    assassin : [
        {
          name : '火镰狂舞',
          pic : 'jn_ck_hlkw',
          desc : '炎龙波后有一定概率使下一次普通攻击变为火镰狂舞,对左,左前,前,右前,右造成大量伤害 ,并向主目标施放刺客标记。'
        },
        {
          name : '血魄一击',
          pic : 'jn_ck_xpyj',
          desc : '使用后,向刺客的正前方突刺3-5格,并对遇到的第一个敌人造成大量伤害及副手攻击,其他敌人则只使用副手攻击。'
        },
        {
          name : '暗影形态',
          pic : 'jn_ck_ayxt',
          desc : '开启暗影形态后,3连击触发概率增加,副手攻击概率增加,增加免伤,破甲,减少鬼灵步CD。'
        }
    ]
}
//广告图获取
loadjs("//game.qq.com/time/qqadv/Info_new_11466.js",function(){ /*广告替换-替换成项目链接*/ /*广告替换-替换成项目链接*/
	var _t = oDaTaNew11466, /*广告替换-替换成项目广告JSON里面的名称*/
		count = 0,countryObj,fn_a = [],fn_img = [],fn_txt = [],nowA = "",i;
	oDaTaNew11466 = null;
	for(countryObj in _t){  
		if(_t[countryObj] && _t[countryObj][5] =="150420"){ count++;} //计算广告数目
		if(_t[countryObj][5] == "150420"){ /*广告替换-替换成项目广告位ID*/
		fn_a.push(_t[countryObj][1]);
		fn_img.push(_t[countryObj][2]);
		fn_txt.push(decodeURI(_t[countryObj][0]));
		}
	}
	for ( i = 0; i < count; i++) {
		 nowA += '<a href="'+fn_a[i]+'"target="_blank"  onclick="PTTSendClick(\'link\',\'lunAd'+i+'\',\'轮播广告'+i+'\');">';
		 nowA += '<img src="//ossweb-img.qq.com/upload/adw/'+fn_img[i]+'"  alt="" />';
		 nowA += '</a>';
	}
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < count; i++) {
	btn += "<span class='dotItem'>"+ fn_txt[i] +"</span>";
	}
	btn += "</div></div>";
	 $(".adPic").html(nowA);
	$("#adBtn").html(btn);
	 initMedia();//启动轮播
})
// 滚动切换
var tabsTop = new tabs("tab1", "tab-panel",{
    onFinish: function(x,y){
    	$(".news-more").attr("href",$(".tab-top a").eq(y).attr("href"));
    	$('#tab1 .tab-border').css('left',(y*60+10)+'px');
    }
});
var tabsFeat = new tabs("feature", "feature",{
	onFinish : function(x,y){
		$('.roles img').removeClass('cur').eq(y).addClass('cur');
	},
	auto : true
});
var tabsOccu = new tabs('occu-tab','occu-box',{
	onFinish : function(x,y){
		$('.occu-pic img').removeClass('cur').eq(y).addClass('cur');
	},
	auto : false
});
var tabData = new tabs('game-detail','game-detail',{
	auto : false
});
var tabUpon = new tabs('upon-game','game-lead',{
	auto : false
});
var tabBBS = new tabs('bbs','tab-panel');
$('#occu-tab .skill-list span').bind('click',function(){
	tabsOccu.stopSwitch();
	tabData.stopSwitch();
	var $skillBox = $('.skill-box'),occu = $(this).parent().parent().find('.occu-tit span').text().toLocaleLowerCase(),skills = skillList[occu],detail = '',type=$(this).parent().parent().find('.occu-tit').text().slice(0,2);
	//pgvSendClick({hottag:'main.occu.skill.'+type});
	PTTSendClick('btn','skill','技能'+type);
	
	detail = '<div class="skill-ctrl"><a href="javascript:;" class="skill-prev">&lt;上一个技能</a><a href="javascript:;" class="skill-next">下一个技能&gt;</a></div><h6><span>';
	detail += type + '</span>技能之<a href="javascritp:;" class="back">返回职业介绍</a></h6>';
	for(var i = 0;i<3;i++){
		detail += '<div class="skill-detail"><img src="//ossweb-img.qq.com/images/mir/web201804/pic/skill/';
		detail += skills[i].pic;
		detail += '.jpg" alt=""><p class="skill-name">';
		detail += skills[i].name;
		detail += '</p><p class="skill-desc">';
		detail += skills[i].desc;
		detail += '</p></div>'
	}
	$skillBox.append(detail);
	var tabSkill = new tabs('skill-box','skill-detail',{
		auto : true,
		trigger : false
	});
	$skillBox.find('.skill-next').bind('click',function(){
		//pgvSendClick({hottag:'main.occu.skill.next'});
		PTTSendClick('btn','nextskill','下一个');
		tabSkill.next();
	});
	$skillBox.find('.skill-prev').bind('click',function(){
		//pgvSendClick({hottag:'main.occu.skill.prev'});
		PTTSendClick('btn','prevskill','上一个');
		tabSkill.prev();
	});
	$skillBox.show();
	$skillBox.find('.back').bind('click',function(){
		//pgvSendClick({hottag:'main.occu.skill.hide'});
		PTTSendClick('btn','hideskill','隐藏');
		tabSkill = null;
		$skillBox.hide();
		tabsOccu.goonSwitch();
		tabData.goonSwitch();
		$skillBox.html('');
	});
})
$('.feat-img a').bind('click',function(){
	tabsFeat.stopSwitch();
	var $picLs = $(this).parent().find('img');$picL = $picLs.length,$pic=$('.slide-pic');
	for(var i = 0;i < $picL;i++){
		var n = $picLs.eq(i).attr('alt');
		$('.pic-wrap').append('<img class="pic-li" src="//ossweb-img.qq.com/images/mir/web201506/pic/pic-b' + n + '.jpg" alt="" width="500" height="282" />')
	}
	var tabPic = new tabs('slide-pic','pic-li',{
		animation : 'slide',
		change : 500,
		duration : 50,
		trigger : false,
		auto : true
	});
	$pic.show();
	$pic.find('.next').bind('click',function(){
		tabPic.next();
	});
	$pic.find('.prev').bind('click',function(){
		tabPic.prev();
	});
	$pic.find('.close').bind('click',function(){
		$('.pic-wrap').html('');
		$pic.hide();
		var tabPic = null;
		tabsFeat.goonSwitch();
	});
});
});/*  |xGv00|bc8eb25b2e9c8c7cb36c53849f4a4d99 */
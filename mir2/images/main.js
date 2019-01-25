$(function(){
var skillList = {
	warrior : [
		{
			name : '�����䵶',
			pic : 'jn_zs_bywd',
			desc : 'սʿ�ǲ���ƥ�еľ��ˣ���������η�����̬����ս������ǰ���������䵶��Ϊսʿ�Ļ���AOE���ܣ��þ����Ϳ����ƶ��ı���ͬʱ������ǰ�����е��ˣ��õ���Ѫ���ķ�����սʿ�����ó��Ľ���ս���о����ͷŸ���֮���Ŀ���������'
		},
		{
			name : '�һ𽣷�',
			pic : 'jn_zs_lhjf',
			desc : '�һ𽣷���սʿ�ĵ��屬�����ܣ�CD������������ߡ����˻���ķ���������һ������ֱǰ��սʿ���Ӳ�η������������ȼ��������һ𣬿�սʿ���еĲ����⣬���е����˱����ᡣ'
		},
		{
			name : 'Ұ����ײ',
			pic : 'jn_zs_ymcz',
			desc : '��ÿһ��ս���У�սʿ������ŭ�����ף���̤ȫ���ľ������ǡ�ȫ������ɢ���������������Ұ����ײ�����սʿ֮������ȫ���������ӵ����£������ɽ�Ӷ�Ϊ֮�𺳶�ҡ��'	
		}
	],
	wizard : [
		{
			name : '�����Ӱ',
			pic : 'jn_fs_jgdy',
			desc : 'Զ�̹�������ǿ������Ƿ�ʦ��ְҵ��ɫ�������Ӱ--��ʦְҵ��ֱ�߹������ܣ�һ���ͷų�����Ĺ��������ħ�������ܴ���ʱ����һ��ҫ��ǿ�⣬�·����׵�֮�ƣ�����������귨��½������������һ�������糤����գ�'
		},
		{
			name : '�����׹�',
			pic : 'jn_fs_dylg',
			desc : 'ǿ���������׹�籩��Ѹ��֮�Ʋ����ڶ�����ʦ�����Ѿõ���Ȼ����������ɴ�Χ���˺��������׹⹥���������Ա���������ߣ����ͬʱ�˺������ɴ�24�ˡ�����������˲���ƵС�'
		},
		{
			name : '���ǻ���',
			pic : 'jn_fs_lxhy',
			desc : '��ʦְҵ�ĸ߼�AOE���ܣ�ӵ�г�Խ������֮�ϵĿֲ���������ħ���������£���ʦ����·�û����������漴һ�����ҵĻ�����������˲�䱬���������ɱ�������ڷ��������ڵ��κ����ﶼ���ܵ�������˺������ǻ����ǻ�ϵħ�����۷弼�ܣ���������ħ�����ռ����塣'
		}
	],
	taoist : [
		{
			name : '������',
			pic : 'jn_ds_zys',
			desc : '��ʿ--�귨��½�͵��������ص���Ⱥ�����ų�Խ��������ľ��������������ƿ���꣬�����������Ƕ�����ʩ�ŵ����Ʒ�������Ч������ʱ���ڽ���һ��������ֵ�ظ����ؼ�ʱ�̣�����ŤתǬ����'
		},
		{
			name : '��ħ��',
			pic : 'jn_ds_kmz',
			desc : 'һ�����䣬�����ƿ����֮���������˽�����ԭ�ء��޴����ӣ������˴������޵����Ķ���Ч������ħ��һ����ǿ��������ؽ���������ش���������һ����'
		},
		{
			name : '��Ѫ��',
			pic : 'jn_ds_sxs',
			desc : 'һ���Ĭ�͵��ĵ�ʿ���б���ŭ��ʱ����������ʹ������Ե�������˺������������к���ȡ�Է�������Ϊ�Լ��ظ�һ����Ѫ������Ѫ��������ص��˺�Ч����ʵ���˾�̾��־塣'
		}
	],
    archer : [
        {
          name : '��ħ����',
          pic : 'jn_gjs_emjl',
          desc : '��������Ϊ�����ļ��ܣ�����ħ�����ڹ�����ʱ���������ݷ����ħ��ӵ�м�ǿ��ɱ�������ڱ���ʱ���ڹ����������˺������мӳɣ���������ø����������޷��ƶ��������ֶ�ȡ������'
        },
        {
          name : '�������',
          pic : 'jn_gjs_xlsj',
          desc : '�����ֺ��ĵ����˺����ܣ�ֻ������1.5�룬���ܶԵ�����ɴ����˺����ͷŴ˼���ʱ�����ֽ�ȫ�����������ڼ��⣬Ѹ������Ŀ�꣬��һ������ˮ��ĺ���ֱ�����������˲���������'
        },
        {
          name : '��ը���',
          pic : 'jn_gjs_bzsj',
          desc : '����Ⱥ�幥�����ܣ�ѡȡ�ɹ�����Ŀ��������ը��ʸ����Ŀ���Ŀ����Χһ����Χ��ɹ������������ɢ�䣬��ը������˺�Ŀ����࣬��������ɸ����˺���'
        }
    ],
    assassin : [
        {
          name : '��������',
          pic : 'jn_ck_hlkw',
          desc : '����������һ������ʹ��һ����ͨ������Ϊ��������,����,��ǰ,ǰ,��ǰ,����ɴ����˺� ,������Ŀ��ʩ�Ŵ̿ͱ�ǡ�'
        },
        {
          name : 'Ѫ��һ��',
          pic : 'jn_ck_xpyj',
          desc : 'ʹ�ú�,��̿͵���ǰ��ͻ��3-5��,���������ĵ�һ��������ɴ����˺������ֹ���,����������ֻʹ�ø��ֹ�����'
        },
        {
          name : '��Ӱ��̬',
          pic : 'jn_ck_ayxt',
          desc : '������Ӱ��̬��,3����������������,���ֹ�����������,��������,�Ƽ�,���ٹ��鲽CD��'
        }
    ]
}
//���ͼ��ȡ
loadjs("//game.qq.com/time/qqadv/Info_new_11466.js",function(){ /*����滻-�滻����Ŀ����*/ /*����滻-�滻����Ŀ����*/
	var _t = oDaTaNew11466, /*����滻-�滻����Ŀ���JSON���������*/
		count = 0,countryObj,fn_a = [],fn_img = [],fn_txt = [],nowA = "",i;
	oDaTaNew11466 = null;
	for(countryObj in _t){  
		if(_t[countryObj] && _t[countryObj][5] =="150420"){ count++;} //��������Ŀ
		if(_t[countryObj][5] == "150420"){ /*����滻-�滻����Ŀ���λID*/
		fn_a.push(_t[countryObj][1]);
		fn_img.push(_t[countryObj][2]);
		fn_txt.push(decodeURI(_t[countryObj][0]));
		}
	}
	for ( i = 0; i < count; i++) {
		 nowA += '<a href="'+fn_a[i]+'"target="_blank"  onclick="PTTSendClick(\'link\',\'lunAd'+i+'\',\'�ֲ����'+i+'\');">';
		 nowA += '<img src="//ossweb-img.qq.com/upload/adw/'+fn_img[i]+'"  alt="" />';
		 nowA += '</a>';
	}
	//���´���������ְ�ť�Ͱ�ť��İ�͸������������һҳ����һҳ������ť
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < count; i++) {
	btn += "<span class='dotItem'>"+ fn_txt[i] +"</span>";
	}
	btn += "</div></div>";
	 $(".adPic").html(nowA);
	$("#adBtn").html(btn);
	 initMedia();//�����ֲ�
})
// �����л�
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
	PTTSendClick('btn','skill','����'+type);
	
	detail = '<div class="skill-ctrl"><a href="javascript:;" class="skill-prev">&lt;��һ������</a><a href="javascript:;" class="skill-next">��һ������&gt;</a></div><h6><span>';
	detail += type + '</span>����֮<a href="javascritp:;" class="back">����ְҵ����</a></h6>';
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
		PTTSendClick('btn','nextskill','��һ��');
		tabSkill.next();
	});
	$skillBox.find('.skill-prev').bind('click',function(){
		//pgvSendClick({hottag:'main.occu.skill.prev'});
		PTTSendClick('btn','prevskill','��һ��');
		tabSkill.prev();
	});
	$skillBox.show();
	$skillBox.find('.back').bind('click',function(){
		//pgvSendClick({hottag:'main.occu.skill.hide'});
		PTTSendClick('btn','hideskill','����');
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
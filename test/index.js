const CIRCLE_ANGLE = 360;
const BIGSIZE = 24;
let data =[{ //可以随意更改奖项个数
  id:1,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆10"
  },{
  id:2,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆20"
  },{
  id:3,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆30"
  },{
  id:4,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆40"
  },{
  id:5,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆50"
  },{
  id:6,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆60"
  } ,{
  id:7,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆70"
  },{
  id:8,
  img:'https://img01.yzcdn.cn/vant/cat.jpeg',
  prize_name:"乐豆80"
  }
];
let angleList = []; // 记录每个奖的位置
let gift_id =3; //中奖ID
let prizeList = formatPrizeList(data); //有样式的奖品列表
let index='';//抽中的是第几个奖品
let isRotating = false; //为了防止重复点击
let rotateAngle = 0;
let bgDom = document.getElementsByClassName('luckWhellBgMain')[0];
let divDom = document.getElementsByClassName('prize-list')[0];
prizeAddHtml(prizeList);
//每个奖增加style
function formatPrizeList(list) {			  
  const l = list.length;
  // 计算单个奖项所占的角度
  const average = CIRCLE_ANGLE / l; //60
  const half = average / 2; //30			  
  const rightBig = l==2?'50':'0';
  const heightBig = l<=3?'100':'50';
  const topBig = l==3?'-50':'0';
  const skewMain = l<=2?0:-(l-4)*90/l;
  // 循环计算给每个奖项添加style属性
  list.forEach((item, i) => {
  // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
  const angle = -(i * average + half);	
  const bigAge = l>2?i*360/l:'0';
  // 增加 style 这个是给每一个奖项增加的样式
  item.style = `-webkit-transform: rotate(${-angle}deg);
          transform: rotate(${-angle}deg);
          width:${100/l*2}%;  
          margin-left: -${100/l}%;
          font-size:${BIGSIZE-l}px;`;
  //这是给每一个转盘背景新增的样式
  item.style2 = `-webkit-transform: rotate(${bigAge}deg);
          transform: rotate(${bigAge}deg) skewY(${skewMain}deg);
          right:${rightBig*i}%;
          height:${heightBig}%;
          top:${topBig}%;
          width:${l==1?100:50}%;
          background:${item.color}
          `
    // 记录每个奖项的角度范围
    angleList.push(angle);         
  });	         
  return list;
};
//奖品赋值到每个奖品中；
function prizeAddHtml(prizeList) {
  console.log(prizeList)
  //把奖品赋值到.luckWhellBgMain
  let htmlBg = '';
  let htmlDiv = '';
  for(let i=0,len=prizeList.length;i<len;i++){
    htmlBg+=`<div class="luckWhellSector" style="${prizeList[i].style2}"></div>`;
    htmlDiv+=`<div class="prize-item"  style="${prizeList[i].style}">							
          <div>
            ${prizeList[i].prize_name}                
          </div>	
          <div style="padding-top:5px;">
            <img src=" ${prizeList[i].img}" style="width:45%"/>
          </div>	
        </div>`
  }       
  bgDom.innerHTML= htmlBg;        
  divDom.innerHTML = htmlDiv;
};
//抽奖
function prizeRoll() {
  if(isRotating) return false;
  gift_id = Math.floor(1+Math.random()*prizeList.length);        
  console.log(gift_id);
  prizeList.forEach((item,i)=>{
    if(item.id == gift_id) index = i; //判断中奖的位置
  });
  rotating();				
};
//转盘转动角度
function rotating() {
  isRotating = true;
  // const {rotateAngle,angleList,config,index} = {0,angleList,{duration:5000, circle: 8,mode: "ease-in-out"},index};
    const config = {
      duration:5000, 
      circle: 8,
      mode: "ease-in-out"
    }
    // 计算角度
    const angle =
    // 初始角度
    rotateAngle +
    // 多旋转的圈数
    config.circle * CIRCLE_ANGLE +
    // 奖项的角度
    angleList[index] -
    (rotateAngle % CIRCLE_ANGLE);
      rotateAngle = angle;
      bgDom.style.transform = `rotate(${rotateAngle}deg)`
      divDom.style.transform = `rotate(${rotateAngle}deg)`
    // 旋转结束后，允许再次触发
    setTimeout(() => {
      isRotating = false;
      console.log('旋转结束')					
    }, config.duration + 500);
}			
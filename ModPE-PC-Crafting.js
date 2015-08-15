/*
*
* PC Crafting Script
* Copyright 2015. PlanP/SSY all right reserved.
* Do not modify this file
* Do not use this source
* Develop 53% ver.
*
*/

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var bl = net.zhuoweizhang.mcpelauncher;
//Import
var Button = android.widget.Button;
var TextView = android.widget.TextView;
var ImageView = android.widget.ImageView;
var Toast = android.widget.Toast;
var LinearLayout = android.widget.LinearLayout;
var FrameLayout = android.widget.FrameLayout;
var PopupWindow = android.widget.PopupWindow;
var ScrollView = android.widget.ScrollView;
//widget
var GONE = android.view.View.GONE;
var VISIBLE = android.view.View.VISIBLE;
var OnTouchListener = android.view.View.OnTouchListener;
var OnClickListener = android.view.View.OnClickListener;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
//View
var AlertDialog = android.app.AlertDialog;
var Intent = android.content.Intent;
var Uri = android.net.Uri;
//app / content / net
var Bitmap = android.graphics.Bitmap;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var Drawable = android.graphics.drawable.Drawaable;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var Typeface = android.graphics.Typeface;
var Color = android.graphics.Color;
var BitmapFactory = android.graphics.BitmapFactory
//Graphics
var File = java.io.File;
var BufferedInputStream = java.io.BufferedInputStream;
var FileInputStream = java.io.FileInputStream;
var InputStream = java.io.InputStream;
//file
var BufferedImage = java.awt.image.BufferedImage;
//E.T.C
var invenWindow = null;
var craftWindow = null;
var backWindow = null;

var WIDTH = ctx.getScreenWidth();
var HEIGHT = ctx.getScreenHeight();

var selNum = 1;
var craftingValue = [[0,0],[0,0],[0,0], [0,0],[0,0],[0,0], [0,0],[0,0],[0,0]];

var font = null;

var lang = readInput(ModPE.openInputStreamFromTexturePack("lang/"+readOption("game_language")+"-pocket.lang"));

var sheet = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
var touchGUI = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png"));
var GUI = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/gui.png"));

var terrainTexture = bl.texture.tga.TGALoader.load(ModPE.openInputStreamFromTexturePack("images/terrain-atlas.tga"),false);
var itemTexture = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/items-opaque.png"));

var terrainMeta = readInput(ModPE.openInputStreamFromTexturePack("images/terrain.meta"));
var itemMeta = readInput(ModPE.openInputStreamFromTexturePack("images/items.meta"));

var text = {};

var bitmap = {
 NormalDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,8,32,8,8);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(16),dp(16),false);
	 return createNinePatch(bit, dp(4), dp(4), dp(12), dp(14));
 },
 PushDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,0,32,8,8);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(16),dp(16),false);
	 return createNinePatch(bit, dp(4), dp(4), dp(12), dp(14));
 },
 HeadDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(touchGUI,150,26,14,30);
  for(var i=0;i<26;i++)
  {
   bitmap.setPixel(2,i,bitmap.getPixel(3,i));
   bitmap.setPixel(11,i,bitmap.getPixel(10,i));
  }
  for(var i=3;i<11;i++)
  {
   bitmap.setPixel(i,25,bitmap.getPixel(i,26));
   bitmap.setPixel(i,26,bitmap.getPixel(i,27));
   bitmap.setPixel(i,27,bitmap.getPixel(i,28));
   bitmap.setPixel(i,28,0x00000000);
  }
  for(var i=0;i<14;i++)
  {
   bitmap.setPixel(i,25,bitmap.getPixel(4,25));
   bitmap.setPixel(i,26,bitmap.getPixel(4,26));
   bitmap.setPixel(i,27,bitmap.getPixel(4,27));
  }
  var bit = Bitmap.createScaledBitmap(bitmap,dp(28),dp(60),false);
	 return createNinePatch(bit, dp(5), dp(7), dp(46), dp(22));
 },
 BackDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,0,0,16,16);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(32),dp(32),false);
	 return createNinePatch(bit, dp(10), dp(10), dp(24), dp(24));
 },
 FrameDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,28,42,4,4);
  bitmap.setPixel(1,1,Color.parseColor("#ff333333"));
  bitmap.setPixel(1,2,Color.parseColor("#ff333333"));
  bitmap.setPixel(2,1,Color.parseColor("#ff333333"));
  bitmap.setPixel(2,2,Color.parseColor("#ff333333"));
  
  var bit = Bitmap.createScaledBitmap(bitmap,dp(8),dp(8),false);
	 return createNinePatch(bit, dp(2), dp(2), dp(6), dp(6));
 },
 XNormalDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,60,0,18,18);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(100),dp(100),false);
	 return new BitmapDrawable(bit);
 },
 XPushDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,78,0,18,18);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(100),dp(100),false);
	 return new BitmapDrawable(bit);
 },
 InvenBackDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(GUI,200,46,16,16);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(42),dp(42),false);
	 return createNinePatch(bit, dp(2), dp(2), dp(40), dp(40));
 },
 CaseDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,10,42,16,16);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(32),dp(32),false);
	 return createNinePatch(bit, dp(8), dp(8), dp(20), dp(20));
 },
 ArrawBitmap:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,73,36,22,15);
  return Bitmap.createScaledBitmap(bitmap,dp(44),dp(30),false);
 	},
 	ToastDrawable:function()
 {
  var bitmap = Bitmap.createBitmap(sheet,34,43,14,14);
  var bit = Bitmap.createScaledBitmap(bitmap,dp(56),dp(56),false);
	 return createNinePatch(bit, dp(12), dp(12), dp(44), dp(44));
 },
};

var MC ={
 Button:function(ctx)
 {
  var bt = new Button(ctx);
  
  bt.setTextColor(Color.parseColor("#ffe1e1e1"));
  bt.setTextSize(16);
  bt.setTypeface(font);
  bt.setShadowLayer(1,dp(2),dp(2), Color.argb(255, 44, 44, 44));
  
  bt.setOnTouchListener(new OnTouchListener(
  {
   onTouch:function(view,event)
   {
    if(event.getAction() == MotionEvent.ACTION_DOWN)
    {
     bt.setBackgroundDrawable(bitmap.PushDrawable());
     bt.setTextColor(Color.parseColor("#ffffa1"));
    }
    if(event.getAction() == MotionEvent.ACTION_UP)
    {
     bt.setBackgroundDrawable(bitmap.NormalDrawable());
     bt.setTextColor(Color.parseColor("#e1e1e1"));
    }
    return false;
   }
  }));
  bt.setBackgroundDrawable(bitmap.NormalDrawable());
  
  return bt;
 },
 TextButton:function(ctx)
 {
  var bt = new Button(ctx);
  
  bt.setTextColor(Color.parseColor("#ffe1e1e1"));
  bt.setTextSize(8);
  bt.setTypeface(font);
  bt.setShadowLayer(1,dp(2),dp(2), Color.argb(255, 44, 44, 44));
  
  return bt;
 },
 XButton:function(ctx)
 {
  var bt = new Button(ctx);
  
  bt.setOnTouchListener(new OnTouchListener(
  {
   onTouch:function(view,event)
   {
    if(event.getAction() == MotionEvent.ACTION_DOWN) bt.setBackgroundDrawable(bitmap.XPushDrawable());
    if(event.getAction() == MotionEvent.ACTION_UP) bt.setBackgroundDrawable(bitmap.XNormalDrawable());
    return false;
   }
  }));
  bt.setBackgroundDrawable(bitmap.XNormalDrawable());
  
  return bt;
 },
 TextView:function(ctx)
 {
  var tv = new TextView(ctx);
  
  tv.setTextColor(Color.parseColor("#ffe1e1e1"));
  tv.setTextSize(16);
  tv.setTypeface(font);
  tv.setShadowLayer(1,dp(2),dp(2), Color.argb(255, 44, 44, 44));
  
  return tv;
 }
};

//BlockImageLoader Library made by Appogatoman Thanks
var BIL_Data = ""

try
{
 if(BIL_Data=="") BIL_Data = readURL("https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/BlockImageLoader/BlockImageLoader.js");
}catch(e) {}

var f = new File(ctx.getDir("pc_crafting",ctx.MODE_WORLD_READABLE));
var file = new File(f + "/BlockImageLoader.js");

if(BIL_Data=="")
{
 if(!file.exists()) MCToast("BlockImageLoader file isn't exists in system file!!\nPlease load this script on internet again.");
 BIL_Data = read(file,true) + "";
}

eval(BIL_Data);

ctx.setTheme(android.R.style.Theme_Holo_Light)
ctx.runOnUiThread(new java.lang.Runnable(
{
 run : function()
 {
  try
  {
   var path = android.os.Environment.getExternalStorageDirectory() + "/PlanP/Mods/mc.ttf";
   if(!new File(path).exists()) downFile("https://docs.google.com/uc?authuser=0&id=0BynSEqQ9CpItd0o3WG9JYktINlk&export=download","/PlanP/Mods/","mc.ttf");
   else font = Typeface.createFromFile(path);
   
   var f = new File(ctx.getDir("pc_crafting",ctx.MODE_WORLD_WRITEABLE));
   var file = new File(f + "/BlockImageLoader.js");
   
   if(BIL_Data!="") saveFile(file, BIL_Data);
  }
  catch(e) { errorAlert(e); }
 }
}));

MCToast("Special Thanks to Appogattoman");

var ItemImageLoader = {};
//Help Appogatoman Really Thanks :D
ItemImageLoader.META = eval(new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"))+"");
ItemImageLoader.META_MAPPED = ItemImageLoader.META.map(function(e) { return e.name; });
ItemImageLoader.IMAGE = BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/items-opaque.png"));

ItemImageLoader.create = function(name)
{
 var uvs = ItemImageLoader.META[ItemImageLoader.META_MAPPED.indexOf(name[0])].uvs[name[1]];
 
 var x = uvs[0]*ItemImageLoader.IMAGE.getWidth();
 var y = uvs[1]*ItemImageLoader.IMAGE.getHeight();
 var width = uvs[2]*ItemImageLoader.IMAGE.getWidth()-x;
 width = Math.ceil(width);
 var height = uvs[3]*ItemImageLoader.IMAGE.getHeight()-y;
 height = Math.ceil(height);
 
 return Bitmap.createScaledBitmap(Bitmap.createBitmap(ItemImageLoader.IMAGE, x, y, width, height), 32, 32, false);
};




function getBlockItem(itemId)
{
 var left = ["null",0];
 var right = left;
 var top = left;
 var type = 0;
 
 var i = itemId[0];
 var d = itemId[1];
 
 if(i==1) { left = ["stone",d]; right = left; top = left; }
 if(i==2) { left = ["grass",3]; right = ["grass",3]; top = ["grass",2]; }
 if(i==3) { left = ["dirt",0]; right = left; top = left; }
 if(i==4) { left = ["cobblestone",0]; right = left; top = left; }
 if(i==5) { left = ["planks",0]; right = left; top = left; }
 if(i==6) { left = ["reeds",0]; type = "item" }
 if(i==7) { left = ["bedrock",0]; right = left; top = left; }
 if(i==8) { left = ["flowing_water",0]; type = "item" }
 if(i==9) { left = ["still_water",0]; type = "item" }
 if(i==10) { left = ["flowing_lava",0]; type = "item" }
 if(i==11) { left = ["still_lava",0]; type = "item" }
 if(i==12) { left = ["sand",0]; right = left; top = left; }
 if(i==13) { left = ["gravel",0]; right = left; top = left; }
 if(i==14) { left = ["gold_ore",0]; right = left; top = left; }
 if(i==15) { left = ["iron_ore",0]; right = left; top = left; }
 if(i==16) { left = ["coal_ore",0]; right = left; top = left; }
 if(i==17) { left = ["log",0]; right = left; top = ["log",1]; }
 if(i==18) { left = ["leaves",0]; right = left; top = left; }
 if(i==19) { left = ["sponge",0]; right = left; top = left; }
 if(i==20) { left = ["glass",0]; right = left; top = left; }
 if(i==21) { left = ["lapis_ore",0]; right = left; top = left; }
 if(i==22) { left = ["lapis_block",0]; right = left; top = left; }
 if(i==24) { left = ["sandstone",0]; right = left; top = ["sandstone",3]; }
 if(i==27) { left = ["rail_golden_powered",0]; type = "item" }
 if(i==30) { left = ["web",0]; type = "item" }
 if(i==35) { left = ["wool",0]; right = left; top = left; }
 if(i==41) { left = ["gold_block",0]; right = left; top = left; }
 if(i==42) { left = ["iron_block",0]; right = left; top = left; }
 if(i==44) { left = ["stone_slab",1]; right = ["stone_slab",1]; top = ["stone_slab",0]; type = BlockTypes.SLAB}
 if(i==45) { left = ["brick",0]; right = left; top = left; }
 if(i==46) { left = ["tnt",0]; right = left; top = ["tnt",1]; }
 if(i==47) { left = ["bookshelf",0]; right = left; top = ["bookshelf",1]; }
 if(i==61) { left = ["furnace",0]; right = ["furnace",2]; top = ["furnace",3]; }
 if(i==62) { left = ["furnace",1]; right = ["furnace",2]; top = ["furnace",3]; }
 if(i==65) { left = ["ladder",0]; type = "item" }
 if(i==66) { left = ["rail_normal",0]; type = "item" }
 if(i==67) { left = ["cobblestone",0]; right = ["cobblestone",0]; top = ["cobblestone",0]; type = 1; }
 if(i==73) { left = ["redstone_ore",0]; right = left; top = left; }
 if(i==78) { left = ["snow",0]; right = left; top = left; type = 3; }
 if(i==79) { left = ["ice",0]; right = left; top = left; }
 if(i==80) { left = ["snow",0]; right = left; top = left; }
 if(i==81) { left = ["cactus",1]; right = ["cactus",1]; top = ["cactus",0]; }
 
 if(i==280) left = ["stick",0];

 var bit = null;
 ctx.runOnUiThread(new java.lang.Runnable(
 {
  run: function()
  {
   try
   {
    var origin = null;
    if(i<=255 && type != "item") origin = BlockImageLoader.create(left, right, top, type);
    else if(type != "item") origin = ItemImageLoader.create(left);
    else origin = BlockImageLoader.getBlockBitmap(left[0],left[1]);

    var after = Bitmap.createBitmap(origin.getWidth() + dp(20), origin.getHeight() + dp(20),Bitmap.Config.ARGB_8888);
    var canvas = new Canvas(after);
    
    canvas.drawBitmap(origin,dp(10),dp(10),null);
    
    bit = after;
   } catch(error) {  }
  }
 }));
 
 return bit;
}



function craftingRecipe()
{
 var value = [0,0,0];
 var s = new Array();
 s[0] = craftingValue[0];
 s[1] = craftingValue[3];
 s[2] = craftingValue[6];
 s[3] = craftingValue[1];
 s[4] = craftingValue[4];
 s[5] = craftingValue[7];
 s[6] = craftingValue[2];
 s[7] = craftingValue[5];
 s[8] = craftingValue[8];

  var recipe = s[0][0] + ":" + s[0][1] + "," + 
               s[1][0] + ":" + s[1][1] + "," + 
			   s[2][0] + ":" + s[2][1] + "," + 
			   s[3][0] + ":" + s[3][1] + "," + 
			   s[4][0] + ":" + s[4][1] + "," + 
			   s[5][0] + ":" + s[5][1] + "," + 
			   s[6][0] + ":" + s[6][1] + "," + 
			   s[7][0] + ":" + s[7][1] + "," + 
			   s[8][0] + ":" + s[8][1];
  
 var crafting_recipe =
 [
 ["17:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0",[5,0,4]],
 ["0:0,17:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0",[5,0,4]],
 ["0:0,0:0,17:0,0:0,0:0,0:0,0:0,0:0,0:0",[5,0,4]],
 ["0:0,0:0,0:0,17:0,0:0,0:0,0:0,0:0,0:0",[5,0,4]],
 ["0:0,0:0,0:0,0:0,17:0,0:0,0:0,0:0,0:0",[5,0,4]],
 ["0:0,0:0,0:0,0:0,0:0,17:0,0:0,0:0,0:0",[5,0,4]],
 ["0:0,0:0,0:0,0:0,0:0,0:0,17:0,0:0,0:0",[5,0,4]],
 ["0:0,0:0,0:0,0:0,0:0,0:0,0:0,17:0,0:0",[5,0,4]],
 ["0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,17:0",[5,0,4]],

 ["0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0,0:0",[0,0,0]]
 ];
 
 for(var t=0;t<crafting_recipe.length-1;t++)
 {
  if(crafting_recipe[t][0] == recipe) value = crafting_recipe[t][1];
 }
 
 return value;
}



function newLevel()
{
 lang = readInput(ModPE.openInputStreamFromTexturePack("lang/"+readOption("game_language")+"-pocket.lang"));

 text = {
 inven:function()
 {
  var str = "chestScreen.header.player";
  var l = lang.split("\n");
  for(var i=0;i<l.length;i++)
  {
   if((l[i]+"").indexOf("chestScreen.header.player")!=-1) str = l[i].split("=")[1];
  }
  return str;
 },
 craft:function()
 {
  var str = "Crafting";
  
  var nowLang = readOption("game_language");
  if(nowLang=="ko_KR") str = "조합 하기";
  if(nowLang=="ja_JP") str = "組み合わせ";
  if(nowLang=="it_IT") str = "Combinando";
  
  var l = lang.split("\n");
  for(var i=0;i<l.length;i++)
  {
   if((l[i]+"").indexOf("crafting.header")!=-1) str = l[i].split("=")[1];
  }
  return str;
 },
}
}

function useItem(x,y,z,i,b)
{
 if(b==58 && Level.getGameMode()==0) crafting();
}

function crafting()
{
 preventDefault();
 ctx.runOnUiThread(new java.lang.Runnable(
 {
  run: function()
  {
   try
   {
    if(backWindow!=null)
      {
       backWindow.dismiss();
       backWindow=null;
      }
      if(invenWindow!=null)
      {
       invenWindow.dismiss();
       invenWindow=null;
      }
      if(craftWindow!=null)
      {
       craftWindow.dismiss();
       craftWindow=null;
      }
    
    backWindow = new PopupWindow(ctx);
    var mainLayout = new FrameLayout(ctx);
    
    var titleLayout = new LinearLayout(ctx);
    
    var craft = MC.TextView(ctx);
    craft.setText(text.craft());
    craft.setTextSize(16);
    craft.setGravity(Gravity.TOP|Gravity.CENTER);
    
    var closeLayout = new LinearLayout(ctx);
    closeLayout.setGravity(Gravity.RIGHT|Gravity.TOP);
    
    var close = new MC.XButton(ctx);
    
    close.setOnClickListener(new OnClickListener(
    {
     onClick:function(v)
     {
      if(backWindow!=null)
      {
       backWindow.dismiss();
       backWindow=null;
      }
      if(invenWindow!=null)
      {
       invenWindow.dismiss();
       invenWindow=null;
      }
      if(craftWindow!=null)
      {
       craftWindow.dismiss();
       craftWindow=null;
      }
      craftingValue = [[0,0],[0,0],[0,0], [0,0],[0,0],[0,0], [0,0],[0,0],[0,0]];
      selNum=1;
     }
    }));
    
    closeLayout.addView(close,dp(42),dp(42));
    
    titleLayout.setGravity(Gravity.CENTER|Gravity.CENTER);
    titleLayout.addView(craft,WIDTH,dp(24));
    titleLayout.setBackground(bitmap.HeadDrawable());
    
    mainLayout.addView(titleLayout,WIDTH,dp(66));
    mainLayout.addView(closeLayout,WIDTH,dp(45));
    
    backWindow.setContentView(mainLayout);
    backWindow.setBackgroundDrawable(bitmap.BackDrawable());
    backWindow.setWidth(WIDTH);
    backWindow.setHeight(HEIGHT);
    backWindow.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT| Gravity.TOP, dp(0), dp(0));
    
    invenWindow = new PopupWindow(ctx);
    
    var invenLayout = new LinearLayout(ctx);
    var invenScroll = new ScrollView(ctx);
    
    var in1 = new LinearLayout(ctx);
    var in2 = new LinearLayout(ctx);
    var in3 = new LinearLayout(ctx);
    var in4 = new LinearLayout(ctx);
    var in5 = new LinearLayout(ctx);
    
    in1.setOrientation(1);
    in2.setOrientation(1);
    in3.setOrientation(1);
    in4.setOrientation(1);
    in5.setOrientation(1);
    
    var invenFrame = new Array();
    var itemImg = new Array();
    var itemImgCount = new Array();
    
    var img = new Array();
    var imgCount = new Array();
    
    var slotLine1 = new LinearLayout(ctx);
    var slotLine2 = new LinearLayout(ctx);
    var slotLine3 = new LinearLayout(ctx);
    
    var slot = new Array();
    
    var resultLayout = new FrameLayout(ctx);
    
    var resultImage = new ImageView(ctx);
    resultImage.setBackgroundDrawable(bitmap.InvenBackDrawable());
    
    var resultText = new MC.TextView(ctx);
    resultText.setTextSize(8);
    resultLayout.addView(resultImage);
    resultLayout.addView(resultText);
    
    for(var i=0;i<9;i++)
    {
     slot[i] = new FrameLayout(ctx);
     
     itemImg[i] = new ImageView(ctx);
     itemImgCount[i] = new MC.TextView(ctx);
     
     itemImgCount[i].setTextSize(8);
     itemImg[i].setBackgroundDrawable(bitmap.InvenBackDrawable());
     itemImg[i].setClickable(true);
     if(i==0) itemImgCount[i].setBackgroundDrawable(bitmap.CaseDrawable());
     
     slot[i].addView(itemImg[i]);
     slot[i].addView(itemImgCount[i]);
     
     if(i%3==0) slotLine1.addView(slot[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     if(i%3==1) slotLine2.addView(slot[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     if(i%3==2) slotLine3.addView(slot[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
    }
    
    for(var i=0;i<36;i++)
    {
     invenFrame[i] = new FrameLayout(ctx);
     
     var layout = new LinearLayout(ctx);
     
     var bt = new Button(ctx);
     img[i] = new Button(ctx);
     imgCount[i] = new MC.TextView(ctx);
     
     bt.setBackgroundDrawable(bitmap.InvenBackDrawable());
     imgCount[i].setTextSize(8);
     if(Player.getInventorySlotCount(i+9)>0) imgCount[i].setText("\n   "+Player.getInventorySlotCount(i+9)+"");
     img[i].setText("\n\n\n\n\n\n" + i);
     
     if(getBlockItem([Player.getInventorySlot(i+9),Player.getInventorySlotData(i+9)])!=null) img[i].setBackgroundDrawable(new BitmapDrawable(getBlockItem([Player.getInventorySlot(i+9),Player.getInventorySlotData(i+9)])));
     else img[i].setBackgroundDrawable(null);
     
     img[i].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      { 
       try
       {
        var c = (parseInt(v.getText().split("\n\n\n\n\n\n")[1]));
         
        if(craftingValue[selNum-1][0]==0||(craftingValue[selNum-1][0]==Player.getInventorySlot(c+9) && craftingValue[selNum-1][1]==Player.getInventorySlotData(c+9)))
        {
         if(parseInt(imgCount[c].getText())<=1)
         {
          v.setVisibility(GONE);
          imgCount[c].setVisibility(GONE);
         }
         imgCount[c].setText("\n   "+parseInt(imgCount[c].getText()-1)+"");
         if(itemImgCount[selNum-1].getText()!="") itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())+1));
         else itemImgCount[selNum-1].setText("\n   "+"1");
         
         itemImg[selNum-1].setImageBitmap(getBlockItem([Player.getInventorySlot(c+9),Player.getInventorySlotData(c+9)]));
         
         craftingValue[selNum-1] = [Player.getInventorySlot(c+9),Player.getInventorySlotData(c+9)];
         
         var recipe = craftingRecipe();
         
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem(recipe));
          resultText.setText("\n   "+recipe[2]+"");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
        }
       } catch(error) {  }
      }
     }));
     
     layout.setGravity(Gravity.CENTER|Gravity.CENTER);
     layout.setPadding(dp(0.5),dp(0.5),dp(0.5),dp(0.5));
     layout.addView(img[i]);
     
     invenFrame[i].addView(bt);
     invenFrame[i].addView(layout,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     invenFrame[i].addView(imgCount[i]);
     
     if(i%5==0) in1.addView(invenFrame[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     if(i%5==1) in2.addView(invenFrame[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     if(i%5==2) in3.addView(invenFrame[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     if(i%5==3) in4.addView(invenFrame[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
     if(i%5==4) in5.addView(invenFrame[i],(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
    }
    
    invenLayout.addView(in1,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5*8);
    invenLayout.addView(in2,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5*8);
    invenLayout.addView(in3,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5*8);
    invenLayout.addView(in4,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5*8);
    invenLayout.addView(in5,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5*8);
    
    invenScroll.addView(invenLayout);
    invenWindow.setContentView(invenScroll);
    invenWindow.setBackgroundDrawable(bitmap.FrameDrawable());
    invenWindow.setWidth(WIDTH/2-dp(40));
    invenWindow.setHeight(HEIGHT-dp(76));
    invenWindow.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT| Gravity.TOP, dp(20), dp(66));
    
    craftWindow = new PopupWindow(ctx);
    
    var craftLayout = new FrameLayout(ctx);
    var craftLinear = new LinearLayout(ctx);
    
    // for이 안먹힘 젠장
    
    itemImg[0].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=1)
       {
        selNum = 1;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[1].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=2)
       {
        selNum = 2;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[2].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=3)
       {
        selNum = 3;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[3].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=4)
       {
        selNum = 4;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[4].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=5)
       {
        selNum = 5;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[5].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=6)
       {
        selNum = 6;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[6].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=7)
       {
        selNum = 7;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[7].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=8)
       {
        selNum = 8;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    itemImg[8].setOnClickListener(new OnClickListener(
     {
      onClick:function(v)
      {
       if(selNum!=9)
       {
        selNum = 9;
        for(var i=0;i<9;i++) itemImgCount[i].setBackgroundDrawable(null);
        itemImgCount[selNum-1].setBackgroundDrawable(bitmap.CaseDrawable());
       }
       else
       {
        for(var i=0;i<36;i++) if((Player.getInventorySlot(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][0]) && (Player.getInventorySlotData(parseInt(img[i].getText().split("\n\n\n\n\n\n")[1])+9) == craftingValue[selNum-1][1]) &&craftingValue[selNum-1][0]!=0)
        {
         img[i].setVisibility(VISIBLE);
         imgCount[i].setVisibility(VISIBLE);
         if(parseInt(itemImgCount[selNum-1].getText())>1)
         {
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("\n   "+(parseInt(itemImgCount[selNum-1].getText())-1));
         }
         else
         {
          v.setImageBitmap(null);
          imgCount[i].setText("\n   "+(parseInt(imgCount[i].getText())+1));
          itemImgCount[selNum-1].setText("");
          craftingValue[selNum-1] = [0,0];
         }
         var recipe = craftingRecipe();
         if(recipe!=[0,0,0])
         {
          resultImage.setImageBitmap(getBlockItem([recipe[0],recipe[1]]));
          if(recipe[2]!=0) resultText.setText("\n   "+recipe[2]+"");
          else resultText.setText("");
         }
         else
         {
          resultImage.setImageBitmap(null);
          resultText.setText("");
         }
         break;
        }
       }
      }
     }));
    
    var arrawLayout = new LinearLayout(ctx);
    var arraw = new ImageView(ctx);
    arraw.setImageBitmap(bitmap.ArrawBitmap());
    arrawLayout.addView(arraw);
    arrawLayout.setGravity(Gravity.CENTER|Gravity.CENTER);
    arrawLayout.setPadding(dp(5),dp(5),dp(5),dp(5));
    
    slotLine2.addView(arrawLayout,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
    slotLine2.addView(resultLayout,(WIDTH/2-dp(40))/5,(WIDTH/2-dp(40))/5);
    
    craftLinear.setOrientation(1);
    craftLinear.addView(slotLine1,(WIDTH/2-dp(40))/5*3,(WIDTH/2-dp(40))/5);
    craftLinear.addView(slotLine2,(WIDTH/2-dp(40)),(WIDTH/2-dp(40))/5);
    craftLinear.addView(slotLine3,(WIDTH/2-dp(40))/5*3,(WIDTH/2-dp(40))/5);
    
    craftLayout.addView(craftLinear,(WIDTH/2-dp(40)),(WIDTH/2-dp(40))/5*3);
    //craftLayout.addView(craftGUI,(WIDTH/2-dp(40)),(WIDTH/2-dp(40))/5*2);
    
    craftWindow.setBackgroundDrawable(null);
    craftWindow.setContentView(craftLayout);
    craftWindow.setWidth(WIDTH/2-dp(40));
    craftWindow.setHeight(HEIGHT-dp(76));
    craftWindow.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT| Gravity.TOP, dp(20), dp(66));
    
   } catch(e){ errorAlert(e); }
  }
 }));
}

//Methods

function MCToast(msg)
{
 ctx.runOnUiThread(new java.lang.Runnable(
 {
  run : function()
  {
   var toast = new Toast(ctx);
	  var textLayout = new LinearLayout(ctx);
	  var backLayout = new LinearLayout(ctx);
	  var tv = new MC.TextView(ctx);
	  
   tv.setText(msg);
   
   textLayout.setGravity(Gravity.CENTER | Gravity.CENTER);
   textLayout.addView(tv);
   textLayout.setPadding(dp(20),dp(20),dp(20),dp(20));
   
   backLayout.setGravity(Gravity.CENTER | Gravity.CENTER);
   backLayout.addView(textLayout);
   backLayout.setBackgroundDrawable(bitmap.ToastDrawable());
   
   toast.setView(backLayout);
   toast.show();
  	}
 }));
}

function saveFile(file, value)
{
 var output = new java.io.FileOutputStream(file);
 var outputSW = new java.io.OutputStreamWriter(output);
 outputSW.write(value);
 outputSW.close();
 output.close();
}

function read(data, isFile)
{
 var str = "";
 var fileInputStream = null;
 
 var file = new File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/" +data);
 if(isFile) file = data;
 fileInputStream = new FileInputStream(file);
 
 var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
 var bufferedReader = new java.io.BufferedReader(inputStreamReader);
 
 var line = ""
 while((line = bufferedReader.readLine())!=null) str += line + "\n";

 fileInputStream.close();
 inputStreamReader.close();
 bufferedReader.close();
 return str;
}

function readInput(data)
{
 var str = "";
 
 var inputStreamReader = new java.io.InputStreamReader(data);
 var bufferedReader = new java.io.BufferedReader(inputStreamReader);
 
 var line = ""
 while((line = bufferedReader.readLine())!=null) str += line + "\n";

 inputStreamReader.close();
 bufferedReader.close();
 return str;
}

function readURL(data)
{
 var str = "";
 
 var inputStreamReader = new java.io.InputStreamReader(java.net.URL(data).openStream());
 var bufferedReader = new java.io.BufferedReader(inputStreamReader);
 
 var line = ""
 while((line = bufferedReader.readLine())!=null) str += line + "\n";

 inputStreamReader.close();
 bufferedReader.close();
 return str;
}

function readOption(data)
{
 var str = "";
 
 var file = File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftpe/options.txt");
 var fileInputStream = new FileInputStream(file);
 var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
 var bufferedReader = new java.io.BufferedReader(inputStreamReader);
 
 var line = "";
 while((line = bufferedReader.readLine())!=null) if(line.indexOf(data)!=-1) str = line.split(":")[1];

 fileInputStream.close();
 inputStreamReader.close();
 bufferedReader.close();
 return str;
}

function downFile(url,path,fileName) //Thanks to appogattoman
{
ctx.runOnUiThread(new java.lang.Runnable(
{
 run: function()
 {
  try
  {
   var uri = new android.net.Uri.parse(url)
   var request = new android.app.DownloadManager.Request(uri);
   request.setTitle( fileName );
   request.setDestinationInExternalPublicDir(path,fileName);
   ctx.getSystemService( android.content.Context.DOWNLOAD_SERVICE).enqueue(request);
  } catch(e){ errorAlert(e); }
 }
 }));
}

function createNinePatch( bitmap, x, y, xx, yy)
{
 var NO_COLOR = 0x00000001;
 var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
 buffer.put(0x01);
 buffer.put(0x02);
 buffer.put(0x02); 
 buffer.put(0x09);
 buffer.putInt(0); 
 buffer.putInt(0); 
 buffer.putInt(0);
 buffer.putInt(0);
 buffer.putInt(0); 
 buffer.putInt(0);
 buffer.putInt(0);
 buffer.putInt(y); 
 buffer.putInt(yy);
 buffer.putInt(x); 
 buffer.putInt(xx); 
 buffer.putInt(NO_COLOR);
 buffer.putInt(NO_COLOR); 
 buffer.putInt(NO_COLOR);
 buffer.putInt(NO_COLOR); 
 buffer.putInt(NO_COLOR);
 buffer.putInt(NO_COLOR); 
 buffer.putInt(NO_COLOR);
 buffer.putInt(NO_COLOR); 
 buffer.putInt(NO_COLOR);
 var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
 return drawable;
}

function errorAlert(e)
{
ctx.runOnUiThread(new java.lang.Runnable(
{
 run : function()
 {
  try
  {
   var dialog = new AlertDialog.Builder(ctx);
   dialog.setTitle("Error!");
   var str = "Error!\n - "+e.name+"\n - #"+(e.lineNumber+1)+"\n\n"+e.message;
   dialog.setMessage(str);
   dialog.show();
  }
  catch(e) { print(e); }
 }
}));
}

function dp(dips)
{
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

var html1;
var html2;
var characters = 'abcdefghijklmnopqrstuvwxyz'
var values = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10]
var ammount = [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1]
var charactersLength = characters.length;
var scorer = 0
var total = 0
var currw = ""

function check_if_word_exists(word) {

  const url = "https://api.wordnik.com/v4/word.json/this/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=ad49ytfu7fbbhgdyoqzzdm3nsaz69ij8bifpy1vnr9v8aef3u";

  $.ajax({
      type: "GET",
      url: url
  }).done(function (result) {
      return 1;
  }).fail(function () {
      return 0;
  });
}

function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
  
    event
      .currentTarget
      .style
      .backgroundColor = 'yellow';
  }

function onDragOver(event) {
    event.preventDefault();
  }

function onDrop(event) {
    const id = event
      .dataTransfer
      .getData('text');
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;
      dropzone.appendChild(draggableElement);
      event
        .dataTransfer
        .clearData();
    var score = document.getElementById("s")
    var word = document.getElementById("cw")
    var val = id[4]
    for(i = 0; i < characters.length; i++){
      if(characters[i] == val){
        if(dropzone.id == "slot3" || dropzone.id=="slot6"){
          scorer = scorer + (values[i]*2)
        }
        else{
          scorer = scorer + values[i]
        }
        currw = currw + characters[i]
        word.innerHTML ="<div id=\"cw\">current word:" + currw + "</div>" 
        score.innerHTML ="<div id=\"s\">score:" + scorer + "</div>";
      }
    }
    if((currw.length+1)<=7){
      var ns = document.getElementById("slot" + (currw.length+1))
      ns.innerHTML = "<div class=\"boarde\" id=\"slot" + (currw.length+1) + "\" ondragover=\"onDragOver(event)\" ondrop=\"onDrop(event)\"></div>"
    }
  }

  function onDropRet(event) {
    const id = event
      .dataTransfer
      .getData('text');
      const draggableElement = document.getElementById(id);
      const dropzone = event.target;
      dropzone.appendChild(draggableElement);
      event
        .dataTransfer
        .clearData();
      if((currw.length+1)<=7){
        var ns = document.getElementById("slot" + (currw.length + 1))
        ns.innerHTML = "<div class=\"boarde\" id=\"slot" + (currw.length+1) + "</div>"
      }
      var score = document.getElementById("s")
      var word = document.getElementById("cw")
      var val = id[4]
      for(i = 0; i < characters.length; i++){
        if(characters[i] == val && scorer != 0){
          if (currw.length == 3 || currw.length == 6){
            scorer = scorer - (values[i]*2)
            currw = currw.slice(0, -1)
          }
          else{
            scorer = scorer - values[i]
            currw = currw.slice(0, -1)
          }
          word.innerHTML ="<div id=\"cw\">current word:" + currw + "</div>" 
          score.innerHTML ="<div id=\"s\">score:" + scorer + "</div>";
        }
      }
  }

function genHand(){
  var i = 0;
  var container2 = document.getElementById("shelf");
  var insert = "";
  while(i<7){
    var char = characters.charAt(Math.floor(Math.random() * charactersLength))
    while((ammount[characters.indexOf(char)]-1)<0){
      var char = characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    ammount[characters.indexOf(char)] = ammount[characters.indexOf(char)] - 1;
    insert += "<div draggable=\"true\" class=\"box\" id=\"box" + i +  char + "\" ondragstart=\"onDragStart(event)\" style=\"background-image: url('images/Scrabble_Tile_" + char + ".jpg');\"></div>";
    i = i + 1;
  }
  container2.innerHTML = insert;
}

function reset1(){
    var container1 = document.getElementById("board");
    var container2 = document.getElementById("shelf");
    var word = document.getElementById("cw")
    var score = document.getElementById("s")
    currw = ""
    scorer = 0
    container1.innerHTML = html1;
    container2.innerHTML = html2;
    word.innerHTML = "<div id=\"cw\">current word:</div>"
    score.innerHTML = "<div id=\"s\">score:0</div>"
    
}       

function reset2(){
  var container1 = document.getElementById("board");
  var container2 = document.getElementById("shelf");
  var word = document.getElementById("cw")
  var score = document.getElementById("s")
  var hs = document.getElementById("hs");
  currw = ""
  scorer = 0
  container1.innerHTML = html1;
  container2.innerHTML = "";
  genHand();
  html1 = document.getElementById('board').innerHTML;
	html2 = document.getElementById('shelf').innerHTML;
  word.innerHTML = "<div id=\"cw\">current word:</div>"
  score.innerHTML = "<div id=\"s\">score:0</div>"
  hs.innerHTML = "<div id=\"hs\">highscore:" + 0 + "</div>"
}

function submit(){
  var hs = document.getElementById("hs");
    total = total + scorer
    hs.innerHTML = "<div id=\"hs\">highscore:" + total + "</div>"
    var container1 = document.getElementById("board");
    var container2 = document.getElementById("shelf");
    var word = document.getElementById("cw")
    var score = document.getElementById("s")
    currw = ""
    scorer = 0
    container1.innerHTML = html1;
    container2.innerHTML = "";
    genHand();
    html1 = document.getElementById('board').innerHTML;
    html2 = document.getElementById('shelf').innerHTML;
    word.innerHTML = "<div id=\"cw\">current word:</div>"
    score.innerHTML = "<div id=\"s\">score:0</div>"
}

window.onload = function(){
  genHand();
  html1 = document.getElementById('board').innerHTML;
	html2 = document.getElementById('shelf').innerHTML;
}; 

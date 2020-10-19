let xFlag=false;
let yFlag=false;
let rFlag=false;

let xValues = ["-4","-3","-2","-1","0","1","2","3","4"];
let rValues = ["1","2","3","4","5"];


function clearResults(){
    $.get('clearRequest.php',{},function(){})
}



function defaultLoad(){
    $.get('startRequest.php',{}, function(data){document.getElementById('finalTable').innerHTML=data;})

}

function xButtonClick(id){
    document.getElementById('alertX').innerHTML = null;
    document.getElementById('chosenX1').innerHTML = "Вы выбрали X = ";
    document.getElementById('chosenX2').innerHTML = document.getElementById(id).value;
}


function getX(){
    return document.getElementById('chosenX2').innerHTML;
}

function getY(){
    let y = document.getElementById('yText').value;
    if (y[0]==="-") y = y.substring(0,8); else y = y.substring(0,7);
    return y;
}

function getR(){
    let a = $('input[name="rBox"]:checked');
    let r = [];
    for (let i=0;i<a.length;i++) r.push(a[i].value);
    return r;
}

function checkX(x){
    if ((x==='') || (xValues.indexOf(x)===-1)) xFlag=false;
    else xFlag=true;
}

function checkY(y){
    if (y==='') yFlag=false;
    else if(y>-5&&y<3) yFlag=true;
}

function checkR(r){
    if (r.length===0){ rFlag=false; return;}
    for (let i=0; i<r.length; i++) if (rValues.indexOf(r[i])===-1){ rFlag=false; return;}
    rFlag=true;
}




function createRequest(){
    let x = getX();
    let y = getY();
    let r = getR();

    xFlag=false;
    yFlag=false;
    rFlag=false;
    checkX(x);
    checkY(y);
    checkR(r);
    if (!xFlag) document.getElementById('alertX').innerHTML='Не выбрано значение X'; else document.getElementById('alertX').innerHTML=null;
    if (!yFlag) document.getElementById('alertY').innerHTML='Введено недопустимое значение Y'; else document.getElementById('alertY').innerHTML=null;
    if (!rFlag) document.getElementById('alertR').innerHTML='Не выбрано значение R'; else document.getElementById('alertR').innerHTML=null;

    if (!rFlag || !yFlag || !xFlag) {
        return;
    }



    for (let i=0; i<r.length; i++) {


        $.get('server.php', {'x':x, 'y':y, 'r':r[i]}, function (data) {document.getElementById('finalTable').innerHTML=data;});
    }
}
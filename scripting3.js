document.getElementById('navFavBtn').style.backgroundColor = 'lightgoldenrodyellow';
/// A2---------->> for the small screen nav bar button
var navButton = document.getElementById('barButton');
var hiddenDiv = document.getElementById('hiddenDiv');
var barclick = false;
navButton.addEventListener('click',function(){
    if(!barclick){
        hiddenDiv.style.display = 'block';
        barclick = true;
    }else{
        hiddenDiv.style.display = 'none';
        barclick = false;
    }
    var currScroll = window.pageYOffset;
    if(currScroll > 0){
        console.log(currScroll);
        var scrollinterval = setInterval(function(){
            if(currScroll < 0){
              clearInterval(scrollinterval);
              return;
            }    
            window.scrollBy(0,-80);
            currScroll -= 80;
        },5);         
    }  
    
});

/// finished A2

var container = document.getElementById('AddingDiv');
function addMeals(IDe){
    var request = new XMLHttpRequest();

    request.onload = function(){
        var json = JSON.parse(request.response);
        //console.log(json);
        var imageURL = json.meals[0].strMealThumb;
        var name = json.meals[0].strMeal;
        //console.log(imageURL,name);
        //console.log(Element());
        container.appendChild(Element(json.meals[0].strMealThumb, json.meals[0].strMeal));      


    }
    request.onerror = function(){
        console.log("Error Occured");
    }   
    request.open('get','https://www.themealdb.com/api/json/v1/1/lookup.php?i='+IDe,true);
    request.send();

    
}

var gotid = [localStorage.getItem('getid')];
var getid = gotid[0];
// var saved1 = saved1 +','+ gotid[0];
// console.log('the saving favorite all one');
// console.log(saved1);
for(var i = 0; i < getid.length; i+=6){
    //console.log(getid.substr(i,5));
    addMeals(getid.substr(i,5));
}


var cut = document.querySelectorAll('.xMark');
var favDiv = document.querySelectorAll('.appendDiv');
console.log(cut,favDiv);
for(var i = 0; i < cut.length; i++){
    cut[i].addEventListener('click',function(){

        container.removeChild(favDiv[i]);
    });
    console.log(cut[i],favDiv[i]);   //??????
}




function Element(link,name){
    const icon = document.createElement('i');
    icon.classList.add('fa-solid','fa-xmark');
    const xmark = document.createElement('div');
    xmark.classList.add('xMark');
    xmark.appendChild(icon);
    const para = document.createElement('p');
    para.textContent = name;
    const Span = document.createElement('span');
    Span.appendChild(para);
    const image = document.createElement('img');
    image.src = link;
    const Pdiv = document.createElement('div');
    Pdiv.classList.add('appendDiv');
    Pdiv.append(image,Span);// i didn't append the xmark
    return Pdiv;
}
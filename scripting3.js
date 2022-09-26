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

    var cut = document.querySelectorAll('.xMark');
    var favDiv = document.querySelectorAll('.appendDiv');
    console.log(cut,favDiv);
    for(var i = 0; i < cut.length; i++){
        // cut[i].addEventListener('click',function(){

        //     container.removeChild(favDiv[i]);
        // });
        console.log(cut[i],favDiv[i]);
    }
}

var gotid = localStorage.getItem('getid');
//while(gotid != ''){
    addMeals(gotid);
//}
var count = 0;
console.log(++count,'this is the rate');




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
    Pdiv.append(image,Span,xmark);
    return Pdiv;
}
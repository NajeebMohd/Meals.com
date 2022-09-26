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
        var imageURL = json.meals[0].strMealThumb;
        var name = json.meals[0].strMeal;
        console.log(imageURL,name);
        console.log(Element());
        container.appendChild(Element(json.meals[0].strMealThumb, json.meals[0].strMeal));
        


    }
    request.onerror = function(){
        console.log("Error Occured");
    }
    console.log(IDe);
    request.open('get','https://www.themealdb.com/api/json/v1/1/lookup.php?i='+IDe,true);
    request.send();
}

addMeals((window.location.search).substring(4));

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
var image = document.querySelector('#imageDiv img')
var Iname = document.getElementById('nap');
var para = document.querySelector('#instruction p');

function fetch(image,Iname,para){
    var request = new XMLHttpRequest();

    request.onload = function(){
        var json = JSON.parse(request.response);
        var item = json.meals[0];
        
        image.src = item.strMealThumb;
        Iname.innerText = item.strMeal;
        para.innerText = item.strInstructions;
        console.log(item.strMeal);

    }
    request.onerror = function(){
        console.log('error unable to fetch the image');
    }

    
    const id = (window.location.search).substring(4);
    console.log(id);
    if(id == ''){
        request.open('get','https://www.themealdb.com/api/json/v1/1/random.php',true);
    }else{
        request.open('get','https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id,true);
    }
    
    
    request.send();
    
}

fetch(image,Iname,para);




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
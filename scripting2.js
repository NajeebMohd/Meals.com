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

    request.open('get','https://www.themealdb.com/api/json/v1/1/random.php',true);
    request.send();
}



fetch(image,Iname,para);



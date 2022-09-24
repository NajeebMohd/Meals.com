var FrontImg = document.querySelectorAll('.randomIdiv img');
var Imgdetails = document.querySelectorAll('.ImageName p');

function fetchImg(Img,detail){
    var request = new XMLHttpRequest();
    
    request.onload = function(){
        var json = JSON.parse(request.response); 
        var imageURL = json.meals[0].strMealThumb;
        var name = json.meals[0].strMeal;
        detail.innerText = name+'';
        Img.src = imageURL;
        console.log(json,' tisss');
    }
    request.onerror = function(){
        console.log("UNABLE TO FETCH..");
    }
    request.open('get','https://www.themealdb.com/api/json/v1/1/random.php',true);
    request.send();
}
for(var i = 0; i < FrontImg.length; i++){
    fetchImg(FrontImg[i], Imgdetails[i]); // for fetching image and name  
}


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


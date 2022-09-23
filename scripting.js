var FrontImg = document.querySelectorAll('.randomIdiv img');
var Imgdetails = document.querySelectorAll('.userFav span');
// Imgdetails[0].innerHTML = "hello";
function fetchImg(Img,detail){
    var request = new XMLHttpRequest();
    
    request.onload = function(){
        var json = JSON.parse(request.response); 
        var imageURL = json.meals[0].strMealThumb;
        Img.src = imageURL;
    }
    request.onerror = function(){
        console.log("UNABLE TO FETCH..");
    }
    request.open('get','https://www.themealdb.com/api/json/v1/1/random.php',true);
    request.send();
}
for(var i = 0; i < FrontImg.length; i++){
    fetchImg(FrontImg[i],Imgdetails);
}


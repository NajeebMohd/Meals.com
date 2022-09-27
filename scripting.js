document.getElementById('HomeButton').style.backgroundColor = 'lightgoldenrodyellow';
var FrontImg = document.querySelectorAll('.randomIdiv img');
var Imgdetails = document.querySelectorAll('.ImageName p');

var search = document.getElementById('search');
var btn = document.getElementById('btn');
var btn2 = document.getElementById('btn2');
var search2 = document.getElementById('search2');
// var randomIdiv = document.querySelectorAll('.randomIdiv');
var container = document.getElementById('randomImages');


var FavBtn = document.querySelectorAll('.FavBtn');


// A1--------------------->> for Fetching random Images
function fetchImg(Img,detail,button){
    var request = new XMLHttpRequest();
    
    request.onload = function(){
        var json = JSON.parse(request.response); 
        var imageURL = json.meals[0].strMealThumb;
        var name = json.meals[0].strMeal;
        detail.innerText = name;
        Img.src = imageURL;
        // console.log(json,' tisss');  // Video Explanation how to fetch from json
       
        // for the detail page
        Img.addEventListener('click',function(){
            goToDetails(json.meals[0].idMeal);
        });
        // for favorite button
        button.addEventListener('click',function(){
            button.style.backgroundColor = 'orangered';
            addToFavorite(json.meals[0].idMeal);
        });

    }
    request.onerror = function(){
        console.log("UNABLE TO FETCH..");
    }
    request.open('get','https://www.themealdb.com/api/json/v1/1/random.php',true);
    request.send();
}
for(let i = 0; i < FrontImg.length; i++){
    fetchImg(FrontImg[i], Imgdetails[i], FavBtn[i]); // for fetching image and name  
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



// A3 start --for search of any meals-------------------------------------------
// function Searched(typed){
//     
        

// }
btn2.addEventListener('click',function(){
    //console.log('inside search 1')
    if(search2.value == ''){
        window.alert('Fill the value in the search');
    }else{
        //container.style.padding = "40px";           
        var child = container.lastElementChild; 
        while (child) {
            container.removeChild(child);
            child = container.lastElementChild;
        }
        //document.getElementById('conHead').style.display = 'none';
        document.querySelector('#conHead h2').textContent = 'Search Results';
        //console.log('inside search 2');
        searchFun();
        function searchFun(){
            var request = new XMLHttpRequest();

            request.onload = function(){
                //console.log('inside search 3');
                var json = JSON.parse(request.response);                
                var Meals = json.meals;
                // if(Meals.length === 0) window.alert('sorry no Meals for '+search2.value);
                for(var i = 0; i < Meals.length; i++){                    
                                         
                    container.appendChild(Element(Meals[i].strMeal, Meals[i].strMealThumb, Meals[i].idMeal));
                    console.log(Meals[i]);//for video explanation                   
                                      
                    
                }
            }
            request.onerror = function(){
                window.alert('!!! Cannot Search');
            }
            request.open('get','https://www.themealdb.com/api/json/v1/1/search.php?s='+search2.value,true);
            
            request.send();
        }
    }
   
});
// btn.addEventListener('click',Searched(search.value));
// btn2.addEventListener('click',Searched(search2.value));


//         -------------------------ENDED A3 ----------------------------------------- //


function goToDetails(id){       
    //window.location.href = "http://127.0.0.1:5500/indexDetail.html?id="+id;
    window.location.href = "https://najeebmohd.github.io/Meals.com/indexDetail.html?id="+id;

    //in hosting replace local host with gitHub host 
}
var FavList = [];
function addToFavorite(id){    
    //var mealid = id;
    FavList.push(id);
    localStorage.setItem('getid',FavList);
    for(var i = 0; i < FavList.length; i++){
        console.log(FavList[i],'my lists');        
    }   
    
}




//                ------------------------ FOR APPENDING THE NEW DIV --------------------------
function Element(name, link,iD){
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-heart');
    const btn = document.createElement('button');
    btn.classList.add('FavBtn');
    btn.appendChild(icon);
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Add To Favorite';

    const SecondSpan = document.createElement('span');
    SecondSpan.classList.add('Fbar');

    SecondSpan.append(paragraph,btn);
    const ptop = document.createElement('p');
    ptop.textContent = name;
    const FirstSpan = document.createElement('span');
    FirstSpan.classList.add('ImageName');

    FirstSpan.appendChild(ptop);

    const userFav = document.createElement('div');
    userFav.classList.add('userFav');
    userFav.append(FirstSpan,SecondSpan);

    const image = document.createElement('img');
    image.src = link;

    const Rdiv = document.createElement('div');
    Rdiv.classList.add('randomIdiv');

    // for providing details and adding to the favorite
    image.addEventListener('click',function(){
        goToDetails(iD);
    });
    btn.addEventListener('click',function(){
        btn.style.backgroundColor = "orangered";
        addToFavorite(iD);
    });   

    Rdiv.append(image,userFav);

    return Rdiv;
}

//          ----------------------------- ENDED THE APPENDING THE ELEMENT ----------------
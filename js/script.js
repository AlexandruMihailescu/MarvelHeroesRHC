var wantSelector=true;

var sortByNameAsc = function(a, b) 
{
    var contentA=$(a).data('name');
    var contentB=$(b).data('name');
    return contentA.toLowerCase().localeCompare(contentB.toLowerCase());
}

var sortByNameDesc = function(a, b) 
{
    var contentA=$(a).data('name');
    var contentB=$(b).data('name');
    return -contentA.toLowerCase().localeCompare(contentB.toLowerCase());
}

var sortByCostAsc = function(a, b) 
{
    var contentA=parseInt($(a).data('cost'));
    var contentB=parseInt($(b).data('cost'));
    return (contentA<contentB)?-1:(contentA>contentB)?1:0;
}

var sortByCostDesc = function(a, b) 
{
    var contentA=parseInt($(a).data('cost'));
    var contentB=parseInt($(b).data('cost'));
    return (contentA<contentB)?1:(contentA>contentB)?-1:0;
}

function sortHeroes(sortingFunction){
    var list = $("#charList > span").get();
    list.sort(sortingFunction);
    for (var i = 0; i < list.length; i++)
    {
        list[i].parentNode.appendChild(list[i]);
    }
}

function loadDataXML()
{
    if (window.XMLHttpRequest)
    {
       xhttp=new XMLHttpRequest();
    }
    xhttp.open("GET","data/heroes.xml",false);
    xhttp.send();
    return xhttp.responseXML;   
}

function toggleWant(heroBox)
{
    $(heroBox).toggleClass("want");
}
function toggleOwns(heroBox)
{
    $(heroBox).toggleClass("owns");
}
function toggleBoth(heroBox)
{
    if ($(heroBox).hasClass("want")==$(heroBox).hasClass("owns"))
    {
        toggleOwns(heroBox);
        toggleWant(heroBox);
    }
    else
    {
        $(heroBox).addClass("want");
        $(heroBox).addClass("owns");
    }
}

function toggleDesire(heroBox)
{
    if (!$(".want.selectorButton").hasClass("inactive"))
        toggleWant(heroBox);
    else if (!$(".both.selectorButton").hasClass("inactive"))
        toggleBoth(heroBox);
    else toggleOwns(heroBox);
}
function loadHeroes()
{
    $.ajax({
    type: "GET",
    url: "data/heroes.xml",
    dataType: "xml",
    success: function(xml){
    /*var xmlDoc = $.parseXML(xml);
    $xml = $( xmlDoc );*/
    alert($(xml).find("heroes").find("hero").get(1).find("cost").text());
    $(xml).find("heroes").find("hero").each(function(){$("#charList").append("<span onclick='toggleDesire(this)' data-cost=\""+$(this).find("cost").text()+"\" data-name=\""+$(this).find("name").text()+"\">"+"<span style='text-align:center;background-image: url(/assets/images/"+$(this).find("imag").text()+");background-size: cover;'/>"+"</span>");});
    //var heroesXML=loadDataXML();
    //var heroesList=heroesXML.getElementsByTagName("hero");
    /*for (i=0; i<$heroesList.length; i++)
        $("#charList").append("<span onclick='toggleDesire(this)' data-cost=\""+heroesList[i].getElementsByTagName("cost")[0].childNodes[0].nodeValue+"\" data-name=\""+heroesList[i].getElementsByTagName("name")[0].childNodes[0].nodeValue+"\">"+"<span style='text-align:center;background-image: url(/assets/images/"+heroesList[i].getElementsByTagName("imag")[0].childNodes[0].nodeValue+");background-size: cover;'/>"+"</span>");*/
        }
    });
}
function selectorButtonClicked(button)
{
    $(".selectorButton").addClass("inactive");
    $(button).removeClass("inactive");
}
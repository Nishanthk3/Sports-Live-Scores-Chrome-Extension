function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

function getScores() {	
	var leagues = [];
	for(i=0; i<localStorage.length; i++)
	{
	    var key = localStorage.key(i);
	    var value = localStorage[key];
	    leagues.push(value);
	}
	if(leagues.indexOf("cricket")>-1 || leagues.indexOf("all-leagues")>-1 || leagues.length == 0 )
	{
	    $.ajax({
				type : 'GET',
				url : "http://editonfly.com:8080/sports/cricket/rss.html",
				statusCode: {
				    404: function() {
				      alert( "Not Found" );
				    },
					401: function() {
					      alert( "Unauthorized - Access Denied" );
			    	}
				},
				success : function(text) {
					$('.cricket-loader').remove();
					var arr1 = text.ArrayList[0];
					var arr2 = text.ArrayList[1];
					var arr3 = text.ArrayList[2];
					if(arr1.length == 0)
					{
						var tr = document.createElement('tr');
						var td2 = document.createElement('td');
						var h6 = document.createElement('h6');
						h6.innerText = "No live international matches";
						td2.appendChild(h6);
						tr.appendChild(td2);
						document.getElementById('cricketTable').appendChild(tr);
					}
					if(arr2.length == 0)
					{
						var tr = document.createElement('tr');
						var td2 = document.createElement('td');
						var h6 = document.createElement('h6');
						h6.innerText = "No live international matches";
						td2.appendChild(h6);
						tr.appendChild(td2);
						document.getElementById('cricketTable1').appendChild(tr);
					}
					if(arr3.length == 0)
					{
						var h6 = document.createElement('h6');
						h6.innerText = "No news as of now";
						res.appendChild(h6);
					}
					for(var i=0; i<arr1.length; i++){
						var tr = document.createElement('tr');
						var td2 = document.createElement('td');	
						var h6 = document.createElement('h6');					
						var a = document.createElement('a');
						var span = document.createElement('span');
						span.id = "span";
						a.href = arr1[i].link;
						a.innerText = arr1[i].title;
						span.innerText = arr1[i].description;
						h6.appendChild(a);
						td2.appendChild(h6);
						td2.appendChild(span);
						tr.appendChild(td2);
						document.getElementById('cricketTable').appendChild(tr);
					}
					for(var i=0; i<arr2.length; i++){
						var tr = document.createElement('tr');
						var td2 = document.createElement('td');	
						var h6 = document.createElement('h6');					
						var a = document.createElement('a');
						a.href = arr2[i].link;
						a.innerText = arr2[i].title;
						h6.appendChild(a);
						td2.appendChild(h6);
						tr.appendChild(td2);
						document.getElementById('cricketTable1').appendChild(tr);				  
					}
					for(var i=0; i<arr3.length; i++){
						var cricketPlusImg = document.createElement("img");
						cricketPlusImg.src = "img/plus.png";
						cricketPlusImg.width="9";
						cricketPlusImg.height="9";
						cricketPlusImg.className="cricket-plusminus";
						cricketPlusImg.id="id9_"+i;
						var tr = document.createElement('tr');
						var td = document.createElement('td');
						var h6 = document.createElement('h6');	
						var h6_1 = document.createElement('h6');				
						var a = document.createElement('a');
						a.href = arr3[i].link;
						a.innerText = "   "+arr3[i].title;
						h6.appendChild(cricketPlusImg);
						h6.appendChild(a);
						h6_1.className = "descriptionClass"; 
						h6_1.id="h69_"+i;
						h6_1.innerText = arr3[i].description;
						td.appendChild(h6);
						td.appendChild(h6_1);
						tr.appendChild(td);
						document.getElementById('cricketTable2').appendChild(tr);
					}
					$('img.cricket-plusminus').click(showHide);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$('.cricket-loader').remove();
					var tr = document.createElement('tr');
					var td = document.createElement('td');
					var h6 = document.createElement('h6');
					h6.id="error";			
					h6.innerText = "Sorry, something's wrong, will be fixed soon.";
					td.appendChild(h6);
					tr.appendChild(td);
					document.getElementById('cricketTable').appendChild(tr);
				}
		});
	}
	else
	{
		$('#cricket').remove();
	}
	if(leagues.indexOf("epl")>-1 || leagues.indexOf("all-leagues")>-1 || leagues.length == 0 )
	{
	    $.ajax({
			type : 'GET',
			url : "http://editonfly.com:8080/sports/eplfootball/rss.html",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				$('.epl-loader').remove();
				var arr1 = text.ArrayList[0];
				var arr2 = text.ArrayList[1];
				//var eplFootballInnerDiv = document.getElementById("epl-football-innerdiv");
				res = document.createDocumentFragment();
				if(arr1.length == 0)
				{
					var h6 = document.createElement('h6');
					h6.innerText = "No ongoing matches";
					res.appendChild(h6);
				}
				if(arr2.length == 0)
				{
					var tr = document.createElement('tr');
					var td2 = document.createElement('td');
					var h6 = document.createElement('h6');
					h6.innerText = "No ongoing matches";
					td2.appendChild(h6);
					tr.appendChild(td2);
					document.getElementById('eplFootballTable2').appendChild(tr);
				}
				for(var i=0; i<arr1.length; i++){
					if(i < 6 )
					{
						var footballPlusImg = document.createElement("img");
						footballPlusImg.src = "img/plus.png";
						footballPlusImg.width="9";
						footballPlusImg.height="9";
						footballPlusImg.className="epl-plusminus";
						footballPlusImg.id="id0_"+i;
						var tr = document.createElement('tr');
						var td = document.createElement('td');
						var h6 = document.createElement('h6');	
						var h6_1 = document.createElement('h6');				
						var a = document.createElement('a');
						a.href = arr1[i].link;
						a.innerText = "   "+arr1[i].title;
						h6.appendChild(footballPlusImg);
						h6.appendChild(a);
						h6_1.className = "descriptionClass"; 
						h6_1.id="h60_"+i;
						h6_1.innerText = arr1[i].description;
						td.appendChild(h6);
						td.appendChild(h6_1);
						tr.appendChild(td);
						document.getElementById('eplFootballTable').appendChild(tr);
					}
					else{
						break;
					}
				}
				for(var i=6; i<arr1.length; i++){
				    var footballPlusImg = document.createElement("img");
					footballPlusImg.src = "img/plus.png";
					footballPlusImg.width="9";
					footballPlusImg.height="9";
					footballPlusImg.className="epl-plusminus";
					footballPlusImg.id="id1_"+i;
					var tr = document.createElement('tr');
					var td2 = document.createElement('td');	
					var h6 = document.createElement('h6');	
					var h6_1 = document.createElement('h6');
					var a = document.createElement('a');
					a.href = arr1[i].link;
					a.innerText = "   "+arr1[i].title;
					h6.appendChild(footballPlusImg);
					h6.appendChild(a);
					res.appendChild(h6);
					h6_1.className = "descriptionClass"; 
					h6_1.id="h61_"+i;
					h6_1.innerText = arr1[i].description;
					res.appendChild(h6_1);	
				}
				document.getElementById('eplFootballTable1').appendChild(res);

				for(var i=0; i<arr2.length; i++){
					var footballPlusImg = document.createElement("img");
					footballPlusImg.src = "img/plus.png";
					footballPlusImg.width="9";
					footballPlusImg.height="9";
					footballPlusImg.className="epl-plusminus";
					footballPlusImg.id="id2_"+i;
					var tr = document.createElement('tr');
					var td = document.createElement('td');	
					var h6 = document.createElement('h6');	
					var h6_1 = document.createElement('h6');				
					var a = document.createElement('a');
					a.href = arr2[i].link;
					a.innerText = "   "+arr2[i].title;
					h6.appendChild(footballPlusImg);
					h6.appendChild(a);
					h6_1.className = "descriptionClass"; 
					h6_1.id="h62_"+i;
					h6_1.innerText = arr2[i].description;
					td.appendChild(h6);
					td.appendChild(h6_1);
					tr.appendChild(td);
					document.getElementById('eplFootballTable2').appendChild(tr);
				}
				$('img.epl-plusminus').click(showHide);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.epl-loader').remove();
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				var h6 = document.createElement('h6');
				h6.id="error";			
				h6.innerText = "Sorry, something's wrong, will be fixed soon.";
				td.appendChild(h6);
				tr.appendChild(td);
				document.getElementById('eplFootballTable').appendChild(tr);
			}
		});
	}
	else
	{
		$('#epl-football').remove();
	}
	if(leagues.indexOf("uefachamps")>-1 || leagues.indexOf("all-leagues")>-1 || leagues.length == 0 )
	{	
	    $.ajax({
			type : 'GET',
			url : "http://editonfly.com:8080/sports/uefachampsfootball/rss.html",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				$('.uefa-loader').remove();
				var arr1 = text.ArrayList[0];
				var arr2 = text.ArrayList[1];
				//var uefachampsFootballInnerDiv = document.getElementById("uefachamps-football-innerdiv");
				res = document.createDocumentFragment();
				if(arr1.length == 0)
				{
					var h6 = document.createElement('h6');
					h6.innerText = "No ongoing matches";
					res.appendChild(h6);
				}
				if(arr2.length == 0)
				{
					var tr = document.createElement('tr');
					var td2 = document.createElement('td');
					var h6 = document.createElement('h6');
					h6.innerText = "No ongoing matches";
					td2.appendChild(h6);
					tr.appendChild(td2);
					document.getElementById('uefachampsFootballTable2').appendChild(tr);
				}
				for(var i=0; i<arr1.length; i++){
					if(i < 6 )
					{
						var footballPlusImg = document.createElement("img");
						footballPlusImg.src = "img/plus.png";
						footballPlusImg.width="9";
						footballPlusImg.height="9";
						footballPlusImg.className="uefachamps-plusminus";
						footballPlusImg.id="id3_"+i;
						var tr = document.createElement('tr');
						var td = document.createElement('td');	
						var h6 = document.createElement('h6');	
						var h6_1 = document.createElement('h6');				
						var a = document.createElement('a');
						a.href = arr1[i].link;
						a.innerText = "   "+arr1[i].title;
						h6.appendChild(footballPlusImg);
						h6.appendChild(a);
						h6_1.className = "descriptionClass"; 
						h6_1.id="h63_"+i;
						h6_1.innerText = arr1[i].description;
						td.appendChild(h6);
						td.appendChild(h6_1);
						tr.appendChild(td);
						document.getElementById('uefachampsFootballTable').appendChild(tr);
					}
					else{
						break;
					}

				}
				for(var i=6; i<arr1.length; i++){
				    var footballPlusImg = document.createElement("img");
					footballPlusImg.src = "img/plus.png";
					footballPlusImg.width="9";
					footballPlusImg.height="9";
					footballPlusImg.className="uefachamps-plusminus";
					footballPlusImg.id="id4_"+i;
					var tr = document.createElement('tr');
					var td2 = document.createElement('td');	
					var h6 = document.createElement('h6');	
					var h6_1 = document.createElement('h6');
					var a = document.createElement('a');
					a.href = arr1[i].link;
					a.innerText = "   "+arr1[i].title;
					h6.appendChild(footballPlusImg);
					h6.appendChild(a);
					res.appendChild(h6);
					h6_1.className = "descriptionClass"; 
					h6_1.id="h64_"+i;
					h6_1.innerText = arr1[i].description;
					res.appendChild(h6_1);	
				}
				document.getElementById('uefachampsFootballTable1').appendChild(res);

				for(var i=0; i<arr2.length; i++){
					var footballPlusImg = document.createElement("img");
					footballPlusImg.src = "img/plus.png";
					footballPlusImg.width="9";
					footballPlusImg.height="9";
					footballPlusImg.className="uefachamps-plusminus";
					footballPlusImg.id="id5_"+i;
					var tr = document.createElement('tr');
					var td = document.createElement('td');	
					var h6 = document.createElement('h6');	
					var h6_1 = document.createElement('h6');				
					var a = document.createElement('a');
					a.href = arr2[i].link;
					a.innerText = "   "+arr2[i].title;
					h6.appendChild(footballPlusImg);
					h6.appendChild(a);
					h6_1.className = "descriptionClass"; 
					h6_1.id="h65_"+i;
					h6_1.innerText = arr2[i].description;
					td.appendChild(h6);
					td.appendChild(h6_1);
					tr.appendChild(td);
					document.getElementById('uefachampsFootballTable1').appendChild(tr);
				}
				$('img.uefachamps-plusminus').click(showHide);		
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.uefa-loader').remove();
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				var h6 = document.createElement('h6');			
				h6.id="error";
				h6.innerText = "Sorry, something's wrong, will be fixed soon.";
				td.appendChild(h6);
				tr.appendChild(td);
				document.getElementById('uefachampsFootballTable').appendChild(tr);
			}
		});
	}
	else
	{
		$('#uefachamps-football').remove();
	}
}

function openLink() {
    var url = $(this).attr('href');
    if(url.indexOf("uefachampionsleague") > -1)
    {
    	var d = new Date();
		var n = d.getMonth();
		var split = url.split("?");
		if(n > 6)
		{
			url = split[0]+(d.getFullYear()+1)+split[1];
		}
		else
		{
			url = split[0]+d.getFullYear()+split[1];
		}
    }
    chrome.tabs.create({"url":url});
    return false;
}

function showHide() {
    var id = $(this).attr('id');
    var idOf0 = id.split("_")[0]; 
    var h6id = "h6" + idOf0.charAt(idOf0.length - 1) + "_" + id.split("_")[1]; //to get h60_1 format 
    if($('#' + h6id).css('display') == 'none') {
        $('#' + h6id).slideDown("fast");
        $(this).attr({src: 'img/minus.png'});
    }
    else {
        $('#' + h6id).slideUp("fast");
        $(this).attr({src: 'img/plus.png'});
    }
}

// function renderStatus(statusText) {
//   document.getElementById('status').textContent = statusText;
// }

$(document).ready(function() { 
    var cricketMoreImgLocalMatches = document.createElement("img");
	cricketMoreImgLocalMatches.src = "img/more.png";
	cricketMoreImgLocalMatches.width="9";
	cricketMoreImgLocalMatches.height="8";
	var cricketLessImgLocalMatches = document.createElement("img");
	cricketLessImgLocalMatches.src = "img/less.png";
	cricketLessImgLocalMatches.width="9";
	cricketLessImgLocalMatches.height="8";
    var cricketMoreImgNews = document.createElement("img");
	cricketMoreImgNews.src = "img/more.png";
	cricketMoreImgNews.width="9";
	cricketMoreImgNews.height="8";
	var cricketLessImgNews = document.createElement("img");
	cricketLessImgNews.src = "img/less.png";
	cricketLessImgNews.width="9";
	cricketLessImgNews.height="8";
	var eplFootballMoreImgLive = document.createElement("img");
	eplFootballMoreImgLive.src = "img/more.png";
	eplFootballMoreImgLive.width="9";
	eplFootballMoreImgLive.height="8";
	var eplFootballLessImgLive = document.createElement("img");
	eplFootballLessImgLive.src = "img/less.png";
	eplFootballLessImgLive.width="9";
	eplFootballLessImgLive.height="8";
	var eplFootballMoreImgReports = document.createElement("img");
	eplFootballMoreImgReports.src = "img/more.png";
	eplFootballMoreImgReports.width="9";
	eplFootballMoreImgReports.height="8";
	var eplFootballLessImgReports = document.createElement("img");
	eplFootballLessImgReports.src = "img/less.png";
	eplFootballLessImgReports.width="9";
	eplFootballLessImgReports.height="8";
	var uefachampsFootballMoreImgLive = document.createElement("img");
	uefachampsFootballMoreImgLive.src = "img/more.png";
	uefachampsFootballMoreImgLive.width="9";
	uefachampsFootballMoreImgLive.height="8";
	var uefachampsFootballLessImgLive = document.createElement("img");
	uefachampsFootballLessImgLive.src = "img/less.png";
	uefachampsFootballLessImgLive.width="9";
	uefachampsFootballLessImgLive.height="8";
	var uefachampsFootballMoreImgReports = document.createElement("img");
	uefachampsFootballMoreImgReports.src = "img/more.png";
	uefachampsFootballMoreImgReports.width="9";
	uefachampsFootballMoreImgReports.height="8";
	var uefachampsFootballLessImgReports = document.createElement("img");
	uefachampsFootballLessImgReports.src = "img/less.png";
	uefachampsFootballLessImgReports.width="9";
	uefachampsFootballLessImgReports.height="8";

    getCurrentTabUrl(function(url) {
    //renderStatus('Sports Live Scores');
    getScores();
    $(document).ajaxStop(function() {
    	$('a:not([href=#])').click(openLink);
	});

	$(".cricket-header-localmatches").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("cricket-arrow-span-localmatches").textContent=" Less ";
					document.getElementById("cricket-arrow-span-localmatches").appendChild(cricketLessImgLocalMatches);
	            }
	            else
	            {
					document.getElementById("cricket-arrow-span-localmatches").textContent="More ";
					document.getElementById("cricket-arrow-span-localmatches").appendChild(cricketMoreImgLocalMatches);
	            }
	        });
	    });

	});
	$(".cricket-header-news").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("cricket-arrow-span-news").textContent=" News ";
					document.getElementById("cricket-arrow-span-news").appendChild(cricketLessImgNews);
	            }
	            else
	            {
					document.getElementById("cricket-arrow-span-news").textContent="News ";
					document.getElementById("cricket-arrow-span-news").appendChild(cricketMoreImgNews);
	            }
	        });
	    });

	});
	$(".epl-football-header-live").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("epl-football-arrow-span-live").textContent=" Less ";
					document.getElementById("epl-football-arrow-span-live").appendChild(eplFootballLessImgLive);
	            }
	            else
	            {
					document.getElementById("epl-football-arrow-span-live").textContent="More ";
					document.getElementById("epl-football-arrow-span-live").appendChild(eplFootballMoreImgLive);
	            }
	        });
	    });
	});
	$(".epl-football-header-reports").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("epl-football-arrow-span-reports").textContent=" Match Reports ";
					document.getElementById("epl-football-arrow-span-reports").appendChild(eplFootballLessImgReports);
	            }
	            else
	            {
					document.getElementById("epl-football-arrow-span-reports").textContent="Match Reports ";
					document.getElementById("epl-football-arrow-span-reports").appendChild(eplFootballMoreImgReports);
	            }
	        });
	    });
	});
	$(".uefachamps-football-header-live").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("uefachamps-football-arrow-span-live").textContent=" Less ";
					document.getElementById("uefachamps-football-arrow-span-live").appendChild(uefachampsFootballLessImgLive);
	            }
	            else
	            {
					document.getElementById("uefachamps-football-arrow-span-live").textContent="More ";
					document.getElementById("uefachamps-football-arrow-span-live").appendChild(uefachampsFootballMoreImgLive);
	            }
	        });
	    });
	});
	$(".uefachamps-football-header-reports").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("uefachamps-football-arrow-span-reports").textContent=" Match Reports ";
					document.getElementById("uefachamps-football-arrow-span-reports").appendChild(uefachampsFootballLessImgReports);
	            }
	            else
	            {
					document.getElementById("uefachamps-football-arrow-span-reports").textContent="Match Reports ";
					document.getElementById("uefachamps-football-arrow-span-reports").appendChild(uefachampsFootballMoreImgReports);
	            }
	        });
	    });
	});
  });
 });


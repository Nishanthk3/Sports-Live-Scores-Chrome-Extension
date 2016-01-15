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
						span.style.fontSize = "9px";
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
						cricketPlusImg.id="idcric0_"+i;
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
						h6_1.id="h6cric0_"+i;
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
						footballPlusImg.id="idepl0_"+i;
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
						h6_1.id="h6epl0_"+i;
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
					footballPlusImg.id="idepl1_"+i;
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
					h6_1.id="h6epl1_"+i;
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
					footballPlusImg.id="idepl2_"+i;
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
					h6_1.id="h6epl2_"+i;
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
						footballPlusImg.id="iduefa0_"+i;
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
						h6_1.id="h6uefa0_"+i;
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
					footballPlusImg.id="iduefa1_"+i;
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
					h6_1.id="h6uefa1_"+i;
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
					footballPlusImg.id="iduefa2_"+i;
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
					h6_1.id="h6uefa2_"+i;
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
	if(leagues.indexOf("bundesliga")>-1 || leagues.indexOf("all-leagues")>-1 || leagues.length == 0 )
	{
	    $.ajax({
			type : 'GET',
			url : "http://editonfly.com:8080/sports/bundesligafootball/rss.html",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				$('.bundesliga-loader').remove();
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
					document.getElementById('bundesligaFootballTable').appendChild(tr);
				}
				for(var i=0; i<arr1.length; i++){
					if(i < 6 )
					{
						var footballPlusImg = document.createElement("img");
						footballPlusImg.src = "img/plus.png";
						footballPlusImg.width="9";
						footballPlusImg.height="9";
						footballPlusImg.className="bundesliga-plusminus";
						footballPlusImg.id="idbundesliga0_"+i;
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
						h6_1.id="h6bundesliga0_"+i;
						h6_1.innerText = arr1[i].description;
						td.appendChild(h6);
						td.appendChild(h6_1);
						tr.appendChild(td);
						document.getElementById('bundesligaFootballTable').appendChild(tr);
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
					footballPlusImg.className="bundesliga-plusminus";
					footballPlusImg.id="idbundesliga1_"+i;
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
					h6_1.id="h6bundesliga1_"+i;
					h6_1.innerText = arr1[i].description;
					res.appendChild(h6_1);	
				}
				document.getElementById('bundesligaFootballTable1').appendChild(res);

				for(var i=0; i<arr2.length; i++){
					var footballPlusImg = document.createElement("img");
					footballPlusImg.src = "img/plus.png";
					footballPlusImg.width="9";
					footballPlusImg.height="9";
					footballPlusImg.className="bundesliga-plusminus";
					footballPlusImg.id="idbundesliga2_"+i;
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
					h6_1.id="h6bundesliga2_"+i;
					h6_1.innerText = arr2[i].description;
					td.appendChild(h6);
					td.appendChild(h6_1);
					tr.appendChild(td);
					document.getElementById('bundesligaFootballTable2').appendChild(tr);
				}
				$('img.bundesliga-plusminus').click(showHide);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.bundesliga-loader').remove();
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				var h6 = document.createElement('h6');
				h6.id="error";			
				h6.innerText = "Sorry, something's wrong, will be fixed soon.";
				td.appendChild(h6);
				tr.appendChild(td);
				document.getElementById('bundesligaFootballTable').appendChild(tr);
			}
		});
	}
	else
	{
		$('#bundesliga-football').remove();
	}
	if(leagues.indexOf("facup")>-1 || leagues.indexOf("all-leagues")>-1 || leagues.length == 0 )
	{
	    $.ajax({
			type : 'GET',
			url : "http://editonfly.com:8080/sports/facupfootball/rss.html",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				$('.facup-loader').remove();
				var arr1 = text.ArrayList;
				if(arr1.length == 0)
				{
					var h6 = document.createElement('h6');
					h6.innerText = "No ongoing matches";
					res.appendChild(h6);
				}
				for(var i=0; i<arr1.length; i++){
					if(i < 6 )
					{
						var footballPlusImg = document.createElement("img");
						footballPlusImg.src = "img/plus.png";
						footballPlusImg.width="9";
						footballPlusImg.height="9";
						footballPlusImg.className="facup-plusminus";
						footballPlusImg.id="idfacup0_"+i;
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
						h6_1.id="h6facup0_"+i;
						h6_1.innerText = arr1[i].description;
						td.appendChild(h6);
						td.appendChild(h6_1);
						tr.appendChild(td);
						document.getElementById('facupFootballTable').appendChild(tr);
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
					footballPlusImg.className="facup-plusminus";
					footballPlusImg.id="idfacup1_"+i;
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
					h6_1.id="h6facup1_"+i;
					h6_1.innerText = arr1[i].description;
					td.appendChild(h6);
					td.appendChild(h6_1);
					tr.appendChild(td);
					document.getElementById('facupFootballTable1').appendChild(tr);
				}
				$('img.facup-plusminus').click(showHide);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.facup-loader').remove();
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				var h6 = document.createElement('h6');
				h6.id="error";			
				h6.innerText = "Sorry, something's wrong, will be fixed soon.";
				td.appendChild(h6);
				tr.appendChild(td);
				document.getElementById('facupFootballTable').appendChild(tr);
			}
		});
	}
	else
	{
		$('#facup-football').remove();
	}
	if(leagues.indexOf("laliga")>-1 || leagues.indexOf("all-leagues")>-1 || leagues.length == 0 )
	{
	    $.ajax({
			type : 'GET',
			url : "http://editonfly.com:8080/sports/laligafootball/rss.html",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				$('.laliga-loader').remove();
				var arr1 = text.ArrayList;
				if(arr1.length == 0)
				{
					var h6 = document.createElement('h6');
					h6.innerText = "No ongoing matches";
					res.appendChild(h6);
				}
				for(var i=0; i<arr1.length; i++){
					if(i < 6 )
					{
						var footballPlusImg = document.createElement("img");
						footballPlusImg.src = "img/plus.png";
						footballPlusImg.width="9";
						footballPlusImg.height="9";
						footballPlusImg.className="laliga-plusminus";
						footballPlusImg.id="idlaliga0_"+i;
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
						h6_1.id="h6laliga0_"+i;
						h6_1.innerText = arr1[i].description;
						td.appendChild(h6);
						td.appendChild(h6_1);
						tr.appendChild(td);
						document.getElementById('laligaFootballTable').appendChild(tr);
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
					footballPlusImg.className="laliga-plusminus";
					footballPlusImg.id="idlaliga1_"+i;
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
					h6_1.id="h6laliga1_"+i;
					h6_1.innerText = arr1[i].description;
					td.appendChild(h6);
					td.appendChild(h6_1);
					tr.appendChild(td);
					document.getElementById('laligaFootballTable1').appendChild(tr);
				}
				$('img.laliga-plusminus').click(showHide);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.laliga-loader').remove();
				var tr = document.createElement('tr');
				var td = document.createElement('td');
				var h6 = document.createElement('h6');
				h6.id="error";			
				h6.innerText = "Sorry, something's wrong, will be fixed soon.";
				td.appendChild(h6);
				tr.appendChild(td);
				document.getElementById('laligaFootballTable').appendChild(tr);
			}
		});
	}
	else
	{
		$('#laliga-football').remove();
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
    var h6id = "h6" + idOf0.split("id")[1] + "_" + id.split("_")[1]; //to get h60_1 format 
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
function getManifestVersion(currentVersion) {
	$.ajax({
			type : 'GET',
			url : "/manifest.json",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				if( currentVersion == JSON.parse(text).version)
				{
					$('.boxed #version').remove();
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.boxed #version').remove();
			}
		});
	}
function getCurrentVersion() {
	$.ajax({
			type : 'GET',
			url : "http://editonfly.com:8080/sports/extensionVersion",
			statusCode: {
			    404: function() {
			      alert( "Not Found" );
			    },
				401: function() {
				      alert( "Unauthorized - Access Denied" );
		    	}
			},
			success : function(text) {
				getManifestVersion(text);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('.boxed #version').remove();
			}
		});
	}
$(document).ready(function() { 
	getCurrentVersion();
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
					$("#cricket-arrow-span-localmatches").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("cricket-arrow-span-localmatches").textContent="More ";
					$("#cricket-arrow-span-localmatches").append("<img src='img/more.png' width='9' height='8' />");
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
					$("#cricket-arrow-span-news").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("cricket-arrow-span-news").textContent="News ";
					$("#cricket-arrow-span-news").append("<img src='img/more.png' width='9' height='8' />");
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
					$("#epl-football-arrow-span-live").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("epl-football-arrow-span-live").textContent="More ";
					$("#epl-football-arrow-span-live").append("<img src='img/more.png' width='9' height='8' />");
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
					$("#epl-football-arrow-span-reports").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("epl-football-arrow-span-reports").textContent="Match Reports ";
					$("#epl-football-arrow-span-reports").append("<img src='img/more.png' width='9' height='8' />");
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
					$("#uefachamps-football-arrow-span-live").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("uefachamps-football-arrow-span-live").textContent="More ";
					$("#uefachamps-football-arrow-span-live").append("<img src='img/more.png' width='9' height='8' />");
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
					$("#uefachamps-football-arrow-span-reports").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("uefachamps-football-arrow-span-reports").textContent="Match Reports ";
					$("#uefachamps-football-arrow-span-reports").append("<img src='img/more.png' width='9' height='8' />");
	            }
	        });
	    });
	});
	$(".bundesliga-football-header-live").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("bundesliga-football-arrow-span-live").textContent=" Less ";
					$("#bundesliga-football-arrow-span-live").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("bundesliga-football-arrow-span-live").textContent="More ";
					$("#bundesliga-football-arrow-span-live").append("<img src='img/more.png' width='9' height='8' />");
	            }
	        });
	    });
	});
	$(".bundesliga-football-header-news").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("bundesliga-football-arrow-span-news").textContent=" News ";
					$("#bundesliga-football-arrow-span-news").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("bundesliga-football-arrow-span-news").textContent="News ";
					$("#bundesliga-football-arrow-span-news").append("<img src='img/more.png' width='9' height='8' />");
	            }
	        });
	    });
	});
	$(".facup-football-header-live").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("facup-football-arrow-span-live").textContent=" Less ";
					$("#facup-football-arrow-span-live").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("facup-football-arrow-span-live").textContent="More ";
					$("#facup-football-arrow-span-live").append("<img src='img/more.png' width='9' height='8' />");
	            }
	        });
	    });
	});
	$(".laliga-football-header-live").click(function () {

	    $header = $(this);
	    $content = $header.next();
	    $content.slideToggle(100, function () {

	        $header.text(function () {
	            if($content.is(":visible") == true)
	            {
					document.getElementById("laliga-football-arrow-span-live").textContent=" Less ";
					$("#laliga-football-arrow-span-live").append("<img src='img/less.png' width='9' height='8' />");
	            }
	            else
	            {
					document.getElementById("laliga-football-arrow-span-live").textContent="More ";
					$("#laliga-football-arrow-span-live").append("<img src='img/more.png' width='9' height='8' />");
	            }
	        });
	    });
	});
  });
 });


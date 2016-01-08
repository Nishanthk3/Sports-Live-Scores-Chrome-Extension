$(document).ready(function() {

	if(localStorage.length == 0)
	{
		localStorage["all"]= "all-leagues";
		var name = localStorage["all"];
		$("#" + name).prop('checked', true);
		$(".filter").attr("disabled", true);
	}
	else if(localStorage["all"] != null)
	{
		var name = localStorage["all"];
		$("#" + name).prop('checked', true);
		$(".filter").attr("disabled", true);
	}
	else
	{
		var totLeagues = $('input[name=leagues]').length;
		for(len=0; len<totLeagues;len++)
		{
			var name = localStorage["league"+len];
			if(name != null)
			{
				$("#" + name).prop('checked', true);
			}
		}
	}
	$('.regular').change(function() {
	    if($(this).is(':checked'))
	    {
	    	var boxes = $('input[name=leagues]:checked');
			for(len=0; len<boxes.length;len++)
			{
				$("#" + boxes[len].id).prop('checked', false);
			}

	        $(".filter").attr("disabled", true);
	    }
	    else
	    {
	    	$(".filter").removeAttr("disabled");
	    }
	});
	$("#preference").click(function () {
			var total = localStorage.length;
			for(i=0; i<total; i++)
			{
				var key = localStorage.key(0);
				localStorage.removeItem(key);
			}
			var allLeagues = $('input[name=all-leagues]:checked');
			var boxes = $('input[name=leagues]:checked');
			if(boxes.length > 0)
			{
				var x = 0;
				for(i=0; i<boxes.length ;i++)
				{
					localStorage["league"+x]=boxes[i].id;
					x++;
				}
			}
			else
			{
				localStorage["all"]="all-leagues";
				if(allLeagues.length != 1)
				{
					var name = localStorage["all"];
					$("#" + name).prop('checked', true);
				}
			}
			alert("Preferences have been saved successfully");
		});
	});
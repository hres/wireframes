function init()
{
	strTextSize = "Text Size: <a href=\"#\" title=\"Small font\" onclick=\"changeTextSize('70%');return false;\"> S</a> <a href=\"#\" title=\"Medium Font\" onclick=\"changeTextSize('80%');return false;\">M</a> <a href=\"#\" title=\"Large font\" onclick=\"changeTextSize('90%');return false;\">L</a> <a href=\"#\" title=\"Extra large font\" onclick=\"changeTextSize('100%');return false;\">XL</a> <a href=\"/home-accueil/text-eng.php\" title=\"Help\">Help</a>";
	
	textID = document.getElementById("textsize");
	
	//Detect if browser supports these functions
	if (document.getElementById && document.createElement)
	{	
		if(textID)
		{
			textID.innerHTML = strTextSize;
		}
	}
}

function changeTextSize(size)
{
	document.body.style.fontSize = size;
}

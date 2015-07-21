
var request = require('request');
var cheerio = require('cheerio');
var fs= require('fs');


request({url:'http://9gag.com/trending', encoding:'binary'}, function(err,res,hmtl){
	if(!err && res.statusCode==200)
	{
		
		$ = cheerio.load(hmtl);
		$('article').each(function(){
			var titulo= $(this).find('header h2 a').text();
			console.log(titulo);
			var img= $(this).find('div a .badge-item-img').attr('src');
			console.log(img);
			var nombre= $(this).find('div a .badge-item-img').attr('alt');
			nombre= nombre.replace(/[!?"'*]/gi,"");

			var formato=img.substring(img.length-3,img.length);
			console.log(formato);
			if(formato=="jpg")
			{
			var file= fs.createWriteStream('img/'+nombre+'.jpg');
			request(img).pipe(file);	
			console.log("imagen agregada");
			}

			if(formato=="gif")
			{
			var file= fs.createWriteStream('img/'+nombre+'.gif');
			request(img).pipe(file);	
			
			}


			
			
			
		});

		

		console.log("scraping exitoso");
			
		
	}
	else
	console.log("scraping error");
});


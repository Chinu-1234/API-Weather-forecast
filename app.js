const express=require("express");
const https=require("https");
const bodyParse=require("body-parser");
const app=express();

app.use(bodyParse.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    app.post("/",function(req,res)
    {
    console.log(req.body.CityName);
       const query = req.body.CityName;
    const apiKey ="382bd53c86ea0ee47fa5a144ec67c41e";
    const unit ="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&unit="+unit +"&appid="+ apiKey +"";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const icon =weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            console.log(imgURL);
            var temp=weatherData.main.temp;


            console.log(temp);
            console.log(weatherData.weather[0].description);

            res.write("<h1>The description is "+ weatherData.weather[0].description +"</h1>");
            res.write("<h1>The temp in " +query+ " is " + temp + " Kelvin</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});

    
});
app.listen(3000,function(){
    console.log("Server connected at 3000");
    
});
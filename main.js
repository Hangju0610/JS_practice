var http = require('http');
var fs = require('fs');
var url = require('url');  // url이란 모듈을 사용할 것이다. url이라는 변수를 통해서 사용할 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(request.url, true).query; // querydate를 사용
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id

    if (pathname === '/'){
      if(queryData.id === undefined){

        fs.readdir('./data', function(error,filelist){
          var title = 'Welcome';
          var description = 'hello, Node.js';
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          
          list = list + '</ul>';

          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <h2>${title}</h2>
            ${list}
            <p>${description}</p>
          </body>
          </html>
          `
          response.writeHead(200); // 웹페이지에 원하는 데이터를 찾았을때 200
          response.end(template); 
        })

      } else {
        fs.readdir('./data', function(error,filelist){
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list = list + '</ul>';

        fs.readFile(`data/${queryData.id}`, 'utf-8', function(err,description){
          var title = queryData.id;
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `
          response.writeHead(200); // 웹페이지에 원하는 데이터를 찾았을때 200
          response.end(template); 
        });
      });
    }
  } else {
    response.writeHead(404); // 404은 는 못찾았을때
    response.end('Not found'); 

  }

 
});
app.listen(3000);
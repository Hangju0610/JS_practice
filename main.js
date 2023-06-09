var http = require('http');
var fs = require('fs');
var url = require('url');  // url이란 모듈을 사용할 것이다. url이라는 변수를 통해서 사용할 것이다.
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');



var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(request.url, true).query; // querydate를 사용
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/'){
      if(queryData.id === undefined){

        fs.readdir('./data', function(error,filelist){
          var title = 'Welcome';
          var description = 'hello, Node.js';
          var list = template.list(filelist);
          var HTML = template.html(title, list,`<h2>${title}</h2><p>${description}</p>`,`<a href="/create">create</a>`);
          response.writeHead(200); // 웹페이지에 원하는 데이터를 찾았을때 200
          response.end(HTML);
        });

      } else {
        fs.readdir('./data', function(error,filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`, 'utf-8', function(err,description){
            var title = queryData.id;
            var sanitizeTitle = sanitizeHtml(title);
            var sanitizeDescription = sanitizeHtml(description)
            var list = template.list(filelist);
            var HTML = template.html(sanitizeTitle, list,`<h2>${sanitizeTitle}</h2><p>${sanitizeDescription}</p>`,
            `<a href="/create">create</a> 
             <a href="/update?id=${sanitizeTitle}">update</a> 
             <form action="delete_process" method="post" onsubmit="삭제하시겠습니까?">
              <input type="hidden" name = "id" value="${sanitizeTitle}">
              <input type="submit" value = "delete">
             </form>`);
            response.writeHead(200); // 웹페이지에 원하는 데이터를 찾았을때 200
            response.end(HTML); 
          });
        });
      }
    } else if(pathname === "/create"){ // 생성 페이지
      fs.readdir('./data', function(error,filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var HTML = template.html(title, list,`
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name = "description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
          `);
        response.writeHead(200); // 웹페이지에 원하는 데이터를 찾았을때 200
        response.end(HTML);
      });

    } else if (pathname === '/create_process'){ // 생성 후 정보 수신 및 되돌아가기
      var body = '';
      request.on('data', function(data){ // 정보 수신
        body += data;
      });
      request.on('end',function(){ // 정보 수신을 끝낸다.
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
          response.writeHead(302, {location:`/?id=${title}`}); // 302 : 원하는 페이지로 돌아가기
          response.end('success');
        })
      });

    } else if(pathname === '/update'){ // update 창
      fs.readdir('./data', function(error,filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf-8', function(err,description){
          var title = queryData.id;
          var list = template.list(filelist);
          var HTML = template.html(title, list,`
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value ="${title}">
            <p><input type="text" name="title" placeholder="title" value = "${title}"></p>
            <p>
                <textarea name = "description" placeholder="description" >${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
          `,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          response.writeHead(200); // 웹페이지에 원하는 데이터를 찾았을때 200
          response.end(HTML); 
        });
      });
    } else if(pathname === '/update_process'){ // update process
        var body = '';
        request.on('data', function(data){ // 정보 수신
          body += data;
        });
        request.on('end',function(){ // 정보 수신을 끝낸다.
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;
          fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf-8', function(err){
              response.writeHead(302, {location:`/?id=${title}`}); // 302 : 원하는 페이지로 돌아가기
              response.end('success');
            });
          });
        });
    } else if (pathname === '/delete_process'){ // deleta process
      var body = '';
      request.on('data', function(data){ // 정보 수신
        body += data;
      });
      request.on('end',function(){ // 정보 수신을 끝낸다.
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(){
          response.writeHead(302, {location:`/`}); // 302 : 원하는 페이지로 돌아가기
          response.end('success');
        })
      });
  } else {
      response.writeHead(404); // 404은 는 못찾았을때
      response.end('Not found'); 
  }
});
app.listen(5000);
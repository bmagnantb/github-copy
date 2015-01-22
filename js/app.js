window.onload = app;

// runs when the DOM is loaded
function app() {
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {
            url: "./dist/style.css"
        },
        //js
        {
            url: "./bower_components/jquery/dist/jquery.min.js"
        }, {
            url: "./bower_components/lodash/dist/lodash.min.js"
        }
        // {url: "./bower_components/backbone/backbone.js"}
    ).then(function() {
        document.querySelector("html").style.opacity = 1;
        // start app?
        var githubUsername = 'bmagnantb';
        var url = 'https://api.github.com/users/' + githubUsername;
        var url2 = 'https://api.github.com/users/' + githubUsername + '/repos';
        var userDiv = document.querySelector('.user');
        var reposDiv = document.querySelector('.repoList');

        $.getJSON(url).then(makeProfile);
        $.getJSON(url2).then(makeRepoList);

        function makeProfile(data) {

            console.log(data);

            var html = [
                '<img src="',
                data.avatar_url,
                '" />',
                '<h1>',
                data.name,
                '</h1>',
                '<a href="',
                data.html_url,
                '">',
                '<h2>',
                data.login,
                '</h2>',
                '</a>',
            ].join('');


            var h3s = [data.location, data.email, data.blog];

            h3s = h3s.map(function(val, ind) {
                    val = '<h3>' + val + '</h3>';
                    return val;
                })
                .join('');

            userDiv.innerHTML = html + h3s;

        }

        function makeRepoList(data) {
            console.log(data);
            data.sort(function(a,b){
            	return (a.updated_at > b.updated_at) ? -1 : 1;
            })
            var reposHtml = [];

            data.forEach(function(val, ind) {
                reposHtml.push('<div><a href="'+val.html_url+'"><h2>'+val.name+'</h2></a><h3>'+val.language+'&nbsp;&nbsp;&nbsp;*-'+val.stargazers_count+'&nbsp;&nbsp;&nbsp;Y-'+val.forks_count+'</h3></div>');

            })

            reposDiv.innerHTML = reposHtml.join('');

        }




    })

}

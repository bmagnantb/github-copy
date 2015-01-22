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
            data.sort(function(a, b) {
                return (a.updated_at > b.updated_at) ? -1 : 1;
            })
            var reposHtml = [];

            data.forEach(function(val, ind) {
                // find time since last update, create now variable, subtract updated_at(parsed from ISO 8601) and divide by 1000 to get seconds
                var update = val.updated_at;
                var now = new Date();
                var timeSince = (now - Date.parse(val.updated_at)) / 1000;
                // following method doesn't convert to months/years, would lose accuracy quickly




                // if less than 60 seconds, round to nearest second and add ' second(s)' to string
                if (timeSince < 60) {
                    timeSince = Math.round(timeSince)
                        // if less than 2 seconds, change timeSince to 'a second', else add ' seconds'
                    if (timeSince < 2) {
                        timeSince = 'a second ago';
                    } else {
                        timeSince += ' seconds ago';
                    }
                }

                // else divide by 60 to convert to minutes
                else {
                    timeSince /= 60;
                    // if less than 60 minutes, round to nearest minute and add ' minute(s)'
                    if (timeSince < 60) {
                        timeSince = Math.round(timeSince);
                        // if less than 2 minutes, add 'a minute', else add ' minutes'
                        if (timeSince < 2) {
                            timeSince = 'a minute ago';
                        } else {
                            timeSince += ' minutes ago';
                        }
                    }

                    // else divide by 60 to convert to hours
                    else {
                        timeSince /= 60;
                        // if less than 24 hours, round to nearest hour and add ' hours(s)'
                        if (timeSince < 24) {
                            timeSince = Math.round(timeSince);
                            // if less than 2 hours, add 'an hour', else add 'hours'
                            if (timeSince < 2) {
                                timeSince = 'an hour ago';
                            } else {
                                timeSince += ' hours ago';
                            }
                        }

                        // else divide by 24 to convert to days
                        else {
                            timeSince /= 24;
                            // if < 60, round to nearest day and add ' day(s)'
                            if (timeSince < 60) {
                                timeSince = Math.round(timeSince);
                                // if less than 2 days, add 'a day', else add 'days'
                                if (timeSince < 2) {
                                    timeSince = 'a day ago';
                                } else {
                                    timeSince += ' days ago';
                                }
                            }

                            //else val.updated_at.toDateString()
                            else {
                            	timeSince = (new Date(Date.parse(val.updated_at))).toDateString().slice(4);
                            }
                        }
                    }
                }




                reposHtml.push('<div><a href="' + val.html_url + '"><h2>' + val.name + '</h2></a><h4>' + val.language + '&nbsp;&nbsp;&nbsp;*-' + val.stargazers_count + '&nbsp;&nbsp;&nbsp;Y-' + val.forks_count + '</h4><h3>Updated ' + timeSince + '</h3></div>');

            })

            reposDiv.innerHTML = reposHtml.join('');

        }




    })

}

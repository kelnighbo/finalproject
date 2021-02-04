let APIURL = ''

switch (window.location.hostname) {
    case 'https://kelnighbo-frontapp.herokuapp.com':
        APIURL = 'https://kelnighbo-app.herokuapp.com';
    break;
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'

}

export default APIURL
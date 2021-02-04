let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:todo-app'
        break
    case 'kelnighbo-frontapp'.herokuapp.com:
        APIURL = 'https:kelnighbo-app'.herokuapp.com

}

export default APIURL
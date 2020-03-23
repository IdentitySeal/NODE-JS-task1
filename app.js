const http = require('http');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`
            <!doctype html>
            <html>
            <body>
            <h2>See the message you sent : </h2>
            <pre>${result.message}</pre>
           </body>
            </html>
             `);
        });
    } else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post" id ="usrform" >
                    <textarea name="message" form="usrform">Enter message here...</textarea>
                    <button>Submit</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    } else {
        callback(null);
    }
}
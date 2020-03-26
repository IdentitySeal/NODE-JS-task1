const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            fs.writeFile('message.txt', result.message, (err) => {
                if (err) throw err;
                console.log('It has been Saved');
            })

            res.write(
                ` <!doctype html>
                    <html>
                    <body>
                    <h2>See the message you sent : </h2>
                    <pre>${result.message}</pre>
                   </body>
                    </html>`
            );
            res.end();
        });
    } else {
        res.write(`
            <!doctype html>
            <html>
            <body>
                <form action="/message" method="post" id ="usrform" >
                    <textarea name="message" form="usrform">Enter message here...</textarea>
                    <button>Submit</button>
                </form>
            </body>
            </html>
        `);
        res.end();

    }
});
server.listen(8080);

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

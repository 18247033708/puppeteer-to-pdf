const express =require('express')
const puppeteer = require('puppeteer')
var bodyParser = require('body-parser');
const path = require('path')
const port = 3001

const app = express()
const resolve = pathname => path.resolve(__dirname, pathname)

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
})

app.use(bodyParser.json());  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/puppeteer', async (req, res) => {
  console.log("/puppeteer");
  const printPdf = async () => {
    const brower = await puppeteer.launch()
    const page = await brower.newPage()
    const url = req.body.url || 'https://www.baidu.com/';
    console.log(url);
    await page.goto(url, { waitUntil: 'networkidle0'})
    const pdf = await page.pdf({ 
      //纸张尺寸
      format: 'A4',
      //打印背景,默认为false
      printBackground: true,
      //不展示页眉
      displayHeaderFooter: true,
      margin: {
        top: 5,
        left: 0,
        right: 0,
        bottom: 5,
      },
      format: 'A4'
    })
    await brower.close()
    return pdf
  }
  const result = await printPdf()
  res.set({'Content-Type': 'application/pdf', 'Content-Length': result.length})
  res.send(result)
})

app.listen(port, () => {
  console.log(`listening server on port ${port}`)
})

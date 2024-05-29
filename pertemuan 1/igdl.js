const axios = require('axios')
const cheerio = require("cheerio")

async function igdl(url) {
    try {
        const payload = {
            q: url,
            t: "media",
            lang: "en"
        }

        const options = {
            headers: {
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            }
        }

        const response = await axios.post("https://v3.saveig.app/api/ajaxSearch", payload, options)
        const mangkupurel = await response.data

        let $ = cheerio.load(mangkupurel.data)
        let result = []

        $('div.download-items__btn a').each((i, e) =>{
            result.push({ url: $(e).attr('href')})
        })

        return result

    } catch (e) {
    console.error(e)
    return e.message
    }
}

igdl("https://www.instagram.com/p/C7eJpPTpaC6")

.then(result => {
console.log(result)})
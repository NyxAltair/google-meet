const axios = require('axios')
const cheerio = require('cheerio')

async function fbdl(url){
    try {
        const options = {
        headers: {

          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0'
        }

    }
        const payload = `URLz=${url}`

        const response = await axios.post("https://www.fdown.net/download.php", payload, options)
        const result = response.data

        const $ = cheerio.load(result)

        const sdLink = $('#sdlink').attr('href')
        const hdLink = $('#hdlink').attr('href')

        if (sdLink && hdLink){
            return {

                sd: sdLink,
                hd: hdLink
            }
            }
        else if (sdLink){
        return{
            sd: sdLink
        }}

        else if (hdLink){
        return{
            hd: hdLink
        }}

        else {
        return{
        message: 'no data'}}

    } catch (e) {
    return e.message
    }
}

fbdl("https://www.facebook.com/100073275466346/video")
.then(result =>{
console.log(result)})
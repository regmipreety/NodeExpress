const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const { timeout } = require('async')

const scrapeData = async(url, page) =>{
    try{
        await page.goto(url, {waitUntil: 'load', timeout: 0})

        const html = await page.evaluate(()=> document.body.innerHTML)
        const $ = await cheerio.load(html)
        let title = $("h2 a").text()
        let genres = $("span.genres").text()
        let released = $(".release_date").text()
        let overview = $(".overview > p").text()
        let score = $(".user_score_chart"). attr("data-percent")
        let imgURL = $("#original_header > div.poster_wrapper.false > div > div.image_content > div > img").attr("src")

        let crewLength = $('div.header_info > ol > li').length

        let crew = [];

        for (let i =1; i <= crewLength; i++){
            let castname= $('div.header_info > ol > li:nth-child('+i+') p').text()
            let role = $('div.header_info > ol > li:nth-child('+i+') > p.character').text()
            crew.push({
                "name": castname,
                "role": role
            })
        }

        browser.close()
        return {title, genres, released, overview, score, imgURL, crew }
    }
    catch(err){
        console.log(err)
    }
}

const getResults = async(req, res)=>{
    try {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] }) //removed headless: true for deployment

        const page = await browser.newPage()

        let url = req.query.search

        let data = await scrapeData(url , page)

        res.render('movies/movies', {data})

    } catch (err) {
        req.flash("error_msg", "ERROR"+err)
        res.redirect("/dashboard")
    }   
    
}

module.exports = { getResults}
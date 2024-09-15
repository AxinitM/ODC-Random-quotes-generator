# Random quotes generator

The page was created as part of the [Front End Developer Course by Orange DC](https://digitalcenter.orange.md/).

## Table of contents

- [Screenshot](#screenshot)
- [Links](#links)
- [Tasks](#tasks)
- [Random Quote Generator Description](#random-quote-generator-description)
- [Author](#author)

## Screenshot

![](/image/screenshot.png)

## Links

[Random quotes generator Page]()

## Tasks
Create a page with a quote generator. 

## Random Quote Generator Description
This page displays random quotes and their authors, retrieving this information via the API from https://zenquotes.io. 

The page uses two fonts: mainFontFamily (for the welcome message, error message, and request limit exceeded message) and QuoteHandWritingFont (for the quote). 

If the quote is successfully fetched, it is displayed in the font (var(--QuoteHandWritingFont)). The author’s name is shown in the #author element. 

If an error occurs while fetching the quote, an error message is displayed. The font for the error message is the main font (var(--mainFontFamily)). 

If the API returns a request limit exceeded message, the quote text changes to inform about the need to purchase a key or wait 30 seconds. For better readability, this message is displayed using the main font (var(--mainFontFamily)).

The page is adapted for screens 470 pixels and smaller.
## Author

[Andrei Martinenko](https://github.com/AxinitM)

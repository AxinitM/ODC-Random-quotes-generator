// Receiving a random quote using the ZenQuotes API via CORS Proxy
      async function fetchQuote() {
        const apiURL = `https://api.allorigins.win/get?url=https://zenquotes.io/api/random&timestamp=${new Date().getTime()}`;
        try {
          const response = await fetch(apiURL);
          const data = await response.json();
          const quoteData = JSON.parse(data.contents)[0];

          // Checking API's "Too many requests" message
          if (
            quoteData.q ===
            "Too many requests. Obtain an auth key for unlimited access."
          ) {
            document.getElementById(
              "quote"
            ).textContent = `Too many requests. Please wait 30 seconds and press the button again!`;

            // Setting font and font-size for "Too many requests" message
            document.getElementById("quote").style.fontFamily =
              "var(--mainFontFamily)";
            document.getElementById("quote").style.fontSize = "1rem";
            document.getElementById("author").style.fontStyle = "normal";
            // document.getElementById("author").style.fontSize = "1rem";
          } else {
            // Updating the quote and author text on the page
            document.getElementById("quote").textContent = `"${quoteData.q}"`;
            document.getElementById("quote").style.fontSize = "1.8rem";
            document.getElementById("author").style.fontStyle = "italic";
            // document.getElementById("author").style.fontSize = "1.2rem";

            // Setting font to handwriting font for normal quotes
            document.getElementById("quote").style.fontFamily =
              "var(--QuoteHandWritingFont)";
          }

          document.getElementById("author").textContent = `- ${quoteData.a}`;
        } catch (error) {
          console.error("Error fetching the quote:", error);
          document.getElementById("quote").textContent =
            "An error occurred, please try again!";

          // Main Font for Error message
          document.getElementById("quote").style.fontFamily =
            "var(--mainFontFamily)";
          document.getElementById("author").textContent = "";
        }
      }

      // Event listener for button to generate a new quote
      document
        .getElementById("new-quote")
        .addEventListener("click", fetchQuote);

      // copy text sets
      document
        .getElementById("copy-button")
        .addEventListener("click", function () {
         
          const copiedQuote = document.getElementById("quote").textContent;
          const copiedAuthor = document.getElementById("author").textContent;

        
          const fullTextToCopy = `${copiedQuote} ${copiedAuthor}`;

        
          navigator.clipboard
            .writeText(fullTextToCopy)
            .then(() => {
              alert("The quote and its author were copied!");
            })
            .catch((err) => {
              console.error("Copying error: ", err);
            });
        });

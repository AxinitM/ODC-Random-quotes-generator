document.addEventListener("DOMContentLoaded", function () {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const newQuoteButton = document.getElementById("new-quote");
  const copyButton = document.getElementById("copy-button");

  let currentQuote = "Click to get a new great idea!";
  let currentAuthor = "";
  let currentLanguage = "en";

  // Array with messages for different languages
  const messages = {
    en: {
      copied: "The text has been copied!",
      getNewQuote: "Click to get a new great idea!",
    },
    ru: {
      copied: "Текст был скопирован!",
      // getNewQuote: "Нажмите кнопку, чтобы получить новую цитату!",
    },
    ro: {
      copied: "Textul a fost copiat!",
      // getNewQuote: "Apasă butonul pentru a primi un nou citat!",
    },
    de: {
      copied: "Der Text wurde kopiert!",
      // getNewQuote:
      //   "Klicken Sie auf die Schaltfläche, um ein neues Zitat zu erhalten!",
    },
  };

  // Set the default message
  quoteElement.textContent = messages[currentLanguage].getNewQuote;

  // Function to update styles of the quote element
  function updateQuoteStyles({ fontFamily, fontSize, fontStyle }) {
    if (fontFamily) quoteElement.style.fontFamily = fontFamily;
    if (fontSize) quoteElement.style.fontSize = fontSize;
    if (fontStyle) authorElement.style.fontStyle = fontStyle;
  }

  // Function to display the quote and author
  function displayQuote(quote, author, useQuotes = true) {
    if (useQuotes && quote) {
      quoteElement.textContent = `"${quote}"`;
    } else {
      quoteElement.textContent = quote;
    }
    authorElement.textContent = author;
  }

  // Function to fetch a random quote
  async function fetchQuote() {
    const apiURL = `https://api.allorigins.win/get?url=${encodeURIComponent(
      "https://zenquotes.io/api/random"
    )}&timestamp=${new Date().getTime()}`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const quoteData = JSON.parse(data.contents)[0];

      const tooManyRequestsMessage =
        "Too many requests. Obtain an auth key for unlimited access.";

      if (quoteData.q === tooManyRequestsMessage) {
        currentQuote =
          "Too many requests. Please wait 30 seconds and press the button again!";
        currentAuthor = "";
        displayQuote(currentQuote, currentAuthor, false);
        updateQuoteStyles({
          fontFamily: "var(--mainFontFamily)",
          fontSize: "1em",
        });
      } else {
        currentQuote = quoteData.q;
        currentAuthor = `- ${quoteData.a}`;

        if (currentLanguage === "en") {
          displayQuote(currentQuote, currentAuthor);
          updateQuoteStyles({
            fontFamily: "var(--quoteHandWritingFont)",
            fontSize: "1.4em",
          });
        } else {
          translateQuote(currentLanguage);
          updateQuoteStyles({
            fontFamily: "var(--quoteHandWritingFont)",
            fontSize: "1.2em",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching the quote:", error);
      currentQuote = "An error occurred, please try again!";
      currentAuthor = "";
      displayQuote(currentQuote, currentAuthor, false);
      updateQuoteStyles({
        fontFamily: "var(--mainFontFamily)",
        fontSize: "1em",
      });
    }
  }

  // Function to translate the quote using DeepL API
  async function translateQuote(language) {
    if (!currentQuote) {
      return;
    }

    const apiKey = "70cec277-c706-4d31-a510-2ecabd6d9a06:fx";
    const apiURL = "https://api-free.deepl.com/v2/translate";

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          auth_key: apiKey,
          text: currentQuote,
          target_lang: language.toUpperCase(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.translations[0].text;

      const useQuotes = currentAuthor !== "";
      // Add quotes only if there is an author
      displayQuote(translatedText, currentAuthor, useQuotes);
      updateQuoteStyles({
        fontFamily: "var(--quoteHandWritingFont)",
      });
    } catch (error) {
      console.error("Translation error:", error);
      quoteElement.textContent = "Error translating quote.";
      authorElement.textContent = "";
    }
  }

  // Event handlers for language selection radio buttons
  const translateButtons = document.querySelectorAll(
    'input[name="translate-buttons"]'
  );

  translateButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      const selectedLanguage = document.querySelector(
        'input[name="translate-buttons"]:checked'
      ).value;
      currentLanguage = selectedLanguage;

      if (selectedLanguage === "en") {
        const useQuotes = currentAuthor !== "";
        displayQuote(currentQuote, currentAuthor, useQuotes);
        updateQuoteStyles({
          fontFamily: "var(--quoteHandWritingFont)",
        });
      } else {
        translateQuote(selectedLanguage);
      }
    });
  });

  // Event handler for the "New Quote" button
  newQuoteButton.addEventListener("click", fetchQuote);

  // Event handler for the "Copy Quote" button
  copyButton.addEventListener("click", function () {
    const copiedQuote = quoteElement.textContent;
    const copiedAuthor = authorElement.textContent;
    const fullTextToCopy = `${copiedQuote} ${copiedAuthor}`;

    navigator.clipboard
      .writeText(fullTextToCopy)
      .then(() => {
        alert(messages[currentLanguage].copied);
      })
      .catch((err) => {
        console.error("Copying error:", err);
      });
  });
});

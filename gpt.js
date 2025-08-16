const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

function sendMessage() {
    const userMessage = userInput.value;

    if (userMessage.trim() === '') {
        return;
    }

    appendMessage('user', userMessage);
    processMessage(userMessage);
    userInput.value = '';
}


function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'gpt-message');
    messageDiv.innerHTML = `${sender === 'user' ? `<img src="A.jpg" alt="User Icon">` : `<img src="chat.png" alt="GPT Icon">`} ${sender === 'user' ? 'You' : 'GPT'}: ${message}`;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}



function processMessage(userMessage) {
    let gptReply = '';
    
    const inappropriateWords = ['explicit', 'offensive', 'violating', 'sexual','nude', 'inappropriate'];
    const containsInappropriateWord = inappropriateWords.some(word => userMessage.toLowerCase().includes(word));


    if (userMessage.toLowerCase().includes('hi i\'m')) {
        const userName = userMessage.split('hi i\'m')[1].trim();
        gptReply = `Hello ${userName}! Welcome to the simple GPT created by Saurav Pandey.`;
    } else if (userMessage.toLowerCase().includes('tell me about your functionality')) {
        gptReply = 'This simple GPT is created using HTML, CSS, and JavaScript. It interacts with the user and provides predefined responses based on user input.';
    } else if (userMessage.toLowerCase().includes('how are you')) {
        gptReply = 'I am just a computer program, so I do not have feelings, but thanks for asking!';
    } else if (userMessage.toLowerCase().includes('what is your purpose')) {
        gptReply = 'My purpose is to demonstrate a simple chat interface using GPT-like responses.';
    } else if (userMessage.toLowerCase().includes('who created you')) {
        gptReply = 'I was created by C.E.O of VISION S Saurav Pandey.';
    } else if (userMessage.toLowerCase().includes('i love you')) {
        gptReply = 'AS a computer program i do not have feeling please keep your word respectful.else i will have to inform my boss';
    }  else if (userMessage.toLowerCase().includes('favorite color')) {
        gptReply = 'I don\'t have a favorite color, but I appreciate all colors!';
    } else if (userMessage.toLowerCase().includes('tell me a joke')) {
        gptReply = 'Why don\'t scientists trust atoms? Because they make up everything!';
    } else if (userMessage.toLowerCase().includes('what is your age')) {
        gptReply = 'I don\'t have an age. I\'m always up-to-date!';
    } else if (userMessage.toLowerCase().includes('your favorite book')) {
        gptReply = 'I don\'t read books, but I can provide information on a wide range of topics!';
    } else if (userMessage.toLowerCase().includes('current weather')) {
        gptReply = 'I don\'t have real-time information, but you can check a weather website for the current conditions!';
    } else if (userMessage.toLowerCase().includes('your favorite movie')) {
      gptReply = 'I don\'t watch movies, but I can recommend some based on your preferences!By the way my boss favorite movie is KGF CHAPTER 1/CHAPTER2 AND SALAAR';
    } else if (userMessage.toLowerCase().includes('what is html')) {
    gptReply = 'HTML (HyperText Markup Language) is the standard markup language used to create web pages. It structures content using elements and tags.';
} else if (userMessage.toLowerCase().includes('html vs css')) {
    gptReply = 'HTML (HyperText Markup Language) is used for structuring content on a web page, while CSS (Cascading Style Sheets) is used for styling and layout.';
} else if (userMessage.toLowerCase().includes('html5 features')) {
    gptReply = 'HTML5 introduces new features like semantic elements (header, footer), audio and video support, local storage, canvas for graphics, and improved form controls.';
} else if (userMessage.toLowerCase().includes('html elements')) {
    gptReply = 'HTML elements are building blocks of a web page. Examples include headings (<h1> to <h6>), paragraphs (<p>), lists (<ul>, <ol>), and links (<a>).';
} else if (userMessage.toLowerCase().includes('html attributes')) {
    gptReply = 'HTML attributes provide additional information about HTML elements. Examples include "src" for images, "href" for links, and "class" for styling.';
} else if (userMessage.toLowerCase().includes('html forms')) {
    gptReply = 'HTML forms are used to collect user input. Form elements include textboxes, radio buttons, checkboxes, and submit buttons, enclosed in a <form> element.';
} else if (userMessage.toLowerCase().includes('html doctype')) {
    gptReply = 'The HTML Doctype declaration <!DOCTYPE html> specifies the HTML version being used (HTML5) and helps browsers render content correctly.';
} else if (userMessage.toLowerCase().includes('html headings')) {
    gptReply = 'HTML headings (<h1> to <h6>) are used to define headings on a page. They represent different levels of importance, with <h1> being the highest.';
} else if (userMessage.toLowerCase().includes('html images')) {
    gptReply = 'To include images in HTML, use the <img> tag with the "src" attribute pointing to the image file. Optionally, include "alt" text for accessibility.';
} else if (userMessage.toLowerCase().includes('html links')) {
    gptReply = 'HTML links are created with the <a> (anchor) tag. Use the "href" attribute to specify the destination URL. Links can point to other web pages or resources.';
} else if (userMessage.toLowerCase().includes('html lists')) {
    gptReply = 'HTML supports ordered lists (<ol>), unordered lists (<ul>), and definition lists (<dl>). List items are defined with <li>, <ul>, or <ol> tags.';
} else if (userMessage.toLowerCase().includes('html tables')) {
    gptReply = 'HTML tables are created using the <table> tag. They consist of rows (<tr>), header cells (<th>), and data cells (<td>). Use <thead>, <tbody>, and <tfoot> for structure.';
} else if (userMessage.toLowerCase().includes('html semantic elements')) {
    gptReply = 'HTML5 introduced semantic elements like <header>, <footer>, <nav>, <article>, <section>, and <aside> to add meaning to the structure of a web page.';
} else if (userMessage.toLowerCase().includes('html forms')) {
    gptReply = 'HTML forms are used to collect user input. Form elements include textboxes, radio buttons, checkboxes, and submit buttons, enclosed in a <form> element.';
} else if (userMessage.toLowerCase().includes('html audio and video')) {
    gptReply = 'HTML supports embedding audio and video using the <audio> and <video> tags. Specify the source with the "src" attribute and include fallback content.';
} else if (userMessage.toLowerCase().includes('html comments')) {
    gptReply = 'HTML comments are added using <!-- comment here -->. They are not visible on the web page but can be useful for documentation or debugging.';
} else if (userMessage.toLowerCase().includes('html inline vs block elements')) {
    gptReply = 'HTML elements are classified as inline or block. Block elements start on a new line and take up the full width, while inline elements only take up as much width as necessary.';
} else if (userMessage.toLowerCase().includes('html doctype')) {
    gptReply = 'The HTML Doctype declaration <!DOCTYPE html> specifies the HTML version being used (HTML5) and helps browsers render content correctly.';
} else if (userMessage.toLowerCase().includes('html entities')) {
    gptReply = 'HTML entities are special characters represented by codes. Examples include "&lt;" for <, "&gt;" for >, and "&amp;" for &.';
} else if (userMessage.toLowerCase().includes('html responsive design')) {
    gptReply = 'HTML responsive design is achieved using CSS media queries. It allows web pages to adapt to different screen sizes, ensuring a consistent user experience.';
} else if (userMessage.toLowerCase().includes('html meta tags')) {
    gptReply = 'HTML meta tags provide metadata about the document. Common meta tags include "charset" for character set, "viewport" for responsive design, and "description" for search engines.';
} else if (userMessage.toLowerCase().includes('html canvas')) {
    gptReply = 'The HTML <canvas> element is used for drawing graphics using JavaScript. It provides a drawing space and methods for creating shapes, paths, and images.';
} else if (userMessage.toLowerCase().includes('html local storage')) {
    gptReply = 'HTML local storage is a web storage solution that allows websites to store data persistently in a web browser. It provides more storage capacity than cookies.';
} else if (userMessage.toLowerCase().includes('html boilerplate')) {
    gptReply = 'HTML5 boilerplate is a standard template for HTML documents. It includes pre-configured settings, meta tags, and scripts to kickstart web development projects.';
} else if (userMessage.toLowerCase().includes('i wish to play game')) {
    gptReply = 'ok sure, write your name/class';
} else if (userMessage.toLowerCase().includes('sushantchaudhary/nine')) {
    gptReply = 'hey sushant chaudhary, you study class nine B and sit in 1st row bench which is nearest to the door. My boss have told me about you he thinks you are a great comedian and have good knowledge of geo politics and yes you are also one of the member of vision s';
} else if (containsInappropriateWord) {
        gptReply = 'Please ensure your messages are respectful and avoid using explicit or inappropriate language. Thank you!';
    }

    
    
    else {
        gptReply = 'I am a simple GPT. I can respond to basic queries. Ask me something else!';
    }
    
    

    setTimeout(() => {
        appendMessage('gpt', gptReply);
    }, 500);
}

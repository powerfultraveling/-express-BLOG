const showdown = require("showdown");

window.onload = function() {
    var converter = new showdown.Converter({
        requireSpaceBeforeHeadingText: true,
        simpleLineBreaks: true
    });
    converter.setOption("omitExtraWLInCodeBlocks", "true");
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');   


    var convertTextAreaToMarkdown = function(){
        let markdownText = pad.value;
        console.log(markdownText)
        let html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };


    pad.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
};
console.log("hallo")
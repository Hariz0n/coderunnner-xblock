/**
 * CodeRunner main.js
 * @param {any} runtime 
 * @param {HTMLElement} element 
 */
function CodeRunnerXBlock(runtime, element) {
  let editor;

  function updateCount(result) {
    $('.count', element).text(result.count);
  }

  function initCodeEditor() {
    /**
     * @type {HTMLTextAreaElement | null} Editor dom element
     */
    const editorElement = element.querySelector("#code")

    if (!editorElement) {
      throw new Error('No code editor dom element')
    }

    editor = CodeMirror.fromTextArea(editorElement, {
      styleActiveLine: true,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      mode: "python",
    });
  }

  function initAjax() {
    $('button', element).click(function() {
      $.ajax({
        type: "POST",
        url: handlerUrl,
        data: JSON.stringify({
          code: editor.getValue()
        }),
        success: console.log
      });
    })
  }

  var handlerUrl = runtime.handlerUrl(element, 'submit');

  $(function () {
    initCodeEditor()
    initAjax()
  });
}

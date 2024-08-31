/* Javascript for CodeRunnerXBlock. */
function CodeRunnerXBlock(runtime, element) {
  let editor;

  function initCodeEditor() {
    const codeEditor = CodeMirror.fromTextArea(
      document.getElementById("code"),
      {
        styleActiveLine: true,
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        mode: "python",
      }
    );

    editor = codeEditor;
  }

  function updateCount(result) {
    $(".count", element).text(result.count);
  }

  var handlerUrl = runtime.handlerUrl(element, "increment_count");

  $("button.button", element).click(function (eventObject) {
    $.ajax({
      type: "POST",
      url: handlerUrl,
      data: JSON.stringify({ hello: "world" }),
      success: updateCount,
    });
  });

  $(function ($) {
    initCodeEditor()
  });
}

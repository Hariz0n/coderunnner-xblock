/* Javascript for CodeRunnerXBlock. */
function CdeRunnerXBlock(runtime, element) {
  var handlerUrl = runtime.handlerUrl(element, "increment_count");

  console.log({handlerUrl})
}

function testApi(runtime, element) {
  console.log(runtime)
}

window.testApi = CodeXBlock

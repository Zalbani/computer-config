main()

async function main(){
  console.log('start')
  var clipboardContent = await getClipboardContentLoop()
  await pasteContentInsideForm(clipboardContent)
  console.log('end')
}

async function pasteContentInsideForm(clipboardContent) {
  var formInput = getFormInput()
  formInput.value = clipboardContent
  return
}

function getFormInput() {
  return document.getElementById('clipboard_content')
}

async function getClipboardContentLoop() {
  var tempResponse = 'fail'
  while (tempResponse === 'fail' ) {
    tempResponse = await getClipboardContent()
    await sleep(1000)
  }
  return tempResponse
}

async function getClipboardContent(){
  var result = 'fail'
  await navigator.clipboard.readText()
  .then(text => {
    result = text
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err)
  });
  return result
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
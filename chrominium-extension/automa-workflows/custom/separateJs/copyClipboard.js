main()

async function main (){
  console.log('start')
  var link = getUrl()
  await copyClipboardLoop(link)
  console.log('end')
}

function getUrl (){
	var link = document.querySelector("h3 a")
	var textContent = link.textContent
	return textContent
}

async function copyClipboardLoop(text) {
  var tempResponse
  while (tempResponse !== 'sucess' ) {
    tempResponse = await copyTextToClipboard(text)
    console.log(tempResponse)
    await sleep(1000)
  }
}

async function copyTextToClipboard(text) {
  var result = 'fail'
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    result = 'sucess'
  }

  await navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!')
    result = 'sucess'
  }, function(err) {
    console.error('Async: Could not copy text: ', err)
  })
  return result
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
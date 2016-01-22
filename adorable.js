var regURL = /chrome:\/\/flags\/?/i;

function setStyle ( tab, count ) {
  var id = ( typeof tab === 'number' ) ? tab : tab.id || null;
  var url = tab.url || '';
  count = count || 0;

  if ( count > 1 || id === null || !regURL.test(url) ) {
    return false;
  }

  if ( !url ) {
    chrome.tabs.get(id, function ( tab ) {
      setStyle(tab, ++count);
    });
  }

  chrome.tabs.insertCSS({
    file: 'cute.css'
  });
}

chrome.tabs.onCreated.addListener(setStyle);

chrome.tabs.onUpdated.addListener(function ( tabId ) {
  chrome.tabs.get(tabId, setStyle);
});

chrome.tabs.onActivated.addListener(function ( activeInfo ) {
  chrome.tabs.get(activeInfo.tabId, setStyle);
});

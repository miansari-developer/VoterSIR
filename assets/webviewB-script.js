function decodeJWT(token) {
  const parts = token.split('.');
  return JSON.parse(atob(parts[1]));
}

function getJWTAccessToken() {
  return localStorage.getItem('access_token');
}

function getCurrentUnixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function isJWTTokenExpired() {
  const token = getJWTAccessToken();
  if (token === null) return true;
  const decodedToken = decodeJWT(token);
  return decodedToken.exp < getCurrentUnixTimestamp();
}

function getNameFromJWTToken() {
  const token = getJWTAccessToken();
  if (token === null) return null;
  const decodedToken = decodeJWT(token);
  return decodedToken.given_name;
}

async function waitingForLogin() {
  await waitForElementInSubtree('.profile');
  loggedInAction();
}

function waitForElementInSubtree(elementSelector, root = document.body) {
  console.log('⏱️Waiting for .profile element');
  return new Promise((resolve) => {
    const existing = root.querySelector(elementSelector);
    if (existing) {
      console.log('➡️Successfully waited for element.');
      return resolve(existing);
    }

    const observer = new MutationObserver(() => {
      const target = root.querySelector(elementSelector);
      if (target) {
        console.log('➡️Successfully waited for element...');
        observer.disconnect();
        resolve(target);
      }
    });

    observer.observe(root, { childList: true, subtree: true });
  });
}

function isLoggedIn() {
  return !isJWTTokenExpired() && document.querySelector('.profile') !== null;
}

function notLoggedInAction() {
  waitingForLogin();
  console.log('🔐Please login first.');
  AndroidBridge.showToast('Please login first.');
  AndroidBridge.showWebViewA(false);
  AndroidBridge.showWebViewB(true);
  AndroidBridge.showDebug(false);
}

function loggedInAction() {
  AndroidBridge.showWebViewA(true);
  AndroidBridge.showWebViewB(false);
  AndroidBridge.showDebug(false);
  console.log('🔐LoggedIn succesfully...');
  AndroidBridge.showToast('Logged In Successfully');
}

async function fetchSIRInfo(epic, stateCode = 'S24', stateName = 'Uttar Pradesh') {
  const result = {
    success: false,
    statusCode: null,
    message: null,
    data: null,
    error: null,
  };

  if (!isLoggedIn()) {
    notLoggedInAction();
    result.message = 'Please login first';
    result.error = 'Session expired.';
    return result;
  }

  const headerSubpart = {
    atkn_bnd: localStorage.getItem('atkn_bnd'),
    authorization: 'Bearer ' + getJWTAccessToken(),
  };

  try {
    const response = await fetch(
      'https://gateway-voters.eci.gov.in/api/v1/producer/ctzver/getElectorInitialData',
      {
        headers: {
          accept: 'application/json',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          applicationname: 'VSP',
          atkn_bnd: headerSubpart.atkn_bnd,
          authorization: headerSubpart.authorization,
          channelidobo: 'VSP',
          'content-type': 'application/json',
          'platform-type': 'ECIWEB',
          'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
        body: JSON.stringify({
          epicNo: epic,
          stateCd: stateCode,
          stateName: stateName,
        }),
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
      }
    );
    result.statusCode = response.status;

    // Authorization / session issues
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        result.error = 'Authorization failed or session expired';
        result.success = false;
        result.message = 'Please re-authenticate';
        notLoggedInAction();
        return result;
      }
    }

    const json = await response.json();

    result.message = json.message || 'Unknown response';

    // Failure from API (EPIC not found, wrong state, etc.)
    if (json.status !== 'Success' || !json.payload) {
      result.error = 'EPIC lookup failed';
      return result;
    }

    result.data = json;
    result.success = true;
    return result;
  } catch (err) {
    result.success = false;
    result.error = 'Network or runtime error';
    result.message = err.message;
    return result;
  }
}

async function getLastSirDetails(stateCode, acNumber, partNumber, serialNumber) {
  try {
    const response = await fetch(
      'https://gateway-voters.eci.gov.in/api/v1/elastic-sir-citizen/get-eroll-data-2003',
      {
        headers: {
          accept: 'application/json',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          applicationname: 'VSP',
          channelidobo: 'VSP',
          'content-type': 'application/json',
          currentrole: 'citizen',
          'platform-type': 'ECIWEB',
          'sec-ch-ua': '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
        },
        body: `{"oldStateCd":"${stateCode}","oldAcNo":"${acNumber}","oldPartNo":"${partNumber}","oldPartSerialNo":"${serialNumber}"}`,
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
      }
    );

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    return {
      status: 'Failed',
      statusCode: 404,
      message: err.message,
      payload: [],
    };
  }
}

Object.assign(window, {
  decodeJWT,
  getJWTAccessToken,
  getCurrentUnixTimestamp,
  isJWTTokenExpired,
  getNameFromJWTToken,
  waitingForLogin,
  waitForElementInSubtree,
  isLoggedIn,
  notLoggedInAction,
  loggedInAction,
  fetchSIRInfo,
  getLastSirDetails,
});

console.log('Webview-B js executed successfully');

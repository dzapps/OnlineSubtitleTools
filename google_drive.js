var CLIENT_ID = "217214554172-lk1ej0g02ga9nfi7fm8oamp72722fcoc.apps.googleusercontent.com";
var APP_ID = "217214554172"
var SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

var pickerApiLoaded = false;
var driveApiLoaded = false;
var oauthToken = undefined;

function handleAuthClick() {
    toastr["info"]("A window might popup for you to authorize this website to access video from your Google Drive. Please make sure window popup is allowed for this site.", "Allow Popup");
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

function handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        showPicker();
    } else {
        toastr["error"]("Error! Failed to authorize this website to access your Google Drive", "Authorization Failure");
    }
}

function loadApi() {
    gapi.client.load('drive', 'v3', onDriveApiLoad);
    gapi.load('picker', {
        'callback': onPickerApiLoad
    });
}

function onPickerApiLoad() {
    pickerApiLoaded = true;
}

function onDriveApiLoad() {
    pickerApiLoaded = true;
}


// Drive Api Example
function listFiles() {
    var request = gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    });

    request.execute(function(resp) {
        var files = resp.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log(file.name + ' (' + file.id + ')');
            }
        } else {
            console.log('No files found.');
        }
    });
}
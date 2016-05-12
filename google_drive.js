    var developerKey = 'AIzaSyDvIRIT5rPQH_9SrQwLv1r3mL3CZ9P13lg';
    var clientId = "217214554172-lk1ej0g02ga9nfi7fm8oamp72722fcoc.apps.googleusercontent.com"
    var appId = "217214554172";
    var scope = ['https://www.googleapis.com/auth/drive'];

    var authApiLoaded = false;
    var pickerApiLoaded = false;
    var oauthToken;

    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      authApiLoaded = true;
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS_VIDEOS);
        //view.setMimeTypes("image/png,image/jpeg,image/jpg");
        var picker = new google.picker.PickerBuilder()
            //.enableFeature(google.picker.Feature.NAV_HIDDEN)
            //.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(true))
            //.addView(new google.picker.DocsUploadView())
            //.setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

function pickerCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    var fileId = data.docs[0].id;
    alert('The user selected: ' + fileId);
  }
}
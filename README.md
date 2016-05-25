# Content Viewer App for Enonic XP

<img align="right" alt="Content Viewer Logo" src="https://rawgithub.com/enonic/app-content-viewer/master/src/main/resources/assets/img/content_viewer_cleaned.svg" width="128">

This app extends the administration console by displaying
the properties of the selected content as a JSON object.

The app does not require any configuration. 
Once the app is deployed, a new "Content Viewer" option will be available in the dropdown of the Content Studio browse view.

When a content is selected, its JSON representation will be shown on the widget view.


## Releases and Compatibility

| App version | Required XP version |
| ----------- | ------------------- |
| 1.0.0 | 6.3.0 |
| 1.1.0 | 6.5.3 |
| 1.1.1 | 6.5.3 |


## Building and deploying

Build this application from the command line. Go to the root of the project and enter:

    ./gradlew clean build

To deploy the app, set `$XP_HOME` environment variable and enter:

    ./gradlew deploy


# Content Viewer App for Enonic XP

This app extends the administration console by displaying
the properties of the selected content as a JSON object.

The app does not require any configuration. 
Once the app is deployed, a new "Content Viewer" option will be available in the dropdown of the Content Manager browse view.

When a content is selected, its JSON representation will be shown on the widget view.


## Releases and Compatibility

| App version | Required XP version | Download |
| ----------- | ------------------- | -------- |
| 1.0.0 | 6.3.0 | N/A |


## Building and deploying

Build this application from the command line. Go to the root of the project and enter:

    ./gradlew clean build

To deploy the app, set `$XP_HOME` environment variable and enter:

    ./gradlew deploy


## Releasing new version

To release a new version of this app, please follow the steps below:

1. Update `version` (and possibly `xpVersion`) in  `gradle.properties`.

2. Compile and deploy to our Maven repository:

    ./gradlew clean build uploadArchives

3. Update `README.md` file with new version information and compatibility.

4. Tag the source code using `git tag` command (where `X.X.X` is the released version):

    git tag vX.X.X

5. Update `gradle.properties` with the next snapshot version and commit changes.

6. Push the updated code to GitHub.

    git push origin master --tags

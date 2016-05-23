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


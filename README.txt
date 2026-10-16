PaperBank APK - Android Studio project
1. Android Studio ma File > Open > aa PaperBank folder select karo. Gradle sync thava do.
2. Build > Build APK(s)  -> app/build/outputs/apk/debug/app-debug.apk
3. Signed release APK mate: Build > Generate Signed App Bundle / APK > APK.
URL badalva: MainActivity.java ma SITE_URL ane SITE_HOST.
App icon: app par right-click > New > Image Asset, pachi AndroidManifest ma android:icon="@mipmap/ic_launcher" umero.

Android Studio vagar (GitHub thi):
1. github.com par free account > New repository.
2. Aa folder ni andar ni badhi files (.github folder sahit) repository ma upload karo.
3. Actions tab > "Build APK" > Run workflow. 3-5 minute pachi Artifacts ma PaperBank-APK download karo.

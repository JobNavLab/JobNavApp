import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import org.jetbrains.kotlin.gradle.ExperimentalWasmDsl
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import java.util.Properties

val localProps = Properties().apply {
    load(rootProject.file("local.properties").inputStream())
}

// Firebase Configuration
val firebaseApiKey = localProps.getProperty("FIREBASE_API_KEY")
val firebaseAppId = localProps.getProperty("FIREBASE_APP_ID")
val firebaseProjectId = localProps.getProperty("FIREBASE_PROJECT_ID")
val firebaseAuthDomain = localProps.getProperty("FIREBASE_AUTH_DOMAIN")

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

kotlin {
    androidTarget {
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_11)
        }
    }

    listOf(
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "ComposeApp"
            isStatic = true
        }
    }

    js {
        browser()
        binaries.executable()
    }

    @OptIn(ExperimentalWasmDsl::class)
    wasmJs {
        browser()
        binaries.executable()
    }

    sourceSets {
        androidMain.dependencies {
            implementation(compose.preview)
            implementation(libs.androidx.activity.compose)
        }
        commonMain.dependencies {
            implementation(compose.runtime)
            implementation(compose.foundation)
            implementation(compose.material3)
            implementation(compose.ui)
            implementation(compose.components.resources)
            implementation(compose.components.uiToolingPreview)
            implementation(libs.androidx.lifecycle.viewmodelCompose)
            implementation(libs.androidx.lifecycle.runtimeCompose)
            implementation(libs.kotlinx.coroutine)
            // Navigation
            implementation(libs.androidx.navigation.compose)
            // Network
            implementation(libs.bundles.ktor)
        }
        commonTest.dependencies {
            implementation(libs.kotlin.test)
        }
        val jsMain by getting {
            resources.srcDir("composeApp/src/jsMain/resources")
        }
        all {
            languageSettings {
                optIn("kotlin.ExperimentalMultiplatform") // (선택) 다른 opt-in과 함께
            }
        }
    }
}

android {
    namespace = "com.jobnav.app"
    compileSdk = libs.versions.android.compileSdk.get().toInt()
    
    buildFeatures {
        buildConfig = true
    }

    defaultConfig {
        applicationId = "com.jobnav.app"
        minSdk = libs.versions.android.minSdk.get().toInt()
        targetSdk = libs.versions.android.targetSdk.get().toInt()
        versionCode = 1
        versionName = "1.0"
        
        // Firebase Configuration Fields
        buildConfigField("String", "FIREBASE_API_KEY", "\"${firebaseApiKey}\"")
        buildConfigField("String", "FIREBASE_APP_ID", "\"${firebaseAppId}\"")
        buildConfigField("String", "FIREBASE_PROJECT_ID", "\"${firebaseProjectId}\"")
        buildConfigField("String", "FIREBASE_AUTH_DOMAIN", "\"${firebaseAuthDomain}\"")
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

dependencies {
    debugImplementation(compose.uiTooling)
}


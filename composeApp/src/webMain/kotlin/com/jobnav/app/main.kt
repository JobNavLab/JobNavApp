package com.jobnav.app

import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.window.ComposeViewport
import com.jobnav.firebase.FirebaseModule

external val FIREBASE_API_KEY: String
external val FIREBASE_PROJECT_ID: String
external val FIREBASE_APP_ID: String
external val FIREBASE_AUTH_DOMAIN: String

@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // Firebase 초기화
    FirebaseModule.init(
        apiKey = FIREBASE_API_KEY,
        authDomain = FIREBASE_PROJECT_ID,
        projectId = FIREBASE_APP_ID,
        appId = FIREBASE_AUTH_DOMAIN,
    )
    
    ComposeViewport {
        App()
    }
}
package com.jobnav.firebase

actual object FirebaseModule {

    actual fun init(
        apiKey: String,
        authDomain: String,
        projectId: String,
        appId: String
    ) {

    }

    actual suspend fun signIn(email: String, password: String): String {
        return ""
    }

    actual suspend fun signUp(email: String, password: String): String {
        return ""
    }

    actual suspend fun resetPassword(email: String) {
    }
}

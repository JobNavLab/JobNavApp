package com.jobnav.firebase

// 전역 window.firebase를 external로 불러오기
external fun firebaseInit(apiKey: String, authDomain: String, projectId: String, appId: String)
external suspend fun firebaseSignInEmail(email: String, password: String): String
external suspend fun firebaseSignUpEmail(email: String, password: String): String
external suspend fun firebaseSendReset(email: String)

actual object FirebaseModule {

    actual fun init(
        apiKey: String,
        authDomain: String,
        projectId: String,
        appId: String
    ) {
        firebaseInit(apiKey, authDomain, projectId, appId)
    }

    actual suspend fun signIn(email: String, password: String) = firebaseSignInEmail(email, password)
    actual suspend fun signUp(email: String, password: String) = firebaseSignUpEmail(email, password)
    actual suspend fun resetPassword(email: String) = firebaseSendReset(email)
}
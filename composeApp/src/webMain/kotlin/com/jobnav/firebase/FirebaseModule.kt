package com.jobnav.firebase

import kotlin.js.ExperimentalWasmJsInterop
import kotlin.js.Promise
import kotlin.js.JsAny

// 전역 window.firebase를 external로 불러오기
external fun firebaseInit(apiKey: String, authDomain: String, projectId: String, appId: String)
@OptIn(ExperimentalWasmJsInterop::class)
external fun firebaseSignInEmail(email: String, password: String): Promise<JsAny?>
@OptIn(ExperimentalWasmJsInterop::class)
external fun firebaseSignUpEmail(email: String, password: String): String
@OptIn(ExperimentalWasmJsInterop::class)
external fun firebaseSendReset(email: String): Unit

actual object FirebaseModule {

    actual fun init(
        apiKey: String,
        authDomain: String,
        projectId: String,
        appId: String
    ) {
        firebaseInit(apiKey, authDomain, projectId, appId)
    }

    @OptIn(ExperimentalWasmJsInterop::class)
    actual suspend fun signIn(email: String, password: String): String {
        return try {
            val result: JsAny? = firebaseSignInEmail(email, password)
            result?.toString() ?: ""
        } catch (e: Exception) {
            throw e
        }
    }

    @OptIn(ExperimentalWasmJsInterop::class)
    actual suspend fun signUp(email: String, password: String): String {
        return firebaseSignUpEmail(email, password)
    }
    
    @OptIn(ExperimentalWasmJsInterop::class)
    actual suspend fun resetPassword(email: String) {
        firebaseSendReset(email)
    }
}
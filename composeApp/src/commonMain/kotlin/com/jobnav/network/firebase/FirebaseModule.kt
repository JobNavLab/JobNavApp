package com.jobnav.network.firebase

expect object FirebaseModule {

    fun init(
        apiKey: String,
        authDomain: String,
        projectId: String,
        appId: String
    )

    suspend fun signIn(email: String, password: String): String

    suspend fun signUp(email: String, password: String): String

    suspend fun resetPassword(email: String)
}
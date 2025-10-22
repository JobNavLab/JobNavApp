package com.jobnav.login

import com.jobnav.firebase.FirebaseModule
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class AuthViewModel {

    private val _state: MutableStateFlow<LoginState> = MutableStateFlow(LoginState.NotLoggedIn())
    val state = _state.asStateFlow()

    suspend fun signIn(
        email: String,
        password: String
    ) {
        _state.value = LoginState.Loading
        
        try {
            val uid = FirebaseModule.signIn(
                email = email,
                password = password
            )

            if (uid.isNotEmpty()) {
                _state.value = LoginState.LoggedIn
            } else {
                _state.value = LoginState.Error("로그인에 실패했습니다.")
            }
        } catch (e: Exception) {
            _state.value = LoginState.Error("로그인 중 오류가 발생했습니다: ${e.message}")
        }
    }

}
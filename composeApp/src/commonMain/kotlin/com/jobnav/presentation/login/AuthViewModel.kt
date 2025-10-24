package com.jobnav.presentation.login

import com.jobnav.network.firebase.FirebaseModule
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class AuthViewModel {

    private val _state: MutableStateFlow<LoginState> = MutableStateFlow(LoginState.NotLoggedIn())
    val state = _state.asStateFlow()

    fun signIn(
        email: String,
        password: String
    ) {
        CoroutineScope(Dispatchers.Main).launch {
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
}
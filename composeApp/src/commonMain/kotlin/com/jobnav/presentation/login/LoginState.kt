package com.jobnav.presentation.login

sealed interface LoginState {
    data object LoggedIn : LoginState
    data object Loading : LoginState
    data class Error(val message: String) : LoginState
    data class NotLoggedIn(
        val isFailure: Boolean = false,
        val isLoading: Boolean = false
    ) : LoginState
}
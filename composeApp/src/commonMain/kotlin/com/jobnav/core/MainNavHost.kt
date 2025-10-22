package com.jobnav.core

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.jobnav.login.AuthViewModel
import com.jobnav.login.LoginScreen
import com.jobnav.login.EmailLoginScreenRoot

@Composable
fun MainNavHost(
    navController: NavHostController
) {
    val authViewModel = remember { AuthViewModel() }

    NavHost(
        navController = navController,
        startDestination = "login"
    ) {
        composable("login") {
            LoginScreen(navController = navController)
        }
        composable("email_login") {
            EmailLoginScreenRoot(
                viewModel = authViewModel,
                navController = navController
            )
        }
        // TODO: 다른 화면들 추가
    }
}
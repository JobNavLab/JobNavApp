package com.jobnav.core

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.jobnav.presentation.login.AuthViewModel
import com.jobnav.presentation.login.LoginScreen
import com.jobnav.presentation.login.EmailLoginScreenRoot

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
        composable("home") {
            HomeScreen(
                navController = navController,
                currentScreen = "myhome"
            )
        }
        composable("myhome") {
            HomeScreen(
                navController = navController,
                currentScreen = "myhome"
            )
        }
        composable("friends") {
            HomeScreen(
                navController = navController,
                currentScreen = "friends"
            )
        }
        composable("quest") {
            HomeScreen(
                navController = navController,
                currentScreen = "quest"
            )
        }
        composable("map") {
            HomeScreen(
                navController = navController,
                currentScreen = "map"
            )
        }
        composable("setting") {
            HomeScreen(
                navController = navController,
                currentScreen = "setting"
            )
        }
    }
}
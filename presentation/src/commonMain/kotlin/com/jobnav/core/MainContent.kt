package com.jobnav.core

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.jobnav.navigation.BottomNavigation

@Composable
fun MainContent(
    modifier: Modifier = Modifier,
    onNavHostReady: suspend (NavController) -> Unit = {}
) {
    val navController = rememberNavController()

    LaunchedEffect(navController) {
        onNavHostReady(navController)
    }

    Column(modifier = modifier.fillMaxSize()) {
        MainNavHost(navController = navController)
        BottomNavigation(
            currentDestination = navController.currentDestination
        )
    }
}
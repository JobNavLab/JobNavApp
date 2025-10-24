package com.jobnav.core

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Color.Companion.White
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.jobnav.navigation.BottomNavigation
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun HomeScreen(
    navController: NavController,
    currentScreen: String
) {
    Box(modifier = Modifier
        .fillMaxSize()
        .background(White)) {
        Column(
            modifier = Modifier.fillMaxSize()
        ) {
            // 메인 컨텐츠
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .weight(1f),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text(
                    text = when (currentScreen) {
                        "myhome" -> "My Home"
                        "friends" -> "Friends"
                        "quest" -> "Quest"
                        "map" -> "Map"
                        "setting" -> "Setting"
                        else -> "Home"
                    },
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.Black
                )
            }
            // 바텀 네비게이션
            BottomNavigation(
                currentScreen = currentScreen,
                onScreenChange = { screen ->
                    navController.navigate(screen) {
                        popUpTo("home") {
                            inclusive = false
                        }
                    }
                }
            )
        }
    }
}

@Preview
@Composable
fun HomeScreenPreview() {
    val navController = rememberNavController()
    HomeScreen(navController = navController, currentScreen = "myhome")
}
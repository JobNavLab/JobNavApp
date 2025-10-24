package com.jobnav.navigation

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun BottomNavigation(
    currentScreen: String,
    onScreenChange: (String) -> Unit
) {
    val navigationItems = listOf(
        "myhome" to "홈",
        "friends" to "친구",
        "quest" to "퀘스트",
        "map" to "지도",
        "setting" to "설정"
    )

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        navigationItems.forEach { (screen, label) ->
            val isSelected = currentScreen == screen

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .clickable { onScreenChange(screen) }
                    .padding(vertical = 8.dp)
            ) {
                // 임시 아이콘 (실제 아이콘으로 교체 예정)
                Box(
                    modifier = Modifier
                        .size(24.dp)
                        .background(
                            if (isSelected) Color(0xFF4285F4) else Color.Gray
                        )
                )

                Text(
                    text = screen,
                    fontSize = 10.sp,
                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                    color = if (isSelected) Color(0xFF4285F4) else Color.Gray
                )
            }
        }
    }
}

@Preview
@Composable
fun BottomNavigationPreview() {
    BottomNavigation(currentScreen = "myhome", onScreenChange = {})
}

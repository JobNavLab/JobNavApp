package com.jobnav.app

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform